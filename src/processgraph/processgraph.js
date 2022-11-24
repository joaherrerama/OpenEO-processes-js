const { ProcessGraph } = require('@openeo/js-processgraphs');
const OEProcess = require('./process');

module.exports = class OEProcessGraph extends ProcessGraph {
  createProcessInstance(process) {
    const path = `../processes/${process.id}.js`;
    const impl = require(path);
    const instance = new impl(process);
    return instance;
  }

  async executeNode(node) {
    const process = this.getProcess(node);
    return await process.execute(node);
  }

  async validateNode(node) {
    const process = this.getProcess(node);
    // return await process.validate(node);
  }

  createProcessGraphInstance(process) {
		let pg = new OEProcessGraph(process, this.processRegistry, this.getJsonSchemaValidator());
		return this.copyProcessGraphInstanceProperties(pg);
	}
};
