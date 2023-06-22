import { SequencerConfiguration } from '../domain/sequencer-configuration';
import { SequencerInstrumentStateBuilder } from './SequencerInstrumentStateBuilder';

export class SequencerConfigurationBuilder {
  private bpm: number;
  private instrumentStates: SequencerInstrumentStateBuilder[] = [];

  withBpm(bpm: number): this {
    this.bpm = bpm;
    return this;
  }

  withInstrument(builderFunction: (builder: SequencerInstrumentStateBuilder) => void = (e) => e): this {
    const newBuilder = new SequencerInstrumentStateBuilder();
    builderFunction(newBuilder);
    this.instrumentStates.push(newBuilder);
    return this;
  }

  build(): SequencerConfiguration {
    return {
      bpm: this.bpm,
      sequencerInstrumentStates: this.instrumentStates.map((builder) => builder.build()),
    };
  }
}
