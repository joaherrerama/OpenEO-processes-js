import { ProcessGraph } from '@openeo/js-processgraphs';
import OEProcess from '../process/process.module.js';

class OEProcessGraph extends ProcessGraph {
  createProcessInstance(process) {
    return new OEProcess(process);
  }
}

export default OEProcessGraph;
