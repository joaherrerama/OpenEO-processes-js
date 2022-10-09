import { OERastercube } from '../src/datatype/OERasterBand';
import load from '../src/processes/load_collection/load_collection';

const path = './sample_data/sentinel_muenster.tif';

const failpath = './sample_data/sentinel.tif';

test('Loaded image from URL', async () => {
  const raster = await load(path);
  expect(raster instanceof OERastercube).toBe(true);
});

test('Loaded image from false URL', async () => {
  await expect(async () => await load(failpath)).rejects.toThrow();
});
