import path from 'path';

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../**/*.mdx',
    '../../src/libraries/pixelParts/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/react',
    'storybook-css-modules'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../assets'],
  async webpackFinal(config) {
    // 1) Let imports drop the extension for TS too
    config.resolve.extensions.push('.ts', '.tsx');

    // 2) Keep your SCSS loader
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });

    // 3) Single Babel rule for JS+TS+JSX+TSX
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-typescript')
          ],
          plugins: [
            require.resolve('@babel/plugin-transform-react-jsx')
          ]
        }
      }
    });

    // 4) Your React alias (if you still need it)
    // Point to the parent package's React 18 install so that react-dom/client
    // (introduced in React 18) is resolvable by react-pdf-highlighter and other
    // deps that rely on it. docs/node_modules has React 17 which lacks client.js.
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
    };

    return config;
  }
};

export default config;
