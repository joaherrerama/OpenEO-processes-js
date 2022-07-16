/**
 * This function creates an ArrayBuffer from a stac search. ,
 * NOTE: Use parse instead of load in most cases.
 * @name load_stac
 * @param {URL|GeoTIFF} Image
 * @alias load-image
 * @example
 * const url = 'S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B04_10m_cog.tif'
 * const raster = await openeojs.load(url)
 */

export { default } from './load.module';
