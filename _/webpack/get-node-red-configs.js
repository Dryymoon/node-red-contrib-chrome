const path = require('path');

const configs = {};

require("glob").sync(path.join(__dirname, '../src/**/node-red.json'))
  .forEach(file => {
    // console.log('filePath', file);
    try {
      const config = require(file);
      const { name } = config;
      configs[name] = { ...config, path: path.dirname(file) };
    } catch (e) {console.error(e);}
  });

module.exports = configs;
