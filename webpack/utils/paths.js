const path = require('path');

const paths = {
  SRC_DIR: path.resolve(__dirname, '../../src'),
  BUILD_DIR: path.resolve(__dirname, '../../dist'),
  HBS_HELPERS_DIR: path.resolve(__dirname, '../../src/utils/hbs-helpers')
};

module.exports = paths;
