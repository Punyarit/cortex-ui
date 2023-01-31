import { createComponent } from '@lit-labs/react';
import * as React from 'react';
import { tagName, Theme } from '../../cx/components/materials/theme/theme';

export const CxTheme = createComponent({
  tagName,
  elementClass: Theme,
  react: React,
});
