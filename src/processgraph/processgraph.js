const { ProcessGraph } = require('@openeo/js-processgraphs');
const process_importer = require('./process_importer')

module.exports = class OEProcessGraph extends ProcessGraph {
  createProcessInstance(process) {
    const impl =  process_importer(process.id);
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
