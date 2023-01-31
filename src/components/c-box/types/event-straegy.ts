export const eventAttributes = ['mouseover-popover', 'mouseover-tooltip', 'click-dialog', 'click-snackbar'] as const;

export type EventAttributes = typeof eventAttributes[number];

export type EventStrategy = {
  events: (keyof HTMLElementEventMap)[];
  eventDetail: () => EventStrategy;
} & {
  [K in keyof HTMLElementEventMap]?: () => void;
};
