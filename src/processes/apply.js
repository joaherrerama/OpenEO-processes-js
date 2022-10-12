const OEProcess = require('../processgraph/process.js');
const OERastercube = require('../datatype/OERasterCube');

module.exports = class max extends OEProcess {
  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const dc = node.getArgument('data');
    const pg = node.getArgument('process-graph');
    if (!(pg instanceof ProcessGraph)) {
      throw new Errors.ProcessArgumentInvalid({
        process: this.id,
        argument: 'process',
        reason: 'No process specified.'
      });
    }
    var result = await callback.execute({
      x: dc.getData(),
      context: node.getArgument('context')
    });
    dc.setData(result.getResult());
    return dc;
  }
};
