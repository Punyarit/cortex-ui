import { createComponent } from '@lit-labs/react';
import * as React from 'react';
import { Spinner } from '../../cx/components/materials/spinner/spinner';

export const CxSpinner = createComponent({
  tagName: 'cx-spinner',
  elementClass: Spinner,
  react: React,
});
