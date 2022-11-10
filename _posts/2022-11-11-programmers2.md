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

# 코딩테스트 연습 > 코딩테스트 입문 > 옹알이 (1)


## 옹알이 (1) 

### 문제 설명

머쓱이는 태어난 지 6개월 된 조카를 돌보고 있습니다. 조카는 아직 "aya", "ye", "woo", "ma" 네 가지 발음을 최대 한 번씩 사용해 조합한(이어 붙인) 발음밖에 하지 못합니다. 문자열 배열 babbling이 매개변수로 주어질 때, 머쓱이의 조카가 발음할 수 있는 단어의 개수를 return하도록 solution 함수를 완성해주세요.

### 제한사항

- 1 ≤ babbling의 길이 ≤ 100
- 1 ≤ babbling[i]의 길이 ≤ 15
- babbling의 원소에서 "aya", "ye", "woo", "ma"는 각각 최대 한 번씩만 등장합니다.
- 문자열은 알파벳 소문자로만 이루어져 있습니다.

### 입출력 예

![image](https://user-images.githubusercontent.com/105469077/201140099-585dbfeb-dd67-4252-9570-932fd0109b23.png)

### 풀이

```javascript

function solution(babbling) {
  let arr = ['aya', 'ye', 'woo', 'ma'];
  let wLength = 0;
  let result = 0;
  babbling.forEach((v) => {
    wLength = 0;
    arr.forEach((v1) => {
      v.indexOf(v1) > -1 ? wLength += v1.length : false;
    })
    v.length === wLength ? result++ : false;
  })
  return result;
}

solution(["ayaye", "uuuma", "ye", "yemawoo", "ayaa"]);

```
