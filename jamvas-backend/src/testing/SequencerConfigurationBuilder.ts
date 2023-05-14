import { SequencerConfiguration } from '../sequencer/sequencer-configuration';
import { SequencerInstrumentStateBuilder } from './SequencerInstrumentStateBuilder';

export class SequencerConfigurationBuilder {
  private bpm: number;
  private instrumentStates: SequencerInstrumentStateBuilder[] = [];

  withBpm(bpm: number): SequencerConfigurationBuilder {
    this.bpm = bpm;
    return this;
  }

  withInstrument(
    builderFunction: (builder: SequencerInstrumentStateBuilder) => void = (e) => e,
  ): SequencerConfigurationBuilder {
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
