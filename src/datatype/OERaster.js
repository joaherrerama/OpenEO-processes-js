const OERasterBand = require('./OERasterBand');

module.exports = class OERaster {
  constructor(bands = [OERasterBand], source = null, metadata = {}) {
    this.bands = bands;
    this.source = source;
    this.metadata = metadata;
  }

  addBand(band) {
    if (band instanceof OERasterBand) {
      this.bands.push(band);
    } else {
      throw Error('Error: it is not a valid OERasterband');
    }
  }

  get getSource() {
    return this.source;
  }

  set setSource(url) {
    if (this.source) {
      throw Error('source already declare');
    } else {
      this.source = url;
    }
  }

  getWidth() {
    return this.metadata.fileDirectory.ImageWidth;
  }

  getHeight() {
    return this.metadata.fileDirectory.ImageLength;
  }
};
