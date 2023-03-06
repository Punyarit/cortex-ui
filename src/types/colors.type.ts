export const shades = [
  '25',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const;
export type BaseColorAttr = Partial<Record<'white' | 'black', boolean>>;

export type GrayAttr = Partial<Record<`gray-${typeof shades[number]}`, boolean>>;

export type PrimaryAttr = Partial<Record<`primary-${typeof shades[number]}`, boolean>>;

export type ErrorAttr = Partial<Record<`error-${typeof shades[number]}`, boolean>>;

export type WarningAttr = Partial<Record<`warning-${typeof shades[number]}`, boolean>>;

export type SuccessAttr = Partial<Record<`success-${typeof shades[number]}`, boolean>>;

export type ModermGreenAttr = Partial<Record<`modern-green-${typeof shades[number]}`, boolean>>;

export type SurgeonGreenAttr = Partial<Record<`surgeon-green-${typeof shades[number]}`, boolean>>;

export type WellnessGreenAttr = Partial<
  Record<`wellness-green-${typeof shades[number]}`, boolean>
>;

export type SafeBlueAttr = Partial<Record<`safe-blue-${typeof shades[number]}`, boolean>>;

export type BlueprintAttr = Partial<Record<`blueprint-${typeof shades[number]}`, boolean>>;

export type VioletAlertAttr = Partial<Record<`violet-alert-${typeof shades[number]}`, boolean>>;

export type PurpleAttr = Partial<Record<`purple-${typeof shades[number]}`, boolean>>;

export type PinkyAttr = Partial<Record<`pinky-${typeof shades[number]}`, boolean>>;

export type RedFlagAttr = Partial<Record<`red-flag-${typeof shades[number]}`, boolean>>;

export type AlarmOrangeAttr = Partial<Record<`alarm-orange-${typeof shades[number]}`, boolean>>;

export type WarningYellowAttr = Partial<
  Record<`warning-yellow-${typeof shades[number]}`, boolean>
>;

export type BlueStateAttr = Partial<Record<`bluestate-${typeof shades[number]}`, boolean>>;

export type ShadowAttr = Partial<Record<`shadow-${typeof shades[number]}`, boolean>>;

export type ColorAttr = BaseColorAttr &
  GrayAttr &
  PrimaryAttr &
  ErrorAttr &
  WarningAttr &
  SuccessAttr &
  ModermGreenAttr &
  SurgeonGreenAttr &
  WellnessGreenAttr &
  SafeBlueAttr &
  BlueprintAttr &
  VioletAlertAttr &
  PurpleAttr &
  PinkyAttr &
  RedFlagAttr &
  AlarmOrangeAttr &
  WarningYellowAttr &
  BlueStateAttr &
  ShadowAttr;

export type ColorTypes = keyof ColorAttr;
