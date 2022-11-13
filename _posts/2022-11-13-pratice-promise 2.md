---
layout: single
title: "점심 메뉴 랜덤 선택기"
categories: practice
tag: [promise]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 실습과제

점심 메뉴를 고르는 것은 많은 이들의 고민입니다. 이번 과제에서는 여러 점심 메뉴 후보 중에서 랜덤으로 메뉴를 골라주는 코드를 짜보려고 하는데요.

지금 코드잇 실행기에는 fetch 함수를 써서, 외부로부터 메뉴 후보 리스트를 가져오고, 이 메뉴 후보들 중에 하나를 랜덤으로 골라주는 getRandomMenu 함수가 있습니다.

메뉴 후보 리스트는 이 URL로부터 가져옵니다.

    메뉴 후보 리스트 URL : https://learn.codeit.kr/api/menus

지금 getRandomMenu 함수 안에서 실행되는 pick이라는 함수는 랜덤으로 정해진 메뉴를 작업 성공 결과로 가진 Promise 객체를 리턴하는 함수입니다. 만약 메뉴 후보 리스트의 길이가 0이라면 Need Candidates!(후보 메뉴들이 필요합니다)라는 메시지를 가진 에러 객체를 생성하고 그것을 reject 함수의 파라미터로 전달하고 실행하는데요.

주석 위치에 들어갈 한 줄의 코드를 직접 작성하고 실행해보세요.



### 문제

```javascript

function pick(menus) {
  console.log('Pick random menu!');
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error('Need Candidates'));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        // 여기에 코드를 작성하세요.
      }, 1000); // 시간이 걸리는 걸 시뮬레이션하기 위한 1초입니다.
    }
  });
  return p;
}

function getRandomMenu() {
  return fetch('https://learn.codeit.kr/api/menus')
    .then((response) => response.json())
    .then((result) => {
      const menus = result;
      return pick(menus); // ! random pick function
    });
}

getRandomMenu()
  .then((menu) => {
    console.log(`Today's lunch is ${menu.name} ~`);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log('Random Menu candidates change everyday');
  });

```


### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

```javascript

function pick(menus) {
  console.log('Pick random menu!');
  const p = new Promise((resolve, reject) => {
    if (menus.length === 0) {
      reject(new Error('Need Candidates'));
    } else {
      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * menus.length);
        const selectedMenu = menus[randomIdx];
        // 여기에 코드를 작성하세요.
        resolve(selectedMenu);
      }, 1000); // 시간이 걸리는 걸 시뮬레이션하기 위한 1초입니다.
    }
  });
  return p;
}

function getRandomMenu() {
  return fetch('https://learn.codeit.kr/api/menus')
    .then((response) => response.json())
    .then((result) => {
      const menus = result;
      return pick(menus); // ! random pick function
    });
}

getRandomMenu()
  .then((menu) => {
    console.log(`Today's lunch is ${menu.name} ~`);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log('Random Menu candidates change everyday');
  });

```

</div>
</details>