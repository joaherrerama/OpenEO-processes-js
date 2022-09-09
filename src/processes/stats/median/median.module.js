function getMedianOfArray(numbers) {
  let medianEst = 0;
  const numsLen = numbers.length;
  numbers.sort();

  if (numsLen % 2 === 0) {
    medianEst = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
  } else {
    medianEst = numbers[(numsLen - 1) / 2];
  }

  return medianEst;
}

function median(typeArray) {
  const median = () => {
    const median = getMedianOfArray(typeArray);
    return median;
  };

  return median();
}

export default median;
