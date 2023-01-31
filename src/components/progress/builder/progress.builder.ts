import {
  ColorKeyTypes,
  ColorMap,
  ProgressAttributes,
  ProgressBuilderTypes,
  SizeKeyTypes,
  SizeMap,
} from '../types/progress.types';

class ProgressBuilder implements ProgressBuilderTypes {
  progress: ProgressAttributes;

  constructor() {
    this.progress = new ProgressAttributes();
  }

  setColor(color?: ColorKeyTypes): this {
    this.progress.color = ColorMap[color!];
    return this;
  }

  setSize(size?: SizeKeyTypes): this {
    this.progress.size = SizeMap[size!];
    return this;
  }

  build(): ProgressAttributes {
    return this.progress;
  }
}

export class ProgressDirector {
  static construct(config?: CXProgress.Props['set']): ProgressAttributes {
    return new ProgressBuilder().setColor(config?.color).setSize(config?.size).build();
  }
}
