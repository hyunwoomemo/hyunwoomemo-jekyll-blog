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
---

# 검색과 정렬

자료를 검색하고 해당 자료를 정렬하는 것은 알고리즘의 근간

## 검색 
:  `자료를 얻기 위해 자료 구조의 항목들을 반복적으로 접근하는 것`


### 선형 검색
- 정렬된 자료와 정렬되지 않은 자료 모두에 사용 가능 => 유연함
- 배열의 각 항목을 한 인덱스씩 순차적으로 접근하면서 동작

#### 선형 검색으로 6과 10이 존재하는지 찾기 

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
##### 시간 복잡도
6을 검색하는 경우 반복 6번, 10을 검색하는 경우 모든 n개의 항목을 반복 접근한 다음 false를 반환하므로 `시간복잡도는 O(n)`이다.

>선형 알고리즘이 O(n)의 빅오를 갖는 이유는 최악의 경우 전체 배열을 순회해야하기 때문
{: .prompt-info}

### 이진 검색
- 정렬된 자료에 대해 사용 => 시간 복잡도가 선형검색에 비해 낮음


배열의 모든 항목을 확인해야 하는 선형 검색 알고리즘과 달리 이진 검색은 `중간 값을 확인해 원하는 값보다 해당 중간 값이 큰지 작은지 확인`한다.

원하는 값이 중간 값보다 작은 경우 이진 검색 알고리즘은 중간 값보다 작은 쪽을 검색, 큰 경우 중간 값보다 큰 쪽을 검색

#### 이진 검색 알고리즘 구현

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

## 정렬 
: `자료 구조의 항목들을 순서대로 위치시키는 것`

### 거품 정렬

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

#### 거품 정렬 알고리즘 구현

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

##### 시간 복잡도: O(n)<sup>2
##### 공간 복잡도: O(1)

거품 정렬은 최악의 종류의 정렬이다.

다른 정렬 알고리즘은 배열의 이미 정렬된 부분을 활용하는데 비해 거품 정렬은 모든 가능한 짝을 비교