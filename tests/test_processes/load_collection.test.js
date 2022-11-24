const OEProcessGraph = require('../../src/processgraph/processgraph');
const OERastercube = require('../../src/datatype/OERasterCube');

/** Using ProcessGraph */
const jsonProcess = require('../../assets/userCases/UserCase1.json');
const Utils = require('../../src/processgraph/utils');
const processGraph = JSON.parse(JSON.stringify(jsonProcess));
const registry = Utils.getRegistry('./src/processes');
const pg = new OEProcessGraph(processGraph, registry);
exc(pg);

async function exc(pg) {
    const exce = await pg.execute();
    return exce.computedResult;

}

test('Load image ', async () => {
  await expect(await exc(pg)).toBeInstanceOf(OERastercube);
});