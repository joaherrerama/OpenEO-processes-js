import ndvi from "./ndvi.module";
import load from "./../../common/load/load.module.js";
import { OERastercube } from "../../datatype/OErasterType";

/** Test */
const file = "./sample_data/sentinel_muenster.tif";
const red = 0;
const nir = 3;

test("Loaded image from URL", async () => {
  const image = await load(file);
  const ndvi_out = await ndvi(image, red, nir);
  expect(ndvi_out instanceof OERastercube).toBe(true);
});
