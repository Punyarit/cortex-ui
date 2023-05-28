type Type = 'class' | 'style' | 'icon' | 'before' | 'after' | 'animate' | 'slotted';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type State = 'active' | 'focus' | 'focus-visible' | 'focus-within' | 'target' | 'hover';

export type AttrStyle = Breakpoint | State;

type ModifiedType = `${Type}` | `${Type}_${State}` | `${Type}_${State}_${Breakpoint}`;

// Generate all possible combinations
type Combinations<T extends string, U extends string[] = []> = U['length'] extends 6
  ? []
  : T extends infer X
  ? X extends string
    ? [X, ...Combinations<T, [X, ...U]>]
    : never
  : never;

export type AllCombinations = Combinations<ModifiedType>[number];
