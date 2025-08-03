import 'css/main.css';

import type { Preview } from '@storybook/react-vite';
import React from 'react';
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'BenchNine, Arial, Helvetica, sans-serif' }}>
        <Story />
      </div>
    ),
  ],

  tags: ['autodocs']
};

export default preview;
