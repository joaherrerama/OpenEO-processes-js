import { test, expect } from 'jest';
import ndvi from '../src/processes/ndvi';
import load from '../../common/load/load.module';
import { OERastercube } from '../../datatype/OErasterType';

/** Test */
const file = './sample_data/sentinel_muenster.tif';
const red = 0;
const nir = 3;

test('Loaded image from URL', async () => {
  const image = await load(file);
  const ndviOutput = await ndvi(image, red, nir);
  expect(ndviOutput instanceof OERastercube).toBe(true);
});
