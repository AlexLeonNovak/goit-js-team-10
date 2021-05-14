const dateFormat = require('dateformat');

module.exports = function (value, format) {
  return dateFormat(value, format);
};
