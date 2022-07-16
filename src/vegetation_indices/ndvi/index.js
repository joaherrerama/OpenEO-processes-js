/**
 * This function estimates the NDVI of a RasterCube. ,
 * NOTE: The output is a U8Bits array to get the proper values
 * the max_nom and min_nom are given to reverse the conversion.
 * @name ndvi
 * @param {OERastercube} RasterCube
 * @param {String|Integer} red
 * @param {String|Integer} nir
 * @alias ndvi
 * @example
 * const url = 'S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B04_10m_cog.tif'
 * # load the image and retrieve a RasterCube
 * const raster = await openeojs.load(url)
 * # calculates the NDVI - 0 and 1 are the bands in the images inside the rastercube
 * const ndvi = await openeojs.ndvi(raster, 0, 1)
 */

export { default } from './ndvi.module.js';
