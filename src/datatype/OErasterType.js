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
  constructor(bands, source, exif) {
    this.bands = bands
    this.source = source
    this.exif = exif
  }
  valitadorOERaster(){
    return true
  }
}
export class OERastercube {
  constructor(rasters) {
    this.rasters = (rastersArray) =>{
      try {
        validation = rastersArray[0].validatorOERaster()
        if(validation){
          return bands
        }
      } catch (error) {
        throw Error('The object is not an array or EORaster')
      }
    };;
    this.dimensions = []
  }
}