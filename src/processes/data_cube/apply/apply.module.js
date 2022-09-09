import { OERastercube } from '../../datatype/OErasterType';

function applyBands(raster, process) {
  return raster.forEach((band) => {});
}

async function apply(dataCube = OERastercube, processGraph = {}) {
  const apply = () => {
    const { rasters } = dataCube;
    rasters.forEach((raster) => {
      applyBands(raster, processGraph);
    });
    return raster;
  };

  return apply();
}

export default apply;
