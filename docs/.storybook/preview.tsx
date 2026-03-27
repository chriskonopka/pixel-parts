import React from 'react';
import type { Preview } from '@storybook/react';
import {
  Title,
  Description,
  Primary,
  Controls,
  Stories,
  Source,
  useOf,
} from '@storybook/blocks';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

const PACKAGE_NAME = '@mwe-apps/pixel-parts';

function ImportSnippet() {
  const meta = useOf("meta") as any;
  const componentName = meta.preparedMeta.component.displayName || 'Component';

  return (
    <Source 
      code={`import { ${componentName} } from '${PACKAGE_NAME}';`} 
      language='ts' 
      format 
      dark
    />
  );
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      values: [
        { name: 'Light', value: '#fff' },
        { name: 'Dark', value: '#292929' },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: { method: 'alphabetical' },
    },
    docs: {
      canvas: { sourceState: 'shown' },
      page: () => (
        <>
          <Title />
          <Description />
          <ImportSnippet />
          <Primary />
          <h2>Component API</h2>
          <Controls />
          <h2>Examples</h2>
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
};

export default preview;