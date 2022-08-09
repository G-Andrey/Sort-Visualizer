const BubbleSort = ( arr ) => {
  const animations = [];
  const array_len = arr.length
  var isSwapped = false;

  for (let i = 0; i < array_len; i++){
    isSwapped = false;

    for (let j = 0; j < array_len - 1; j++){
      const curr = arr[j];
      const next = arr[j+1];

      animations.push({type:'c', index1: j, index2: j+1});
      if (curr > next){
        isSwapped = true;
        arr[j+1] = curr;
        arr[j] = next;
        animations.pop();
        animations.push({type:'compareswap', index1: j, index2: j+1});
      }
    }
    
    //early termination if no swaps were made in current iteration
    if (!isSwapped){
      break;
    }
  }

  return animations;
};

export default BubbleSort;