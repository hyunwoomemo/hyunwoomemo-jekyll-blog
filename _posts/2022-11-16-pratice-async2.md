---
layout: single
title: "개선된 점심 메뉴 랜덤 선택기 코드"
categories: practice
tag: [async, await]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 실습과제

기존의 코드를 async/await 구문 기반으로 바꾸려고 합니다. 템플릿에 있는 코드를 async/await을 사용하는 코드로 바꿔보고 실행해보세요. 같은 동작을 하는 코드지만 코드의 가독성이 더 좋아지는 것을 확인할 수 있을 겁니다.

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
        resolve(selectedMenu);
      }, 1000);
    }
  });
  return p;
}

function getRandomMenu() {
  console.log('---Please wait!---');
  return fetch('https://learn.codeit.kr/api/menus')
    .then((response) => response.text())
    .then((result) => {
      const menus = JSON.parse(result);
      return pick(menus); // ! random pick function
    });
}

getRandomMenu()
  .then((menu) => {
    console.log(`Today's lunch is ${menu.name}~`);
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
        resolve(selectedMenu);
      }, 1000);
    }
  });
  return p;
}

function getRandomMenu() {

  console.log('---Please wait!---');

  try {
    const response = await fetch('https://learn.codeit.kr/api/menus');
    const menus = await response.json();
    const menu = await pick(menus);
    console.log(`Today's lunch is ${menu.name}~`);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('Random Menu candidates change everyday');
  }
}

getRandomMenu();

```

</div>
</details>
