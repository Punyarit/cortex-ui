export type CssType = 'class' | 'before' | 'after' | 'slotted' | 'preset';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type State = 'active' | 'focus' | 'focus-visible' | 'focus-within' | 'target' | 'hover';

export type AttrStyle = Breakpoint | State;

type ModifiedType = `${CssType}` | `${CssType}_${State}` | `${CssType}_${State}_${Breakpoint}`;

// Generate all possible combinations
type Combinations<T extends string, U extends string[] = []> = U['length'] extends 6
  ? []
  : T extends infer X
  ? X extends string
    ? [X, ...Combinations<T, [X, ...U]>]
    : never
  : never;

export type AllCombinations = Combinations<ModifiedType>[number];
