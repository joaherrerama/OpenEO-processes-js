const { fromArrayBuffer, writeArrayBuffer } = require('geotiff');
const OERaster = require('../datatype/OERaster.js');
const fastMax = require('fast-max');
const fastMin = require('fast-min');
const OEProcess = require('../processgraph/process.js');

module.exports = class ndvi extends OEProcess {
  #U8bitsArray(array, maxArray, minArray) {
    return array.map((x) => ((x - minArray) / (maxArray - minArray)) * 255);
  }

  #tdimentionsHandler(rastercube) {
    if (rastercube.tdimension.length === 0) {
      const n = rastercube.rasters.length;

      rastercube.tdimension = Array.apply(null, Array(n)).map(() => new Date());
    }
    return rastercube;
  }

  #undefunedValidator(image, band) {
    if (image === undefined) {
      throw Error(`${band} band undefined`);
    }
  }

  /* eslint-disable no-await-in-loop */
  async #ndviCalculation(image, red, nir) {
    const ImagesArray = image.bands;
    const redBand = ImagesArray[red].BufferArray;
    this.#undefunedValidator(redBand, 'red');

    const nirBand = ImagesArray[nir].BufferArray;
    this.#undefunedValidator(redBand, 'ndvi');

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
  async #CalcNdvi(rastercube, red, nir) {
    rastercube = this.#tdimentionsHandler(rastercube);
    for (const t in rastercube.tdimension) {
      const geotiff = rastercube.rasters[t];
      const n = geotiff.length;
      for (let i = 0; i < n; i += 1) {
        const image = geotiff[i];
        const ndviValue = await this.#ndviCalculation(image, red, nir);
        // create a 16 bit geotiff wit
        const ndviArrayBuffer = new Float32Array(ndviValue);
        const maxArray = fastMax(ndviValue);
        const minArray = fastMin(ndviValue);
        const metadata = {
          width: image.getWidth(),
          height: image.getHeight()
        };
        const newNdvi255 = this.#U8bitsArray(ndviArrayBuffer);
        const ndviArray = await writeArrayBuffer(newNdvi255, metadata);
        const ndviGeotiff = await fromArrayBuffer(ndviArray);
        console.log(ndviGeotiff);
        const EOraster = new OERaster(ndviGeotiff, 'ndvi_process', {
          max_norm: maxArray,
          min_norm: minArray,
          sourceArray: ndviArrayBuffer
        });
        console.log(EOraster);
        rastercube.rasters[t].push(EOraster);
        console.log(rastercube);
        return rastercube;
      }
    }
    return rastercube;
  }
  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const red = node.getArgument('red');
    const nir = node.getArgument('nir');
    const rasterCube = node.getArgument('rastercube');
    return await this.#CalcNdvi(rasterCube, red, nir);
  }
};
