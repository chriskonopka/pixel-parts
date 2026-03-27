'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: { type: 'commonjs2' },
    clean: true,
  },
  /**
   * Externalize all peer dependencies so they are not bundled into the library.
   * Consumers must install these themselves.
   */
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@fluentui/react': '@fluentui/react',
    'office-ui-fabric-react': 'office-ui-fabric-react',
    'framer-motion': 'framer-motion',
    formik: 'formik',
    yup: 'yup',
    'html-react-parser': 'html-react-parser',
    'react-textarea-autosize': 'react-textarea-autosize',
    'dom-serializer': 'dom-serializer',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    mainFields: ['main', 'module', 'browser'],
  },
  module: {
    rules: [
      // Allow ESM packages (e.g. react-pdf-highlighter@7) that use extensionless
      // relative imports, which webpack 5 strict ESM mode requires to be fully
      // specified. Setting fullySpecified: false relaxes this for node_modules.
      {
        test: /\.m?js$/,
        include: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/libraries/pixelParts/styles'),
          to: path.resolve(__dirname, 'lib/scss'),
        },
      ],
    }),
  ],
};
