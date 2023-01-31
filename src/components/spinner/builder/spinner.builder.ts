import {
  ColorKeyTypes,
  ColorMap,
  SizeKeyTypes,
  SizeMap,
  SpinnerAttributes,
  SpinnerBuilderTypes,
} from '../types/spinner.types';

class SpinnerBuilder implements SpinnerBuilderTypes {
  spinner: SpinnerAttributes;

  constructor() {
    this.spinner = new SpinnerAttributes();
  }

  setColor(color?: ColorKeyTypes): this {
    this.spinner.color = ColorMap[color!];
    return this;
  }

  setSize(size?: SizeKeyTypes): this {
    this.spinner.size = SizeMap[size!];
    return this;
  }

  build(): SpinnerAttributes {
    return this.spinner;
  }
}

export class SpinnerDirector {
  static construct(config?: CXSpinner.Props['set']): SpinnerAttributes {
    return new SpinnerBuilder().setColor(config?.color).setSize(config?.size).build();
  }
}
