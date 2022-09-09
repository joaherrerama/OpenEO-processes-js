// import load from './src/processes/load/load.module';
import OEProcessGraph from './src/processgraph/processgraph/processgraph.module.js';
import OEProcessRegistry from './src/processgraph/registry/registry.module.js';

/** Using ProcessGraph */

const jsonProcess = {
  process_graph: {
    load_collection: {
      process_id: 'load_collection',
      arguments: {
        source: ['./sample_data/sentinel_muenster.tif']
      },
      description:
        'Loading the data; The order of the specified bands is important for the following reduce operation.',
      result: true
    }
  }
};
const processGraph = JSON.parse(JSON.stringify(jsonProcess));
var registry = new OEProcessRegistry();
await registry.addFromFolder('./src/processes');
var pg = new OEProcessGraph(processGraph, registry);
const excecute = await pg.execute();
// console.log(excecute)
// const url = "./sample_data/sentinel_muenster.tif"
// const url = 'sample_data/2022-04-30-00_00_2022-04-30-23_59_Sentinel-2_L2A_True_color.tiff';
// const read = await load(url);
// console.log(read);
