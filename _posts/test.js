function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function bubbleSort(array) {
  for (let i = 0; i <array.length; i++) {
    for (let j = i+1; j < array.length; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j);
      }
    }
  }
  console.log(array);
}

bubbleSort([6,3,4,1,2,5]); // [1,2,3,4,5,6]