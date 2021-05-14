const dateFormat = require('dateformat');

module.exports = function(value, format) {
  console.log(format);
  return dateFormat(value, format);
};
