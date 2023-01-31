import {
  colorMap,
  IconAttributes,
  IconBuilderTypes,
  IconColorTypes,
  IconSizeTypes,
  sizeMap,
} from '../types/icon.types';

class IconBuilder implements IconBuilderTypes {
  icon: IconAttributes;

  constructor() {
    this.icon = new IconAttributes();
  }

  setColor(color?: IconColorTypes): this {
    this.icon.color = colorMap[color!];
    return this;
  }

  setSize(size?: IconSizeTypes): this {
    this.icon.size = sizeMap[size!];
    return this;
  }

  build(): IconAttributes {
    return this.icon;
  }
}

export class IconDirector {
  static construct(config?: CXIcon.Props['set']): IconAttributes {
    return new IconBuilder().setColor(config?.color).setSize(config?.size).build();
  }
}
