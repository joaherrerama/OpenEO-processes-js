import OEProcessGraph from '@joaherrerama/openeojs/es/processgraph/processgraph';
import Utils from '@joaherrerama/openeojs/es/processgraph/utils';

const executeUserCase = async (jsonProcess) => {
    /** Using ProcessGraph */
    const initialTime = performance.now()
    const processGraph = JSON.parse(JSON.stringify(jsonProcess));
    const registry = Utils.getRegistry();
    console.log("processGraph")
    const pg = new OEProcessGraph(processGraph, registry);
    console.log("excecute")
    const exce = await pg.execute();
    const processResult = await exce.getResult();
    const executedTime = performance.now() - initialTime
    console.log({ 'result':processResult, 'time': executedTime, 'memory': performance.memory.usedJSHeapSize/1000000 });
    return {'result':processResult, 'time': executedTime, 'memory': performance.memory.usedJSHeapSize/1000000};

}

export default executeUserCase;