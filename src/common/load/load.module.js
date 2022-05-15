import fetch from 'node-fetch'
import { promises as fs } from 'fs'; 
import ExifReader from 'exifreader';

function UrlValidator (string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }
  return true;
}

function get_exif(buffer){
  const tags = ExifReader.load(buffer, {
    expanded: true,
    includeUnknown: true
  });
  return tags.exif
}

function OERasterBuilder(arrayBuffer){
  const meta = get_exif(arrayBuffer)
  const bits = meta.BitsPerSample.value
  const arr = TypedArray(arrayBuffer, bits)
  const nBands = meta.SamplesPerPixel.value
  var bands = new Array(nBands)
  for(var b=0; b <nBands; b++){
    let img_arr = []
    let iter = b
    for(var i=0; i < meta.ImageLength.value; i++){
      for(var j=0; j < meta.ImageWidth.value; j++){
        img_arr.push(arr[j + iter])
        iter = meta.SamplesPerPixel.value
      }
    }
    let typeArray = TypedArray(img_arr, bits)
    bands[b] = new OERasterBand(typeArray,b)
  }
  return new OERaster(bands,url_sample,meta)
}

async function createObjectFromImage (url_image) {
  try{
    if(UrlValidator(url_image)){
      const response = await fetch(url_image);
      const arrayBuffer = await response.arrayBuffer();
      const rasterType = OERasterBuilder(arrayBuffer)
      return rasterType
    }else{
      const arrayBuffer = await fs.readFile(url_image);
      const rasterType = OERasterBuilder(arrayBuffer)
      return rasterType
    }
  }catch(e){
    throw Error(e)
  }
}

async function load (urlOrFile) {
  const load = async () => {
    const raster = await createObjectFromImage(urlOrFile)
    return raster
  }

  return load()
}

export default load
