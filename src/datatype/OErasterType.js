export class OERasterBand{
    constructor(BufferArray, label, exif) {
      this.BufferArray = BufferArray;
      this.label = label,
      this.exif = exif
    }
    valitadorOEBand(){
      return true
    }
}

export default class OERaster{
  constructor(bands, source) {
    this.bands = (bandsArray) =>{
      try {
        validation = bandsArray[0].valitadorOEBand()
        if(validation){
          return bands
        }
      } catch (error) {
        throw Error('The object is not an array or EORasterBand')
      }
    };
    this.source = source
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