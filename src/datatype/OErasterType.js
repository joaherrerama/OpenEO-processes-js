export class OERasterBand {
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
}

export default class OERaster {
  constructor(bands = [OERasterBand], source = null, metadata = {}) {
    this.bands = bands;
    this.source = source;
    this.metadata = metadata;
  }

  #valitadorOERaster() {
    return true;
  }

  addBand(band) {
    if (band instanceof OERasterBand) {
      this.bands.push(band);
    } else {
      console.error('Error: it is not a valid OERasterband');
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
}

export class OERastercube {
  constructor(raster = [OERaster], tdim = [Date]) {
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
}
