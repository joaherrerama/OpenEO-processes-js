const { fromArrayBuffer, fromFile } = require('geotiff');
const fetch = require('cross-fetch');
const OERaster = require('../datatype/OERaster.js');
const OERastercube = require('../datatype/OERasterCube.js');
const OERasterBand = require('../datatype/OERasterBand.js');
const OEProcess = require('../processgraph/process.js');

module.exports = class load_collection extends OEProcess {
  #UrlValidator(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  }

  async #OERasterBuilder(geotiff, urlSample) {
    const image = await geotiff.getImage(0);
    const ImagesArray = await image.readRasters();
    const metadata = {
      fileDirectory: image.getFileDirectory(),
      gdalMetadata: image.getGDALMetadata(),
      gdalNoData: image.getGDALNoData(),
      GeoKeys: image.getGeoKeys()
    };
    const raster = new OERaster([], urlSample, metadata);
    let n = 0;
    ImagesArray.map((array) => {
      const band = new OERasterBand(array, n);
      raster.addBand(band);
      n++;
    });
    return raster;
  }

  async #createObjectFromImage(urlImages) {
    if (typeof urlImages === 'string') {
      urlImages = [urlImages];
    }
    const raster_cube = new OERastercube([], []);
    for (const url_image of urlImages) {
      try {
        if (this.#UrlValidator(url_image)) {
          const response = await fetch(url_image);
          const arrayBuffer = await response.arrayBuffer();
          var geotiff = await fromArrayBuffer(arrayBuffer, { ovr: true });
        } else {
          var geotiff = await fromFile(url_image, { ovr: true });
        }

        let rasterArr = [];

        const rasterType = await this.#OERasterBuilder(geotiff, url_image);
        rasterArr.push(rasterType);
        raster_cube.rasters.push(rasterArr);
        raster_cube.tdimension.push(new Date());
      } catch (e) {
        console.error(e);
      }
    }
    return raster_cube;
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const urlOrFile = node.getArgument('source');
    const result = await this.#createObjectFromImage(urlOrFile);
    console.log(result);
    return result;
  }
};
