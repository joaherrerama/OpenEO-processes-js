import { BaseProcess } from '@openeo/js-processgraphs';
import fse from 'fse';

class OEProcess extends BaseProcess {
  async execute(node) {
    let folder = 'src/processes';
    fse
      .readdirSync(folder)
      .filter(function (file) {
        return fse.statSync(folder + '/' + file).isDirectory();
      })
      .forEach((subfolder) => {
        fse.readdirSync(folder + '/' + subfolder).forEach((file) => {
          if (file.endsWith('.module.js')) {
            const process_path = `./${folder}/${subfolder}/${file}`;
            console.log(process_path);
            import(process_path).then((process) => {
              console.log(process);
            });
          }
        });
      });
  }
}

export default OEProcess;
