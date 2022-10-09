const OEProcess = require('../processgraph/process.js');

module.exports = class max extends OEProcess {
  getModeOfArray(
    numbers,
    { debug = false, no_data = undefined } = {
      debug: false,
      no_data: undefined
    }
  ) {
    const modes = [];
    const count = [];
    let i;
    let number;
    let maxIndex = 0;

    numbers.map((number) => {
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    });

    for (i in count) {
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
          modes.push(Number(i));
        }
      }
    }

    if (modes.length == 1) {
      return modes[0];
    }
    return modes;
  }

  calcMode(typeArray) {
    const mode = () => {
      const mode = getModeOfArray(typeArray);
      return mode;
    };

    return mode();
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const array = node.getArgument('typedArray');
    const result = await this.calcMode(array);
    console.log(result);
    return result;
  }
};
