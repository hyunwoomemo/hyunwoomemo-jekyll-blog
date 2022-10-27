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

검색 
:  `자료를 얻기 위해 자료 구조의 항목들을 반복적으로 접근하는 것`

정렬 
: `자료 구조의 항목들을 순서대로 위치시키는 것`

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
