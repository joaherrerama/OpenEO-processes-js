function getMaxOfArray(numArray,
    { debug = false, no_data = undefined} = {
      debug: false,
      no_data: undefined
    }) {
    let max = 0
    numArray.map((x) => {
      x > max ? max = x : max = max
    })
    return max
  }
  
  function max (typeArray) {
    const max = () => {
      const max = getMaxOfArray(typeArray)
      return max
    }
  
    return max()
  }
  
  export default max