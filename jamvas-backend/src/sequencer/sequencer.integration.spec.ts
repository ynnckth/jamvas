import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { Test } from '@nestjs/testing';
import { GlobalExceptionFilter } from '../exception/global-exception.filter';
import * as request from 'supertest';
import { SequencerRepository } from './sequencer.repository';
import { SequencerConfigurationBuilder } from '../testing/SequencerConfigurationBuilder';
import { InstrumentId } from './instrument-id';
import { SequencerConfiguration, Step } from './sequencer-configuration';
import Mocked = jest.Mocked;

describe('Sequencer integration tests', () => {
  let app: INestApplication;
  let sequencerRepositoryMock: Mocked<SequencerRepository>;

  const setupMocks = () => {
    sequencerRepositoryMock = {
      getConfiguration: jest.fn(),
      saveConfiguration: jest.fn(),
    } as unknown as Mocked<SequencerRepository>;
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    setupMocks();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SequencerRepository)
      .useValue(sequencerRepositoryMock)
      .compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();
  });

  const createSampleSequencerConfiguration = (
    bpm: number,
    steps: Step[] = [{ isOn: true }, { isOn: false }, { isOn: true }, { isOn: false }],
  ): SequencerConfiguration => {
    return new SequencerConfigurationBuilder()
      .withBpm(bpm)
      .withInstrument((instrumentBuilder) =>
        instrumentBuilder
          .withInstrumentId(InstrumentId.DRUMS)
          .withDisplayName('Rhythm')
          .withTrack((trackBuilder) => trackBuilder.withName('Kick').withSteps(steps))
          .withTrack((trackBuilder) => trackBuilder.withName('Snare').withSteps(steps)),
      )
      .build();
  };

  describe('GET /api/sequencer', () => {
    it('should return the initial sequencer configuration', async () => {
      const bpm = 150;
      sequencerRepositoryMock.getConfiguration = jest
        .fn()
        .mockResolvedValueOnce(createSampleSequencerConfiguration(bpm));

      const response = await request(app.getHttpServer()).get('/api/sequencer').expect(HttpStatus.OK);

      expect(response.body).toEqual({
        bpm: bpm,
        sequencerInstrumentStates: [
          {
            instrumentId: InstrumentId.DRUMS,
            instrumentDisplayName: 'Rhythm',
            tracks: [
              {
                name: 'Kick',
                steps: [{ isOn: true }, { isOn: false }, { isOn: true }, { isOn: false }],
              },
              {
                name: 'Snare',
                steps: [{ isOn: true }, { isOn: false }, { isOn: true }, { isOn: false }],
              },
            ],
          },
        ],
      });
    });
  });

  describe('PUT /api/sequencer/bpm', () => {
    it('should update the bpm', async () => {
      sequencerRepositoryMock.getConfiguration = jest
        .fn()
        .mockResolvedValueOnce(createSampleSequencerConfiguration(120));
      const updatedBpm = 99;

      await request(app.getHttpServer()).put('/api/sequencer/bpm').send({ bpm: updatedBpm }).expect(HttpStatus.OK);

      expect(sequencerRepositoryMock.saveConfiguration).toHaveBeenCalledWith(
        createSampleSequencerConfiguration(updatedBpm),
      );
    });
  });

  describe('PUT /api/sequencer/grid', () => {
    it('should update the instrument grid', async () => {
      sequencerRepositoryMock.getConfiguration = jest
        .fn()
        .mockResolvedValueOnce(
          createSampleSequencerConfiguration(120, [{ isOn: false }, { isOn: false }, { isOn: false }, { isOn: false }]),
        );

      await request(app.getHttpServer())
        .put('/api/sequencer/grid')
        .send({
          instrumentId: InstrumentId.DRUMS,
          trackIndex: 0,
          stepIndex: 3,
          newValue: true,
        })
        .expect(HttpStatus.OK);

      expect(sequencerRepositoryMock.saveConfiguration).toHaveBeenCalledWith(
        createSampleSequencerConfiguration(120, [{ isOn: false }, { isOn: false }, { isOn: false }, { isOn: true }]),
      );
    });
  });
});
