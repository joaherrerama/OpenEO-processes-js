module.exports = class OERasterBand {
  constructor(BufferArray = [], label = null) {
    this.BufferArray = BufferArray;
    this.label = label;
  }

  get bufferArray() {
    return this.BufferArray;
  }

  set setLabel(label) {
    this.label = label;
  }
};
