const RadixSort = ( array ) => {
  const animations = [];
  let numOfDigits = 3;
  let buckets = Array.from({ length: 10 }, () => []);

  for (let i = 0; i < numOfDigits; i++){
    animations.push({type:'bset', start: 0, end: array.length - 1});
    for (let j = 0; j < array.length; j++){
      let curr_digit = getDigit(array[j], i);
      animations.push({type:'radixcheck', index: j});
      buckets[curr_digit].push(array[j])
    }
    
    let index = 0;
    for (let j = 0; j < 10; j++){
      for (let k = 0; k < buckets[j].length; k++){
        array[index] = buckets[j][k];
        animations.push({type:'m', index: index, height: buckets[j][k]});
        index ++;
      }
    }

    animations.push({type:'bend', start: 0, end: array.length - 1});
    buckets = Array.from({ length: 10 }, () => []);
  }
  
  return animations;
};

const getDigit = (num, place) => {
  const strNum = String(num);
  let end = strNum.length - 1;
  const foundNum = strNum[end - place];

  if (foundNum === undefined) return 0;
  else return foundNum;
};

export default RadixSort;