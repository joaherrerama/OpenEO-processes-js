const OEProcess = require('../processgraph/process.js');

module.exports = class median extends OEProcess {
  getMedianOfArray(numbers) {
    let medianEst = 0;
    const numsLen = numbers.length;
    numbers.sort();

    if (numsLen % 2 === 0) {
      medianEst = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else {
      medianEst = numbers[(numsLen - 1) / 2];
    }

    return medianEst;
  }

  calcMedian(typeArray) {
    const median = () => {
      const median = this.getMedianOfArray(typeArray);
      return median;
    };

    return median();
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const array = node.getArgument('data');
    const result = await this.calcMedian(array);
    return result;
  }
};
