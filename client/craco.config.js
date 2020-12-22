const path = require("path");
const CracoLessPlugin = require('craco-less');
const { getLoader, loaderByName } = require("@craco/craco");

const absolutePath = path.join(__dirname, "../shared");

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );

      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat(absolutePath);
      }
      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#008D9B',
              // '@normal-color': '#5B5B5B',
              // do we want these?
              '@success-color': '#10C864',
              '@error-color': '#EC5D53',
              '@warning-color': '#FFBE71',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
