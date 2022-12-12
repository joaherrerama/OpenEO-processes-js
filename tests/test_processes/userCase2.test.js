const OEProcessGraph = require('../../src/processgraph/processgraph');
const OERastercube = require('../../src/datatype/OERasterCube');
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder
/** Using ProcessGraph */
const jsonProcess = require('../../assets/userCases/UserCase2.json');
const Utils = require('../../src/processgraph/utils');
const processGraph = JSON.parse(JSON.stringify(jsonProcess));
const registry = Utils.getRegistry('./src/processes');
const pg = new OEProcessGraph(processGraph, registry);

async function exc(pg) {
    const exce = await pg.execute();
    return exce.computedResult;

}

test('Load image ', async () => {
  await expect(await exc(pg)).toBeInstanceOf(OERastercube);
});