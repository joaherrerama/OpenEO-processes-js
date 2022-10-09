const OEProcess = require('../processgraph/process.js');

module.exports = class max extends OEProcess {
  #getMaxOfArray(numArray) {
    let max = 0;
    numArray.map((x) => {
      x > max ? (max = x) : (max = max);
    });
    return max;
  }

  calcMax(typeArray) {
    const max = () => {
      const maxRaster = this.#getMaxOfArray(typeArray);
      return maxRaster;
    };

    return max();
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const array = node.getArgument('typedArray');
    const result = await this.calcMax(array);
    console.log(result);
    return result;
  }
};
