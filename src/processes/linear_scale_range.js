const OEProcess = require('../processgraph/process.js');

module.exports = class linear_scale_range extends OEProcess {

  #calcScale(x, inputMax, inputMin, outputMax, outputMin) {
    if(x === inputMax){
      return outputMax
    }
    if(x === inputMin){
      return outputMin
    }
    const scale1 = (x - inputMin) / (inputMax - inputMin);
    const scale2 = (outputMax - outputMin) + outputMin;
    const scale = scale1 * scale2
    return scale;
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const x = node.getArgument('x');
    const inputMin = node.getArgument('inputMin');
    const inputMax = node.getArgument('inputMax');
    let outputMin = node.getArgument('outputMin');
    let outputMax = node.getArgument('outputMax');
    if(!outputMax){
      outputMax = 1;
    }
    if(!outputMin){
      outputMin=0
    }
    const result = await this.#calcScale(x, inputMax, inputMin, outputMax, outputMin);
    return result;
  }
};