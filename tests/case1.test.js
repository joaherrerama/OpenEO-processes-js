const OEProcessGraph = require('../src/processgraph/processgraph');
const OEProcessRegistry = require('../src/processgraph/registry');

/** Using ProcessGraph */
const jsonProcess = require('../assets/userCases/UserCase1.json');
const processGraph = JSON.parse(JSON.stringify(jsonProcess));
var registry = new OEProcessRegistry();
registry.addFromFolder('./src/processes');
var pg = new OEProcessGraph(processGraph, registry);
const excecute = pg.execute();
