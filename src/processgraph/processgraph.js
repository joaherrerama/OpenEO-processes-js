const { ProcessGraph } = require('@openeo/js-processgraphs');
const OEProcess = require('./process');

module.exports = class OEProcessGraph extends ProcessGraph {
  createProcessInstance(process) {
    const path = '../processes/' + process.id + '.js';
    var impl = require(path);
    console.log('Instance Created');
    let instance = new impl(process);
    return instance;
  }

  async executeNode(node) {
    const process = this.getProcess(node);
    console.log('Executing node ' + node.id);
    return await process.execute(node);
  }

  async validateNode(node) {
    var process = this.getProcess(node);
    // return await process.validate(node);
  }
};
