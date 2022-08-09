const handleAnimations = async( arr, bars, delay ) => {
  for (let i = 0 ; i < arr.length; i++){
    const {type} = arr[i];
    if (type === 'c') {
      const { index1, index2 } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'blue';
      bars[index2].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'white';
      bars[index2].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'compareswap') {
      const { index1, index2 } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'blue';
      bars[index2].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'red';
      bars[index2].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[index1],bars[index2])
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'white';
      bars[index2].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'unyellowmin') {
      const { index } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'selectcompareswap') {
      const { index, currpivot } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[index],bars[currpivot])
      await timeout(delay);
      bars[index].firstChild.style.backgroundColor = 'white';
      bars[currpivot].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'bset'){
      const { start, end } = arr[i];
      for (let j = start ; j <= end; j++){
        bars[j].firstChild.style.backgroundColor = 'gray';
      }
    }
    else if (type === 'qbset'){
      const { start, end } = arr[i];
      for (let j = start ; j <= end; j++){
        if (j === end){
          bars[j].firstChild.style.backgroundColor = 'yellow';
          continue
        }
        bars[j].firstChild.style.backgroundColor = 'gray';
      }
    }
    else if (type === 'qswap'){
      const { index1, index2 } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'blue';
      bars[index2].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'red';
      bars[index2].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[index1],bars[index2])
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'gray';
      bars[index2].firstChild.style.backgroundColor = 'gray';
    }
    else if (type === 'qc') {
      const { index1, index2 } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'blue';
      bars[index2].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'gray';
      bars[index2].firstChild.style.backgroundColor = 'gray';
    }
    else if (type === 'qpivotswap'){
      const { index1, pivot } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'red';
      bars[pivot].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[index1],bars[pivot])
      bars[index1].firstChild.style.backgroundColor = 'yellow';
      bars[pivot].firstChild.style.backgroundColor = 'gray';
    }
    else if (type === 'heapswap') {
      const { max, end } = arr[i];
      bars[max].firstChild.style.backgroundColor = 'yellow';
      bars[end].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[max],bars[end])
      bars[max].firstChild.style.backgroundColor = 'red';
      bars[end].firstChild.style.backgroundColor = 'yellow';
    }
    else if (type === 'bend'){
      const { start, end } = arr[i];
      for (let j = start ; j <= end; j++){
        bars[j].firstChild.style.backgroundColor = 'white';
      }
    }
    else if (type === 'pivotset'){
      const { index } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'yellow';
    }
    else if (type === 'scompare'){
      const { index } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'radixcheck'){
      const { index } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[index].firstChild.style.backgroundColor = 'gray';
    }
    else if (type === 'pivotcompareset'){
      const { oldpivot, newpivot } = arr[i];
      bars[oldpivot].firstChild.style.backgroundColor = 'yellow';
      bars[newpivot].firstChild.style.backgroundColor = 'blue';
      await timeout(delay);
      bars[oldpivot].firstChild.style.backgroundColor = 'white';
      bars[newpivot].firstChild.style.backgroundColor = 'yellow';
    }
    else if (type === 'pivotend'){
      const { index } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'white';
    }
    else if (type === 'm'){
      const {index, height } = arr[i];
      bars[index].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      bars[index].firstChild.style.height = `${height}px`
      bars[index].firstChild.firstChild.innerText = `${parseInt(height, 10)}`
      await timeout(delay);
      bars[index].firstChild.style.backgroundColor = 'gray';
    } 
    else {
      const { index1, index2 } = arr[i];
      bars[index1].firstChild.style.backgroundColor = 'red';
      bars[index2].firstChild.style.backgroundColor = 'red';
      await timeout(delay);
      swapTwoBars(bars[index1],bars[index2])
      await timeout(delay);
      bars[index1].firstChild.style.backgroundColor = 'white';
      bars[index2].firstChild.style.backgroundColor = 'white';
    }
    await timeout(delay);
  }
};

const timeout = (time = 10) => {
  return new Promise(res => setTimeout(res, time));
};

const swapTwoBars = (bar1, bar2) => {
  const firstHeight = bar1.firstChild.style.height
  const secondHeight = bar2.firstChild.style.height 

  bar1.firstChild.style.height = secondHeight
  bar1.firstChild.firstChild.innerText = `${parseInt(secondHeight, 10)}`

  bar2.firstChild.style.height = firstHeight
  bar2.firstChild.firstChild.innerText = `${parseInt(firstHeight, 10)}`
};

export {handleAnimations, timeout};