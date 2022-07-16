import { fromArrayBuffer, fromFile } from 'geotiff';
import OERaster, { OERastercube } from '../../datatype/OErasterType.js';

function UrlValidator(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

function OERasterBuilder(geotiff, urlSample) {
  const raster = new OERaster(geotiff, urlSample);
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
      const rasterType = OERasterBuilder(geotiff, url_image);
      raster_cube.rasters.push(rasterType);
      raster_cube.tdimension.push(new Date());
    } catch (e) {
      console.error(e);
      // throw new Error('Image not valid');
    }
  }
  return raster_cube;
}

async function load(urlOrFile) {
  const load = async () => {
    const raster = await createObjectFromImage(urlOrFile);
    return raster;
  };

  return load();
}

export default load;
