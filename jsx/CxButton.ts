import { createComponent, EventName } from '@lit-labs/react';
import * as React from 'react';
import { Button, onPressed, tagName } from '../../cx/components/materials/button/button';

export const CxButton = createComponent({
  tagName,
  elementClass: Button,
  react: React,
  events: {
    onPressed: onPressed as EventName<CXButton.Pressed>,
  },
});
