import OERaster, { OERastercube } from "../../datatype/OErasterType.js";
import GeoTIFF, { fromArrayBuffer, writeArrayBuffer } from "geotiff";
import max from "../../stats/max/max.module.js";
import min from "../../stats/min/min.module.js";

function U8bitsArray(array, max_array, min_array) {
  return array.map(function (x) {
    return ((x - min_array) / (max_array - min_array)) * 255;
  });
}

function tdimentionsHandler(rastercube) {
  if (rastercube.tdimension.length == 0) {
    let n = rastercube.rasters.length;

    rastercube.tdimension = Array.apply(null, Array(n)).map(function (x, i) {
      return new Date();
    });
  }
  return rastercube;
}

function undefunedValidator(image, band) {
  if (image === undefined) {
    throw Error(`${band} band undefined`);
  }
}

async function ndviCalculation(image, red, nir) {
  let ImagesArray = await image.readRasters();
  const red_band = ImagesArray[red];
  undefunedValidator(red_band, "red");

  const nir_band = ImagesArray[nir];
  undefunedValidator(red_band, "ndvi");

  if (red_band.length != red_band.length) {
    throw new Error("Image Dimensions do not fit");
  }

  var ndvi_value = [];

  for (let i = 0; i < red_band.length; i++) {
    ndvi_value[i] = (red_band[i] - nir_band[i]) / (red_band[i] + nir_band[i]);
  }
  return ndvi_value;
}

async function ndvi(rastercube, red, nir) {
  rastercube = tdimentionsHandler(rastercube);

  for (let t in rastercube.tdimension) {
    var geotiff = await rastercube.rasters[t].geotiff;
    var n = await geotiff.getImageCount();
    for (let i = 0; i < n; i++) {
      let image = await geotiff.getImage(i);
      let ndvi_value = await ndviCalculation(image, red, nir);

      // create a 16 bit geotiff wit
      let ndviArrayBuffer = new Float32Array(ndvi_value);

      const max_array = max(ndvi_value);
      const min_array = min(ndvi_value);
      let metadata = {
        width: image.getWidth(),
        height: image.getHeight(),
      };
      const newNdvi255 = U8bitsArray(ndvi_value);
      let ndvi_array = await writeArrayBuffer(newNdvi255, metadata);
      let ndviGeotiff = await fromArrayBuffer(ndvi_array);
      let EOraster = new OERaster(ndviGeotiff, "ndvi_process", {
        max_norm: max_array,
        min_norm: min_array,
      });

      rastercube.rasters.push(EOraster);
      return rastercube;
    }
  }
  return rastercube;
}

export default ndvi;
