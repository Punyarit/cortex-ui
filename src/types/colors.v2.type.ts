import { shadeV2 } from './colors.version-control';

export type BaseColorAttr = Partial<Record<'white' | 'black', boolean>>;

export type GrayAttr = Partial<Record<`gray-${typeof shadeV2[number]}`, boolean>>;

export type PrimaryAttr = Partial<Record<`primary-${typeof shadeV2[number]}`, boolean>>;

export type ErrorAttr = Partial<Record<`error-${typeof shadeV2[number]}`, boolean>>;

export type WarningAttr = Partial<Record<`warning-${typeof shadeV2[number]}`, boolean>>;

export type SuccessAttr = Partial<Record<`success-${typeof shadeV2[number]}`, boolean>>;

export type ModermGreenAttr = Partial<Record<`modern-green-${typeof shadeV2[number]}`, boolean>>;

export type SurgeonGreenAttr = Partial<Record<`surgeon-green-${typeof shadeV2[number]}`, boolean>>;

export type WellnessGreenAttr = Partial<Record<`wellness-green-${typeof shadeV2[number]}`, boolean>>;

export type SafeBlueAttr = Partial<Record<`safe-blue-${typeof shadeV2[number]}`, boolean>>;

export type BlueprintAttr = Partial<Record<`blueprint-${typeof shadeV2[number]}`, boolean>>;

export type VioletAlertAttr = Partial<Record<`violet-alert-${typeof shadeV2[number]}`, boolean>>;

export type PurpleAttr = Partial<Record<`purple-${typeof shadeV2[number]}`, boolean>>;

export type PinkyAttr = Partial<Record<`pinky-${typeof shadeV2[number]}`, boolean>>;

export type RedFlagAttr = Partial<Record<`red-flag-${typeof shadeV2[number]}`, boolean>>;

export type AlarmOrangeAttr = Partial<Record<`alarm-orange-${typeof shadeV2[number]}`, boolean>>;

export type WarningYellowAttr = Partial<Record<`warning-yellow-${typeof shadeV2[number]}`, boolean>>;

export type BlueStateAttr = Partial<Record<`bluestate-${typeof shadeV2[number]}`, boolean>>;

export type ShadowAttr = Partial<Record<`shadow-${typeof shadeV2[number]}`, boolean>>;

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

export type ColorTypesV2 = keyof ColorAttr;
