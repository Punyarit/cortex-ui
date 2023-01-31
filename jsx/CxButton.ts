import { createComponent, EventName } from '@lit-labs/react';
import * as React from 'react';
import { Button, onPressed, tagName } from '../cx/components/button/button';

export const CxButton = createComponent({
  tagName,
  elementClass: Button,
  react: React,
  events: {
    onPressed: onPressed as EventName<CXButton.Pressed>,
  },
});
