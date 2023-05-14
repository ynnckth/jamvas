import { InstrumentId } from '../sequencer/instrument-id';
import { SequencerInstrumentState } from '../sequencer/sequencer-configuration';
import { TrackBuilder } from './TrackBuilder';

export class SequencerInstrumentStateBuilder {
  private instrumentId: InstrumentId;
  private displayName: string;
  private tracks: TrackBuilder[] = [];

  withInstrumentId(instrumentId: InstrumentId): SequencerInstrumentStateBuilder {
    this.instrumentId = instrumentId;
    return this;
  }

  withDisplayName(displayName: string): SequencerInstrumentStateBuilder {
    this.displayName = displayName;
    return this;
  }

  withTrack(builderFunction: (builder: TrackBuilder) => void = (e) => e): SequencerInstrumentStateBuilder {
    const newBuilder = new TrackBuilder();
    builderFunction(newBuilder);
    this.tracks.push(newBuilder);
    return this;
  }

  build(): SequencerInstrumentState {
    return {
      instrumentId: this.instrumentId,
      instrumentDisplayName: this.displayName,
      tracks: this.tracks.map((builder) => builder.build()),
    };
  }
}
