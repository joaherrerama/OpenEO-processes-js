const OERasterBand = require('../datatype/OERasterBand');
const OERaster = require('../datatype/OERaster');
const OERastercube = require('../datatype/OERasterCube');
const OEProcess = require('../processgraph/process');
const { ProcessGraph } = require('@openeo/js-processgraphs');


module.exports = class reduce_dimension extends OEProcess {

  async #reduce(
    node, dc, allowedDimensionTypes = ["temporal", "bands"],
    reducerArgName = "reducer", dimensionArgName = "dimension"){

      const dimension =  node.getArgument(dimensionArgName);

      // Checking if it is either band or temporal
      if (!allowedDimensionTypes.includes(dimension)) {
        throw Error 
        ({
          process: process_id,
          argument: dimensionArgName,
          reason: 'Reducing dimension types other than ' + allowedDimensionTypes.join(' or ') + ' is currently not supported.'
        });
      }

      var callback = node.getArgument(reducerArgName);

      if (!(callback instanceof ProcessGraph)) {
        throw Error({
          argument: reducerArgName,
          reason: 'No ' + reducerArgName + ' specified.'
        });
      }
      else if (callback.getNodeCount() !== 1) {
        throw Error({
          process: this.id,
          argument: 'reducer',
          reason: "No complex reducer supported at the moment"
        });
      }
      else {
        if(dimension === 'temporal') {
          const n = dc.rasters[0].bands[0].BufferArray.length;
          let reduction = new Float32Array(n);
          let nbands = [];
          const metadata = dc.rasters[0].metadata
          const newRaster = new OERaster([], "", metadata);
          for( let raster of dc.rasters){
              for( let band of raster.bands){
                if(!nbands.includes(band.label)){
                  nbands.push(band.label);
                }
              }
          }

          for(let j of nbands){
            let selectedBands = dc.rasters.map( raster => {
              return raster.bands.filter(band => band.label == j)
            })
            for(let i=0; i < n; i++){
              let data = [];
              selectedBands.forEach( band => {
                data.push(band[0].BufferArray[i]);
              });
              
              await callback.setArguments({
                'data': data
              })
              var exc = await callback.execute();
              const result = await exc.getResult();
              reduction[i] = result;
            }
            const bandReducer  = new OERasterBand(
              reduction,
              j
            );
            newRaster.bands.push(bandReducer);
          }
          const ndc = new OERastercube([], [])
          ndc.rasters.push(newRaster)
          return ndc
        }
        if(dimension === 'bands') {
          const n = dc.rasters[0][0].bands[0].BufferArray.length;
          let reduction = new Float32Array(n);
          for( let i in dc.tdimension){
            for(let raster of dc.rasters[i]){
              for(let j=0; j < n; j++){
                let data = [];
                raster.bands.forEach( band => {
                  data.push(band.BufferArray[j]);
                });
                
                await callback.setArguments({
                  'data': data
                })
                var exc = await callback.execute();
                const result = await exc.getResult();
                reduction[j] = result;
              }
            }
            const nbands = dc.rasters[0]
            const bandReducer  = OERasterBand(
              reduction,
              'reducer'
            );
            nbands[0].bands = bandReducer;
            dc.rasters = nbands;
          }
          return dc
        }
      }
  }
	async execute(node) {
		const dc = node.getArgument("data");
		const Ndc = await this.#reduce(node, dc);
		return Ndc;
	}

};