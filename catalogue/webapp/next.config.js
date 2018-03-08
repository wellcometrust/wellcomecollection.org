const webpack = require('webpack');
const withTM = require('@weco/next-plugin-transpile-modules');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const commonDirRegExp = /@weco(?!.*node_modules)/;

const withBundleAnalyzerConfig = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  webpack(config, options) {
    config.module.rules.push({
      test: /\.scss$/,
      include: (str) => {
        return commonDirRegExp.test(str);
      },
      use: ['babel-loader', 'raw-loader', 'postcss-loader', 'sass-loader']
    });
    config.plugins.push(
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.NormalModuleReplacementPlugin(
        /moment-timezone\/data\/packed\/latest\.json/,
        require.resolve('./timezones.json')
      )
    );

    return config;
  }
});

module.exports = withTM({
  transpileModules: ['@weco'],
  ...withBundleAnalyzerConfig
});
