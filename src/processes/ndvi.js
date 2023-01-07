const OEProcess = require('../processgraph/process.js');
const OERasterBand = require('../datatype/OERasterBand.js');

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

    const ndviValue = new Float32Array(redBand.length);

    for (let i = 0; i < redBand.length; i += 1) {
      ndviValue[i] = (redBand[i] - nirBand[i]) / (redBand[i] + nirBand[i]);
    }
    return ndviValue;
  }

  /* eslint-disable no-await-in-loop */
  async #CalcNdvi(rastercube, red, nir) {
    rastercube = this.#tdimentionsHandler(rastercube);
    for (const t in rastercube.tdimension) {
      const image = rastercube.rasters[t];
      const ndviArrayBuffer = await this.#ndviCalculation(image, red, nir);
      const EOraster = new OERasterBand(ndviArrayBuffer, 'ndvi_process');
      rastercube.rasters[t].bands.push(EOraster);
      return rastercube;
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
