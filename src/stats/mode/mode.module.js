function getModeOfArray(
    numbers,
    { debug = false, no_data = undefined} = {
      debug: false,
      no_data: undefined
    }){
      var modes = [], count = [], i, number, maxIndex = 0;
   
      for (i = 0; i < numbers.length; i += 1) {
          number = numbers[i];
          count[number] = (count[number] || 0) + 1;
          if (count[number] > maxIndex) {
              maxIndex = count[number];
          }
      }
   
      for (i in count)
          if (count.hasOwnProperty(i)) {
              if (count[i] === maxIndex) {
                  modes.push(Number(i));
              }
          }

      return modes;
  }
  
  function mode (typeArray) {
    const mode = () => {
      const mode = getModeOfArray(typeArray)
      return mode
    }
  
    return mode()
  }
  
  export default mode