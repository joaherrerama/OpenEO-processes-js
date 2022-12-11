const { Utils: CommonUtils } = require('@openeo/js-commons');
const OEProcessRegistry = require('./registry');

const Utils = {

  size(obj) {
    return CommonUtils.size(obj);
  },

  getRegistry(path) {
    const route = path ? path: './src/processes'
    const registry = new OEProcessRegistry();
    registry.addFromFolder(route);
    return registry
  }
};

module.exports = Utils;
