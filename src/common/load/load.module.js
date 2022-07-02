import fetch from "node-fetch";
import OERaster, { OERastercube } from "../../datatype/OErasterType.js";
import GeoTIFF, { fromUrl, fromArrayBuffer, fromFile } from "geotiff";

function UrlValidator(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

function OERasterBuilder(geotiff, url_sample) {
  const raster = new OERaster(geotiff, url_sample);
  return raster;
}

async function createObjectFromImage(url_images) {
  if (typeof url_images == "string") {
    url_images = [url_images];
  }
  const raster_cube = new OERastercube([], []);
  for (let url_image of url_images) {
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
      throw new Error("Image not valid");
      console.error(e);
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
