const { ProcessRegistry } = require('@openeo/js-commons');
const processes = require('./processJSONImporter');

module.exports = class OEProcessRegistry extends ProcessRegistry {
  constructor() {
    super();
  }

  addFromFolder(folder) {
    const Utils = require('../processgraph/utils');
    Object.keys(processes).forEach((id) => {
        this.addFromFile(id);
    });
    const num = Utils.size(this.namespace('backend'));
    console.info(`Loaded ${num} processes.`);
    return Promise.resolve(num);
  }

  async addFromFile(id) {
    const spec = JSON.parse(JSON.stringify(processes[id]));
    delete spec.process_graph;
    this.add(spec, 'backend');
  }
};
