const HeapSort = ( array ) => { 
  const animations = [];

  let array_length = array.length
  
  for (let i = parseInt(array_length / 2 - 1); i >= 0; i--) {
    animations.push({type:'bset', start: i, end: array_length - 1});
    maxHeapify(array, array_length, i, animations);
    animations.push({type:'bend', start: i, end: array_length - 1}); 
  }

  for (let i = array_length - 1; i >= 0; i--) {
    animations.push({type:'bset', start: 0, end: i});  
    [array[0], array[i]] = [array[i], array[0]]
    animations.push({type:'heapswap', max: 0, end: i});

    animations.push({type:'bend', start: 0, end: i});  

    animations.push({type:'bset', start: 0, end: i - 1});
    maxHeapify(array, i, 0, animations); 
    animations.push({type:'bend', start: 0, end: i - 1}); 
  } 

  return animations;
};

const maxHeapify = (array, array_length, i, animations) => {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  
  if (l < array_length && array[l] > array[largest]) {
    largest = l; 
  }
  
  if (r < array_length && array[r] > array[largest]) {
    largest = r; 
  }
  
  if (largest !== i) { 
    [array[i], array[largest]] = [array[largest], array[i]]
    animations.push({type:'qswap', index1: i, index2: largest});
    
    maxHeapify(array, array_length, largest, animations); 
  } 
};

export default HeapSort;