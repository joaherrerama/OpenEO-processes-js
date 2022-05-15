function getMeanOfArray(
  numbers,
  { debug = false, no_data = undefined} = {
    debug: false,
    no_data: undefined
  }){
    let length = numbers.length
    let sum = 0
    for (let i = 1; i < length; i++) {
      const value = numbers[i];
      sum += value
    }
    return sum/length
}

function mean (typeArray) {
  const mean = () => {
    const mean = getMeanOfArray(typeArray)
    return mean
  }

  return mean()
}

export default mean