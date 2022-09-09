import { fromArrayBuffer, fromFile } from 'geotiff';
import fetch from 'cross-fetch';
import OERaster, {
  OERastercube,
  OERasterBand
} from '../../datatype/OErasterType.js';
import { OEProcess } from '../../processgraph/process/process.module.js';

function UrlValidator(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

async function OERasterBuilder(geotiff, urlSample) {
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

async function createObjectFromImage(urlImages) {
  if (typeof urlImages === 'string') {
    urlImages = [urlImages];
  }
  const raster_cube = new OERastercube([], []);
  for (const url_image of urlImages) {
    try {
      if (UrlValidator(url_image)) {
        const response = await fetch(url_image);
        const arrayBuffer = await response.arrayBuffer();
        var geotiff = await fromArrayBuffer(arrayBuffer);
      } else {
        var geotiff = await fromFile(url_image);
      }

      const rasterType = await OERasterBuilder(geotiff, url_image);
      raster_cube.rasters.push(rasterType);
      raster_cube.tdimension.push(new Date());
    } catch (e) {
      console.error(e);
    }
  }
  return raster_cube;
}

class load_collection extends OEProcess {
  process(data, bands, node) {
    return Commons.filterBands(data, bands, node);
  }

  async execute(node) {
    const urlOrFile = node.getArgument('source');
    return await createObjectFromImage(urlOrFile);
  }
}

export default load_collection;
