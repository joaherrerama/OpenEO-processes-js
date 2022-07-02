function getMaxOfArray(
  numArray,
  { debug = false, no_data = undefined } = {
    debug: false,
    no_data: undefined,
  }
) {
  let max = 0;
  numArray.map((x) => {
    x > max ? (max = x) : (max = max);
  });
  return max;
}

function max(typeArray) {
  const max = () => {
    const maxRaster = getMaxOfArray(typeArray);
    return maxRaster;
  };

  return max();
}

export default max;
