function insertionSort(items) {
  let len = items.length; // 배열의 항목 수
  let value; // 현재 비교 중인 값
  let i; // 정렬되지 않은 부분의 인덱스
  let j; // 정렬된 부분의 인덱스

  for (let i = 0; i < len; i++ ) {
    // 현재 값이 이후에 이동될 수도 있기 때문에 저장한다.
    value = items[i];

    // 정렬된 부분의 값이 정렬되지 않은 부분의 값보다 큰 경우
    // 정렬된 부분의 모든 항목을 하나씩 이동시킨다.
    // 이는 값을 삽입할 공간을 만든다.

    for (let j = i - 1; i > -1 && items[j] > value; j--) {
      items[j+1] = items[j];
    }
    items[j+1] = value;
  }
  console.log(items);
}

insertionSort([6,1,23,4,2,3]); // [1, 2, 3, 4, 6, 23]