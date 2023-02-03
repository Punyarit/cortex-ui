export const vars = 'var';
export const set = 'set';
export const fix = 'fix';
export type VarKey = typeof vars;
export type SetKey = typeof set;
export type FixKey = typeof fix;

export type Properties = {
  var?: unknown;
  set?: unknown;
  fix?: unknown;
  stx?: unknown;
};

export type OnVariable<Var extends Properties[VarKey]> = {
  oldVar: Var;
  setVariablesStyleSheet: () => void;
  cacheVariables: (vars: Var) => void;
  getCssText: (vars: Var) => string;
};

export type OnConfig<
  Set extends Properties['set'],
  Fix extends Properties[FixKey]
> = {
  fix?: Fix;
  config?: Set;
  cacheConfig: (vars: Set) => void;
  fixConfig: (vars: Set) => void;
  exec: (vars: Set) => void;
};

export type WatchCallback = (
  mutation: MutationRecord,
  observer: MutationObserver
) => void;

export type WatchTypes = {
  attributes?: WatchCallback;
  childList?: WatchCallback;
  characterData?: WatchCallback;
};
