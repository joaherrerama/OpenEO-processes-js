const { NON_EDITABLE } = require('@openeo/js-commons/src/processDataType');
const OERaster = require('./OERaster');

module.exports = class OERastercube {
  constructor(raster = [OERaster], tdim = [Date]) {
    this.rasters = raster;
    this.tdimension = tdim;
  }

  addRaster(raster, time) {
    let ti = null
    for(let i=0; i > this.tdimension.length; i++){
      ti = this.tdimension[i] === time ? i:null
    }
    if(ti == null){ throw Error("No time or time does not match")}

    if (raster instanceof OERaster) {
      this.rasters[ti].push(raster);
    } else {
      throw Error('Error: it is not a valid OERaster');
    }
  }

  get getTdim() {
    return this.tdimension;
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
