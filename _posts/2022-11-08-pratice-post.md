---
layout: single
title: "직원 정보 직접 추가해보기"
categories: practice
tag: [post]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 실습과제

웹 개발을 할 때는 아래의 두 가지 작업을 매우 자주 수행하게 됩니다.

    자바스크립트 객체를 string 타입의 JSON 데이터로 변환하는 작업(리퀘스트를 보낼 때)
    string 타입의 JSON 데이터를 자바스크립트 객체로 변환하는 작업(리스폰스를 받았을 때)

모두 이전에 배웠던 내용들인데요. 여기서

1번 작업을 Serialization(직렬화), 
2번 작업을 Deserialization(역직렬화)라고 합니다.

서로 반대 개념이라서 한쪽에는 'De(역)'가 붙은 거 보이시죠?

이번 실습에서는 이 두 작업을 모두 수행해보겠습니다. 이전 영상에서 사용했던 아래 URL을 똑같이 사용할 건데요.

URL : ['https://learn.codeit.kr/api/members'](https://learn.codeit.kr/api/members)

현재 코드잇 실행기에 있는 코드는 '새 직원 정보를 추가한 후에, 전체 직원 정보를 조회하는 코드'입니다. 전체 코드 중 비어있는 부분에 적절한 코드를 추가해서 완전히 동작하는 코드로 만들어보세요. 추가할 새 직원 정보는 여러분이 원하는 대로 설정하면 됩니다.

### 문제

```javascript

// 새 직원 정보는 원하는 대로 작성하세요.
const newMember = {
  name:  
  email: 
	department: 
};


fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  body: // 이 부분을 채워보세요.
})
  .then(() => {
    fetch('https://learn.codeit.kr/api/members')
      .then((response) => response.text())
      .then((result) => {
        const members = // 이 부분을 채워보세요.
        console.log(members[members.length - 1]);
      });
  });

```


### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

```javascript

// 새 직원 정보는 원하는 대로 작성하세요.
const newMember = {
  name: 'hyunwoolee',
  email: 'archihw94@gmail.com',
	department: 'computer programming',
};


fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  body: JSON.stringify(newMember),
})
  .then(() => {
    fetch('https://learn.codeit.kr/api/members')
      .then((response) => response.text())
      .then((result) => {
        const members = JSON.parse(result);
        console.log(members[members.length - 1]);
      });
  });

```

</div>
</details>