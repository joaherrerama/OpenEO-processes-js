function getMinOfArray(
  numArray,
  { debug = false, no_data = undefined } = {
    debug: false,
    no_data: undefined
  }
) {
  let min = 1000;
  numArray.map((x) => {
    x < min ? (min = x) : (min = min);
  });
  return min;
}

function min(typeArray) {
  const min = () => {
    const min = getMinOfArray(typeArray);
    return min;
  };

  return min();
}

export default min;
