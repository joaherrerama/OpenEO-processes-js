/**
 * Calculates the median from an TypeArray
 * @name Median
 * @param {Uint16Array|Uint8Array|Uint32Array} typeArray
 * @alias Median-type-array
 * @example
 *
 * const url = 'S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B04_10m_cog.tif'
 * const raster = await openeojs.load(url)
 *
 * raster.get_typeArray() // by default will take the band 1
 *
 * const mean = openeojs.median()
 * console.log(mean)
 */

export { default } from './median.module';
