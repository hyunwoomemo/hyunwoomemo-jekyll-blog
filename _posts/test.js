function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function selectionSort(items) {
  let len = items.length;
  let min;
  console.log(len);


  for (let i = 0; i < len; i++) {
    // 최소 항목을 현재 위치로 설정한다.
    min = i;
    // 더 적은 항목이 있는지 배열의 나머지를 확인한다.
    for (j = i + 1; j < len; j++) {
      if (items[j] < items[min]) {
        min = j;
      }

      // 현재 위치가 최소 항목 위치가 아니라면 항목들을 교환한다.
      if (i != min) {
        swap(items, i, min);
      }
    }

  }
  return items;
}

selectionSort([6, 1, 23, 4, 2, 3]); // [1, 2, 3, 4, 6, 23];