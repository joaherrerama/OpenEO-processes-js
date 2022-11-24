const OEProcess = require('../processgraph/process.js');

module.exports = class mean extends OEProcess {
  getMeanOfArray(numbers) {
    const { length } = numbers;
    let sum = 0;
    for (let i = 1; i < length; i++) {
      const value = numbers[i];
      sum += value;
    }
    return sum / length;
  }

  calcMean(typeArray) {
    const mean = () => {
      const mean = this.getMeanOfArray(typeArray);
      return mean;
    };

    return mean();
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const array = node.getArgument('typedArray');
    const result = await this.calcMean(array);
    return result;
  }
};
