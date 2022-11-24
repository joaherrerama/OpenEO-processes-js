const OEProcess = require('../processgraph/process.js');

module.exports = class max extends OEProcess {
  #getMinOfArray(
    numArray,
    { debug = false, no_data = undefined } = {
      debug: false,
      no_data: undefined,
    },
  ) {
    let min = 1000;
    numArray.map((x) => {
      x < min ? (min = x) : (min = min);
    });
    return min;
  }

  calcMin(typeArray) {
    const min = () => {
      const min = this.#getMinOfArray(typeArray);
      return min;
    };

    return min();
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const array = node.getArgument('typedArray');
    const result = await this.calcMin(array);
    return result;
  }
};
