const OEProcess = require('../processgraph/process.js');

module.exports = class abs extends OEProcess {

  #calcAbs(x) {
    return x > 0 ? x : x * -1;
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const x = node.getArgument('x');
    const result = await this.#calcAbs(x);
    return result;
  }
};