const QuickSort = ( array ) => {
  const animations = [];
  driver(array, 0, array.length - 1, animations)
  return animations;
};

const driver = (arr, start, end, animations) => {
  if (start >= end) {
    return;
  }
  
  let index = partition(arr, start, end, animations);
  driver(arr, start, index - 1, animations);
  driver(arr, index + 1, end, animations);
};

const partition = (arr, start, end, animations) => {
  const pivotValue = arr[end];
  animations.push({type:'qbset', start: start, end: end});

  let lowerStart = start;
  for (let i = start; i < end; i++) {
    animations.push({type:'qc', index1: i, index2: lowerStart});
    if (arr[i] < pivotValue) {
      [arr[i], arr[lowerStart]] = [arr[lowerStart], arr[i]];
      if(i !== lowerStart){
        animations.pop();
        animations.push({type:'qswap', index1: i, index2: lowerStart});
      }
      lowerStart++;
    }
  }
  
  [arr[lowerStart], arr[end]] = [arr[end], arr[lowerStart]]; 
  if (end !== lowerStart){
    animations.push({type:'qpivotswap', index1: lowerStart, pivot: end});
  }
  animations.push({type:'bend', start: start, end: end});
  return lowerStart;
};


export default QuickSort;