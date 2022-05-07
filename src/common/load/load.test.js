import test from 'flug';
import load from './load.module';


serve({ debug: true, max: 2, port: 3000 });

const path = 'https://download.dlr.loose.eox.at/Sentinel-2/L2A_COG/tiles/36/L/TM\
              /2020/12/S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855.COG\
              /S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B04_10m_cog.tif'

const fail_path = 'https://download.dlr.loose.eox.at/Sentinel-2/L2A_COG/tiles/36/L/TM\
              /2020/12/S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855.COG\
              /S2B_MSIL2A_20201230T080239_N0214_R035_T36LTM_20201230T103855_B08A_10m_cog.tif'

test('Loaded image from URL', async () => {
    let raster = await load(path)
    expect(typeof raster).toBe('object');
});

test('Loaded image from false URL', async () => {
    expect( await load(fail_path)).toThrow();
});