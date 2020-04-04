const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { index: './src/index.tsx' },
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],
    alias: {
      'vue': path.resolve(__dirname, './node_modules/vue'),
      '@vue/composition-api': path.resolve(__dirname, './node_modules/@vue/composition-api'),
      '@jarveybot/core': path.resolve(__dirname, './node_modules/@jarveybot/core'),
    }
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'vue',
    },
    '@vue/composition-api': {
      commonjs: '@vue/composition-api',
      commonjs2: "@vue/composition-api",
      amd: 'vueCompositionApi',
      root: 'vueCompositionApi'
    },
    '@jarveybot/core': {
      commonjs: '@jarveybot/core',
      commonjs2: '@jarveybot/core',
      amd: 'core',
      root: 'core'
    }
  }
};
