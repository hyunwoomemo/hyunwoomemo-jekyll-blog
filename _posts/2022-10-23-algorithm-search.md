---
layout: single
title: "검색과 정렬"
categories: algorithm
tag: [검색, 정렬]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
last_modified_at: 2022-11-03
---

`검색과 정렬`

>자료를 검색하고 해당 자료를 정렬하는 것은 알고리즘의 근간
{: .prompt-defi}

# 검색 
:  `자료를 얻기 위해 자료 구조의 항목들을 반복적으로 접근하는 것`


## 선형 검색
- 정렬된 자료와 정렬되지 않은 자료 모두에 사용 가능 => 유연함
- 배열의 각 항목을 한 인덱스씩 순차적으로 접근하면서 동작

### 선형 검색으로 6과 10이 존재하는지 찾기 

```javascript
// 배열을 순회하면서 찾는다.
function linearSearch(array, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == n) {
      return true;
    }
  }
  return false;
}

console.log(linearSearch([1,2,3,4,5,6,7,8,9], 6)); // true
console.log(linearSearch([1,2,3,4,5,6,7,8,9], 10)); // false
```
#### 시간 복잡도
6을 검색하는 경우 반복 6번, 10을 검색하는 경우 모든 n개의 항목을 반복 접근한 다음 false를 반환하므로 `시간복잡도는 O(n)`이다.

>선형 알고리즘이 O(n)의 빅오를 갖는 이유는 최악의 경우 전체 배열을 순회해야하기 때문
{: .prompt-info}

## 이진 검색
- 정렬된 자료에 대해 사용 => 시간 복잡도가 선형검색에 비해 낮음


배열의 모든 항목을 확인해야 하는 선형 검색 알고리즘과 달리 이진 검색은 `중간 값을 확인해 원하는 값보다 해당 중간 값이 큰지 작은지 확인`한다.

원하는 값이 중간 값보다 작은 경우 이진 검색 알고리즘은 중간 값보다 작은 쪽을 검색, 큰 경우 중간 값보다 큰 쪽을 검색

### 이진 검색 알고리즘 구현

```javascript
function binarySearch(array, n) {
  let lowIndex = 0; highIndex = array.length -1;
  
  while ( lowIndex <= hightIndex) {
    let midIndex = Math.floor((highIndex + lowIndex) / 2);

    if (array[midIndex] == n) {
      return midIndex;
    } else if (n > array[midIndex]) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1,2,3,4], 4)); // 3
console.log(binarySearch([1,2,3,4], 5)); // -1
```

> 이진 검색 알고리즘은 빠르지만 배열이 정렬된 경우에만 사용할 수 있다
{: .prompt-info}

# 정렬 
: `자료 구조의 항목들을 순서대로 위치시키는 것`

## 거품 정렬

거품 정렬(bubble sort)은 가장 간단한 정렬 알고리즘이다. 
전체 배열을 순회하면서 항목이 다른 항목보다 큰 경우 두 항목을 교환한다.

`swap`은 정렬에 사용되는 일반적인 함수다.

> swap은 두 배열 항목 값들을 교환하며 앞에서 언급한 대부분의 정렬 알고리즘의 도움 함수로 사용
{: .prompt-info}

```javascript
function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
```

### 거품 정렬 알고리즘 구현

```javascript
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
```

#### 시간 복잡도: O(n)<sup>2
#### 공간 복잡도: O(1)

거품 정렬은 최악의 종류의 정렬이다.

다른 정렬 알고리즘은 배열의 이미 정렬된 부분을 활용하는데 비해 거품 정렬은 모든 가능한 짝을 비교

#### GIF로 이해하는 Bubble Sort

![bubble-sort-001](https://user-images.githubusercontent.com/105469077/199714596-01451922-364b-4212-bb23-d2336ee54842.gif)

## 선택 정렬

선택 정렬은 가장 작은 항목을 찾아서 해당 항목을 배열의 현 위치에 삽입하는 방식으로 동작. 

선택 정렬 알고리즘은 거품 정렬 알고리즘보다 약간 더 낫다.

### 선택 정렬 알고리즘 구현

```javascript

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

```

#### 시간 복잡도: O(n <sup>2)
#### 공간 복잡도: O(1)

중첩 루프 때문에 선택 정렬의 시간 복잡도는 여전히 O(n <sup>2)

#### GIF로 이해하는 Selection Sort

![selection-sort-001](https://user-images.githubusercontent.com/105469077/199714919-f81d1e23-cc98-4cc4-8149-9150de64905d.gif)

## 삽입 정렬

삽입 정렬은 배열을 순차적으로 검색하면서 `정렬되지 않은 항목들을 배열의 왼쪽의 정렬된 부분으로 이동`시킨다.

이러한 점에 있어 삽입 정렬은 선택 정렬과 비슷하다.

### 삽입 정렬 알고리즘 구현

외부 for 루프는 배열 인덱스를 순회하고 내부 for루프는 정렬되지 않은 항목들을 배열의 왼쪽의 정렬된 부분으로 이동

**코드 수정 필요**

```javascript

function insertionSort(items) {
  let len = items.length, // 배열의 항목 수
  value, // 현재 비교 중인 값
  i, // 정렬되지 않은 부분의 인덱스
  j; // 정렬된 부분의 인덱스

  for (let i = 0; i < len; i++> ) {
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
  return items;
}

insertionSort([6,1,23,4,2,3]); // [1, 2, 3, 4, 6, 23]

```

#### 시간 복잡도: O(n <sup>2</sup>)
#### 공간 복잡도: O(1)

> 역시나 삽입 정렬 알고리즘도 중첩 for 루프 때문에 거품 정렬과 삽입 정렬과 마찬가지로 O(n<sup>2</sup>) 의 이차 시간 복잡도를 지닌다.
{: .prompt-defi}

#### GIF로 이해하는 Insertion Sort

![insertion-sort-001](https://user-images.githubusercontent.com/105469077/199715455-d82edc79-55a7-4a64-a2c7-43ed1045c99e.gif)

## 빠른 정렬

빠른 정렬은 기준점을 획득한 다음 해당 기준점을 기준으로 배열을 나눈다
(한쪽에는 기준점보다 큰 항목들이 위치하고 다른 쪽에는 기준점보다 작은 항목들이 위치한다.)

가장 `이상적인 기준점은 배열의 중간 값`

하지만 정렬되지 않은 배열의 중간 값을 얻기 위해서는 계산하는 데 선형 시간이 걸린다.

일반적으로 분할 부분의 `첫 번째 항목과 중간 항목, 마지막 항목의 중간 값을 취해 기준점`을 얻는다.

이러한 정렬은 `재귀 정렬`이고 분할 정복 방식을 사용해 시간 복잡도를 이차에서 O(nlog<sub>2</sub>(n))으로 낮춘다.

하지만 모든 항목을 한쪽으로만 위치시키는 기준점을 선택하는 최악의 경우 시간 복잡도는 O(n<sup>2</sup>)이다.

#### GIF로 이해하는 Quick Sort

![quick-sort-001](https://user-images.githubusercontent.com/105469077/199715685-517d6f6a-e6e2-4ada-84ae-64104c4f8f19.gif)
