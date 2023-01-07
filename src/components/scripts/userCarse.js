import OEProcessGraph from '@joaherrerama/openeojs/es/processgraph/processgraph';
import Utils from '@joaherrerama/openeojs/es/processgraph/utils';

const executeUserCase = async (jsonProcess) => {
    /** Using ProcessGraph */
    const initialTime = performance.now()
    const processGraph = JSON.parse(JSON.stringify(jsonProcess));
    const registry = Utils.getRegistry();
    const pg = new OEProcessGraph(processGraph, registry);
    const exce = await pg.execute();
    const processResult = await exce.getResult();
    const executedTime = performance.now() - initialTime
    return { 'resut':processResult, 'time': executedTime } ;

}

export default executeUserCase;