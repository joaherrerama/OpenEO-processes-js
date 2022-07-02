function getModeOfArray(
  numbers,
  { debug = false, no_data = undefined } = {
    debug: false,
    no_data: undefined,
  }
) {
  let modes = [],
    count = [],
    i,
    number,
    maxIndex = 0;

  numbers.map( number =>{
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  })

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }
  
    if(modes.length == 1){
      return modes[0]
    }
  return modes;
}

function mode(typeArray) {
  const mode = () => {
    const mode = getModeOfArray(typeArray);
    return mode;
  };

  return mode();
}

export default mode;
