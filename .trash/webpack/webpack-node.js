const path = require('path');
const appRootDir = require('app-root-dir').get();
const nodeExternals = require('webpack-node-externals');

module.exports = function (env, { mode = 'development' }) {

  const PROD = mode === 'production';

  const babelConfig = {};
  babelConfig.presets = [];
  babelConfig.presets.push(["@babel/preset-env", {
    modules: false,
    shippedProposals: true, // to support spread operators
    targets: { node: "8" }
  }]);
  babelConfig.plugins = [];

  babelConfig.plugins.push("import-glob");
  babelConfig.plugins.push("@babel/plugin-proposal-optional-catch-binding");
  babelConfig.plugins.push("@babel/plugin-proposal-class-properties");

  const config = {};

  config.mode = PROD ? 'production' : 'development';
  config.devtool = 'source-map';
  config.target = 'node';

  config.stats = "minimal";

  config.entry = require('lodash/mapValues')(require('./get-node-red-configs'),
    ({ path: p, node }, name) => `node-red-node-loader?nodeName=${name}!${path.join(p, node)}`
  );

  config.output = {};
  config.output.path = PROD ? path.join(appRootDir, './dist') : path.join(appRootDir, './.tmp/nodes');

  const filename = '[name].[ext]';

  config.output.filename = '[name].js';
  config.output.library = ''; // ["popupeteer", "[name]"];
  config.output.libraryTarget = 'commonjs2';
// config.output.libraryExport = 'default';
  config.output.umdNamedDefine = true;

  config.resolveLoader = { alias: {} };
  config.resolveLoader.alias['node-red-node-loader'] = path.join(__dirname, "./loaders/node-red-node-loader");

  config.externals = [nodeExternals({
    whitelist: [/\.(css|less|scss)$/]
  })];

  config.node = {
    global: true,
    __dirname: false,
    __filename: false,
    process: true,
    Buffer: true
  };

  config.module = { rules: [] };

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: ['babel-loader?' + JSON.stringify({ ...babelConfig, babelrc: false })],
  });

  config.plugins = [];

  config.plugins.push(new (require('generate-package-json-webpack-plugin'))(
    {
      name: require('../package.json').name,
      "node-red": {
        nodes: require('lodash/mapValues')(config.entry, (v, k) => `dist/${k}.js`)
      }
    },
    path.join(appRootDir, './package.json')
  ));

  PROD && config.plugins.push(new (require('on-build-webpack'))(() => {
    const packageJson = require(path.join(appRootDir, 'package.json'));
    packageJson['node-red'] = { nodes: require('lodash/mapValues')(config.entry, (v, k) => `dist/${k}.js`) };

    const packageText = JSON.stringify(packageJson, null, 2);
    require('fs').writeFileSync(path.join(appRootDir, 'package.json'), packageText);
  }));

  return config;
};
