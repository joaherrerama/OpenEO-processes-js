import { fromArrayBuffer, writeArrayBuffer } from 'geotiff';
import OERaster from '../../datatype/OErasterType.js';
import max from '../../stats/max/max.module.js';
import min from '../../stats/min/min.module.js';

function U8bitsArray(array, maxArray, minArray) {
  return array.map((x) => ((x - minArray) / (maxArray - minArray)) * 255);
}

function tdimentionsHandler(rastercube) {
  if (rastercube.tdimension.length === 0) {
    const n = rastercube.rasters.length;

    rastercube.tdimension = Array.apply(null, Array(n)).map(() => new Date());
  }
  return rastercube;
}

function undefunedValidator(image, band) {
  if (image === undefined) {
    throw Error(`${band} band undefined`);
  }
}

/* eslint-disable no-await-in-loop */
async function ndviCalculation(image, red, nir) {
  const ImagesArray = await image.readRasters();
  const redBand = ImagesArray[red];
  undefunedValidator(redBand, 'red');

  const nirBand = ImagesArray[nir];
  undefunedValidator(redBand, 'ndvi');

  if (redBand.length !== nirBand.length) {
    throw new Error('Image Dimensions do not fit');
  }

  const ndviValue = [];

  for (let i = 0; i < redBand.length; i += 1) {
    ndviValue[i] = (redBand[i] - nirBand[i]) / (redBand[i] + nirBand[i]);
  }
  return ndviValue;
}

/* eslint-disable no-await-in-loop */
async function ndvi(rastercube, red, nir) {
  rastercube = tdimentionsHandler(rastercube);

  for (const t in rastercube.tdimension) {
    const geotiff = await rastercube.rasters[t].geotiff;
    const n = await geotiff.getImageCount();
    for (let i = 0; i < n; i += 1) {
      const image = await geotiff.getImage(i);
      const ndviValue = await ndviCalculation(image, red, nir);

      // create a 16 bit geotiff wit
      const ndviArrayBuffer = new Float32Array(ndviValue);
      const maxArray = max(ndviArrayBuffer);
      const minArray = min(ndviArrayBuffer);
      const metadata = {
        width: image.getWidth(),
        height: image.getHeight()
      };
      const newNdvi255 = U8bitsArray(ndviArrayBuffer);
      const ndviArray = await writeArrayBuffer(newNdvi255, metadata);
      const ndviGeotiff = await fromArrayBuffer(ndviArray);
      const EOraster = new OERaster(ndviGeotiff, 'ndvi_process', {
        max_norm: maxArray,
        min_norm: minArray,
        sourceArray: ndviArrayBuffer
      });

      rastercube.rasters.push(EOraster);
      return rastercube;
    }
  }
  return rastercube;
}

export default ndvi;
