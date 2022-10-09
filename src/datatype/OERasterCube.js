const OERaster = require('./OERaster');

module.exports = class OERastercube {
  constructor(raster = [[OERaster]], tdim = [Date]) {
    this.rasters = raster;
    this.tdimension = tdim;
  }

  addRaster(raster) {
    if (raster instanceof OERaster) {
      this.rasters.push(raster);
    } else {
      console.error('Error: it is not a valid OERaster');
    }
  }

  get getTdim() {
    return this.tdimension;
  }

  set setTdim(tdim) {
    this.tdimension = tdim;
  }

  setTdim(tdim, nCube) {
    if (tdim instanceof Date) {
      this.tdimension[nCube] = tdim;
    } else {
      throw Error('Tdimension should be a Date object');
    }
  }

  getImage(i) {
    if (!Number.isInteger(i)) {
      throw Error('band does not exist');
    }
    return this.rasters[i];
  }
};
