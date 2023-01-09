import OEProcessGraph from '@joaherrerama/openeojs/es/processgraph/processgraph';
import Utils from '@joaherrerama/openeojs/es/processgraph/utils';

const executeUserCase = async (jsonProcess) => {
    /** Using ProcessGraph */
    console.log(jsonProcess)
    const initialTime = performance.now()
    const processGraph = JSON.parse(JSON.stringify(jsonProcess));
    console.log(processGraph)
    const registry = Utils.getRegistry();
    console.log("processGraph")
    const pg = new OEProcessGraph(processGraph, registry);
    console.log(pg)
    console.log("excecute")
    const exce = await pg.execute();
    console.log(exce)
    const processResult = await exce.getResult();
    const executedTime = performance.now() - initialTime
    console.log({ 'result':processResult, 'time': executedTime, 'memory': performance.memory.usedJSHeapSize/1000000 });
    return {'result':processResult, 'time': executedTime, 'memory': performance.memory.usedJSHeapSize/1000000};

}

export default executeUserCase;