const SelectionSort = ( arr ) => {
  const animations = [];
  const array_len = arr.length

  for(let i = 0; i < array_len; i++) {
    let min = i;
    animations.push({type:'pivotset', index: min});

    //finding the smallest number in the subarray
    for (let j = i + 1; j < array_len; j++){
      animations.push({type:'scompare', index: j});
      if(arr[j] < arr[min]) {
        animations.pop()
        animations.push({type:'pivotcompareset', oldpivot: min, newpivot: j});
        min = j;
      }
    }

    if (min !== i) {
      let tmp = arr[i]; 
      arr[i] = arr[min];
      arr[min] = tmp;
      animations.push({type:'selectcompareswap', index: i, currpivot: min});      
    }
    else{
      animations.push({type:'unyellowmin', index: min}); 
    }
  }

  return animations;
};

export default SelectionSort;