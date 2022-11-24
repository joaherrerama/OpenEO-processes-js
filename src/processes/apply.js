const OEProcess = require('../processgraph/process.js');
const { ProcessGraph } = require('@openeo/js-processgraphs');

module.exports = class apply extends OEProcess {
  async #apply(node, dc, applyArgName = "process") {
    var callback = node.getArgument(applyArgName);
    if (!(callback instanceof ProcessGraph)) {
      throw Error({
        argument: reducerArgName,
        reason: 'No ' + reducerArgName + ' specified.'
      });
    }
    else {
      let nrasters = [];
      for(let r=0; r < dc.rasters.length; r++){
        let nbands = [];
        const raster = dc.rasters[r]
        for(let b=0; b < raster.bands.length; b++){
          const band = dc.rasters[r].bands[b]
          const n = band.BufferArray.length
          const array = new Float32Array(n);
          const x = []
          const results = []
          for(let index=0; index < band.BufferArray.length; index+=1){
            if(x.indexOf(band.BufferArray[index]) !== -1){
              const i = x.indexOf(band.BufferArray[index])
              array[index] = results[i]
            }else{
              callback.setArguments({
                'typedArray': band.BufferArray,
                'x': band.BufferArray[index]
              })
              const exc = await callback.execute();
              const r = await exc.getResult();
              array[index] = r;
              x.push(band.BufferArray[index])
              results.push(r)
            }
          }
          band.BufferArray = array
          nbands.push(band);
        }
        raster.bands = nbands;
        nrasters.push(raster)
      }
      dc.rasters = nrasters;
      return dc
    }

  }

  async validate(node) {
    await super.validate(node);
  }

  async execute(node) {
    const dc = node.getArgument('data');
    const result = await this.#apply(node, dc);
    return result;
  }
};
