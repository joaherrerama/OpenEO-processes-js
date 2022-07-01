export class OERasterBand{
    constructor(BufferArray, label) {
      this.BufferArray = BufferArray;
      this.label = label
    }
    valitadorOEBand(){
      return true
    }
}

export default class OERaster{
  constructor(geotiff=null, source=null, extraProperties={}) {
    this.geotiff = geotiff
    this.source = source
    this.extraProperties = extraProperties
  }
  valitadorOERaster(){
    return true
  }
}
export class OERastercube {
  constructor(rasters, tdimension=new Date()) {
    this.rasters = rasters
    this.tdimension = tdimension
  }
}