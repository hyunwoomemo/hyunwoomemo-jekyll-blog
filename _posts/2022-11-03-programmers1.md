---
layout: single
title: "2020 카카오 인턴십 > 키패드 누르기"
categories: Programmers
tag: [codingtest]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 코딩테스트 연습 > 2020 카카오 인턴십 > 키패드 누르기

## [카카오 인턴] 키패드 누르기

### 문제 설명

스마트폰 전화 키패드의 각 칸에 다음과 같이 숫자들이 적혀 있습니다.

![image](https://user-images.githubusercontent.com/105469077/199780820-0a12255d-d8ec-45f3-9180-7e53ad9d2133.png)

이 전화 키패드에서 왼손과 오른손의 엄지손가락만을 이용해서 숫자만을 입력하려고 합니다.
맨 처음 왼손 엄지손가락은 `*` 키패드에 오른손 엄지손가락은 `#` 키패드 위치에서 시작하며, 엄지손가락을 사용하는 규칙은 다음과 같습니다.

1. 엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있으며 키패드 이동 한 칸은 거리로 1에 해당합니다.
2. 왼쪽 열의 3개의 숫자 `1, 4, 7`을 입력할 때는 왼손 엄지손가락을 사용합니다.
3. 오른쪽 열의 3개의 숫자 `3, 6, 9`를 입력할 때는 오른손 엄지손가락을 사용합니다.
4. 가운데 열의 4개의 숫자 `2, 5, 8, 0`을 입력할 때는 두 엄지손가락의 현재 키패드의 위치에서 더 가까운 엄지손가락을 사용합니다.
   1. 만약 두 엄지손가락의 거리가 같다면, 오른손잡이는 오른손 엄지손가락, 왼손잡이는 왼손 엄지손가락을 사용합니다.

순서대로 누를 번호가 담긴 배열 numbers, 왼손잡이인지 오른손잡이인 지를 나타내는 문자열 hand가 매개변수로 주어질 때, 각 번호를 누른 엄지손가락이 왼손인 지 오른손인 지를 나타내는 연속된 문자열 형태로 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- numbers 배열의 크기는 1 이상 1,000 이하입니다.
- numbers 배열 원소의 값은 0 이상 9 이하인 정수입니다.
- hand는 `"left"` 또는 `"right"` 입니다.
  - `"left"`는 왼손잡이, `"right"`는 오른손잡이를 의미합니다.
- 왼손 엄지손가락을 사용한 경우는 `L`, 오른손 엄지손가락을 사용한 경우는 `R`을 순서대로 이어붙여 문자열 형태로 return 해주세요.

### 입출력 예

![image](https://user-images.githubusercontent.com/105469077/199781388-59d93345-928a-449e-bc0b-9b970b9a12b9.png)

### 풀이

```javascript
function solution(numbers, hand) {
  let answer = [];
  let leftLoc = [3, 0];
  let rightLoc = [3, 2];
  let midleLoc;
  let leftArr = [1, 4, 7];
  let rightArr = [3, 6, 9];
  let table = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['*', 0, '#']];
  let leftResult = 0;
  let rightResult = 0;

  
  numbers.forEach((v, i, arr) => {
    if (leftArr.includes(v)) {
      table.forEach((v1, i1, arr1) => {
        v1.indexOf(v) > -1 ? leftLoc = [i1, v1.indexOf(v)] : false;
      })
      answer.push('L');
    } else if (rightArr.includes(v)) {
      table.forEach((v1, i1, arr1) => {
        v1.indexOf(v) > -1 ? rightLoc = [i1, v1.indexOf(v)] : false;
      })
      answer.push('R');
    } else {
      table.forEach((v1, i1, arr1) => {
        v1.indexOf(v) > -1 ? midleLoc = [i1, v1.indexOf(v)] : false;
      })

      leftResult = Math.abs(midleLoc[0] - leftLoc[0]) + Math.abs(midleLoc[1] - leftLoc[1]);
      rightResult = Math.abs(midleLoc[0] - rightLoc[0]) + Math.abs(midleLoc[1] - rightLoc[1]);

      if (leftResult > rightResult) {
        table.forEach((v1, i1, arr1) => {
          v1.indexOf(v) > -1 ? rightLoc = [i1, v1.indexOf(v)] : false;
        })
        answer.push('R');
      } else if (leftResult < rightResult) {
        table.forEach((v1, i1, arr1) => {
          v1.indexOf(v) > -1 ? leftLoc = [i1, v1.indexOf(v)] : false;
        })
        answer.push('L');
      } else {
        if (hand == 'right') {
          table.forEach((v1, i1, arr1) => {
            v1.indexOf(v) > -1 ? rightLoc = [i1, v1.indexOf(v)] : false;
          })
          answer.push('R');
        } else {
          table.forEach((v1, i1, arr1) => {
            v1.indexOf(v) > -1 ? leftLoc = [i1, v1.indexOf(v)] : false;
          })
          answer.push('L');
        }
      }
    }
  })
  console.log(answer.join(""));
  return answer.join("");
}

solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right");
```
