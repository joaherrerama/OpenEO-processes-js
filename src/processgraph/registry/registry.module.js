import fse from 'fse';
import { ProcessRegistry } from '@openeo/js-commons';
import Utils from '../../utils/utils.module.js';
import path from 'path';

class OEProcessRegistry extends ProcessRegistry {
  constructor() {
    super();
  }

  addFromFolder(folder) {
    fse
      .readdirSync(folder)
      .filter(function (file) {
        return fse.statSync(folder + '/' + file).isDirectory();
      })
      .forEach((subfolder) => {
        fse.readdirSync(folder + '/' + subfolder).forEach((file) => {
          if (file.endsWith('.module.js')) {
            var id = path.basename(file, '.module.js');
            this.addFromFile(id);
          }
        });
      });
    var num = Utils.size(this.namespace('backend'));
    return Promise.resolve(num);
  }

  async addFromFile(id) {
    const readFile = fse.readFileSync(
      new URL(`../../processes/${id}/${id}.json`, import.meta.url)
    );
    var spec = JSON.parse(readFile);
    this.add(spec, 'backend');
  }
}

export default OEProcessRegistry;
