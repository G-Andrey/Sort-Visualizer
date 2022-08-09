const InsertionSort = ( arr ) => {
  const animations = [];
  const array_len = arr.length

  for (let i = 1; i < array_len; i++) {
    let current = arr[i];
    let last_sorted = arr[i-1];

    if (current >= last_sorted){
      animations.push({type:'c', index1: i-1, index2: i});
      continue;
    }

    else{
      for (let j = i-1; j >= 0; j--){
        let curr = arr[j];
        let next = arr[j+1];

        if (next >= curr){
          animations.push({type:'c', index1: j, index2: j+1});
          break;
        }
        else{
          arr[j+1] = curr;
          arr[j] = next;
          animations.push({type:'compareswap', index1: j, index2: j+1});
        }
      }
    }
  }

  return animations;
};

export default InsertionSort;