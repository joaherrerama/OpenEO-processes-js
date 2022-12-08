const OEProcessGraph = require('../src/processgraph/processgraph');
const OEProcessRegistry = require('../src/processgraph/registry');

/** Using ProcessGraph */
const jsonProcess = require('../assets/userCases/UserCase2.json');
const Utils = require('../src/processgraph/utils');
const processGraph = JSON.parse(JSON.stringify(jsonProcess));
const registry = Utils.getRegistry('./src/processes');
const pg = new OEProcessGraph(processGraph, registry);
exc(pg);

async function exc(pg) {
    const exce = await pg.execute();
    const result = await exce.getResult();
    console.log(result)
}