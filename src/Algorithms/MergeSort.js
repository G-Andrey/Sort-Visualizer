const MergeSort = ( array ) => {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
};

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
};

const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) => {
  animations.push({type:'bset', start: startIdx, end: endIdx});
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push({type:'m', index: k, height: auxiliaryArray[i]});
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({type:'m', index: k, height: auxiliaryArray[j]});
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({type:'m', index: k, height: auxiliaryArray[i]});
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({type:'m', index: k, height: auxiliaryArray[j]});
    mainArray[k++] = auxiliaryArray[j++];
  }
  animations.push({type:'bend', start: startIdx, end: endIdx});
}

export default MergeSort;