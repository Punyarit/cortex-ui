import { createComponent, EventName } from '@lit-labs/react';
import * as React from 'react';
import { Dialog, onAfterClosed, tagName } from '../../cx/components/materials/dialog/dialog';

export const CxDialog = createComponent({
  tagName,
  elementClass: Dialog,
  react: React,
  events: {
    onAfterClosed: onAfterClosed as EventName<CXDialog.AfterClosed>,
  },
});
