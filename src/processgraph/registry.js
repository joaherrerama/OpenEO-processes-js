const fse = require('fse');
const { ProcessRegistry } = require('@openeo/js-commons');
const path = require('path');

module.exports = class OEProcessRegistry extends ProcessRegistry {
  constructor() {
    super();
  }

  addFromFolder(folder) {
    const Utils = require('../processgraph/utils');
    fse.readdirSync(folder).forEach((file) => {
      if (file.endsWith('.js')) {
        const id = path.basename(file, '.js');
        this.addFromFile(id);
      }
    });
    const num = Utils.size(this.namespace('backend'));
    console.info(`Loaded ${num} processes.`);
    return Promise.resolve(num);
  }

  async addFromFile(id) {
    const spec = require(`../processes/${id}.json`);
    delete spec.process_graph;
    this.add(spec, 'backend');
  }
};