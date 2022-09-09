import { OERastercube } from '../../datatype/OErasterType';
import load from './load_collection.module';

const path = './sample_data/sentinel_muenster.tif';

const failpath = './sample_data/sentinel.tif';

test('Loaded image from URL', async () => {
  const raster = await load(path);
  expect(raster instanceof OERastercube).toBe(true);
});

test('Loaded image from false URL', async () => {
  await expect(async () => await load(failpath)).rejects.toThrow();
});
