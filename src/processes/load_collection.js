var { fromArrayBuffer } = require('geotiff');
const { fromFile } = require('geotiff');
const fetch = require('cross-fetch');
const OERaster = require('../datatype/OERaster');
const OERastercube = require('../datatype/OERasterCube');
const OERasterBand = require('../datatype/OERasterBand');
const OEProcess = require('../processgraph/process');

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
      GeoKeys: image.getGeoKeys(),
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
    for (const url_image of urlImages) {
      try {
        const raster_cube = new OERastercube([], []);
        if (this.#UrlValidator(url_image)) {
          const response = await fetch(url_image);
          const arrayBuffer = await response.arrayBuffer();
          var geotiff = await fromArrayBuffer(arrayBuffer, { ovr: true });
        } else {
          var geotiff = await fromFile(url_image, { ovr: true });
        }


        const rasterType = await this.#OERasterBuilder(geotiff, url_image);
        raster_cube.rasters.push(rasterType);
        raster_cube.tdimension.push(new Date());
        return raster_cube;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const urlOrFile = node.getArgument('source');
    const result = await this.#createObjectFromImage(urlOrFile);
    return result;
  }
};
