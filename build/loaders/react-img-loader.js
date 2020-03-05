const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  let { filter } = options;
  let reg = /src=(['"](?!.*(http|https|static))[^'"]*['"])/g;
  if (filter) {
    reg = new RegExp(`src=(['"](?!.*(http|https|${filter}))[^'"]*['"])`, 'g')
  }
  let ret = source.replace(reg, ($0, $1) => {
    return $0.replace($1, `{require(${$1}).default}`)
  })
  return ret;
};