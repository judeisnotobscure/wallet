const webpack = require('webpack');
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      path: require.resolve('path-browserify'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      fs: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
