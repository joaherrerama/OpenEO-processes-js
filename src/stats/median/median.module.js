function getMedianOfArray(
  numbers,
  { debug = false, no_data = undefined } = {
    debug: false,
    no_data: undefined,
  }
) {
  let median = 0;
  const numsLen = numbers.length;
  numbers.sort();

  if (numsLen % 2 === 0) {
    median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    median = numbers[(numsLen - 1) / 2];
  }

  return median;
}

function median(typeArray) {
  const median = () => {
    const median = getMedianOfArray(typeArray);
    return median;
  };

  return median();
}

export default median;
