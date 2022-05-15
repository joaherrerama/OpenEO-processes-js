/**
 * Calculates the min from an TypeArray
 * @name min
 * @param {Uint16Array|Uint8Array|Uint32Array} typeArray 
 * @alias min-type-array
 * @example
 * 
 * const url = 'S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B04_10m_cog.tif'
 * const raster = await openeojs.load(url)
 * 
 * raster.get_typeArray() // by default will take the band 1
 * 
 * const min = openeojs.min()
 * console.log(min)
 */

 export { default } from './min.module'