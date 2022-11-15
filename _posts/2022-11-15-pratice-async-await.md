---
layout: single
title: "세련된 비동기 실행 코드 작성해보기"
categories: practice
tag: [await, async]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 실습과제

Promise Chaining을 배운 승훈이는 지금 코드잇 실행기에 있는 코드를 작성해놓고 기분이 좋은 상태입니다. 
이 코드는 가장 최근에 가입한 유저의 최신 포스트를 가져와서 출력하는 코드인데요.

그런데 지나가던 선배 개발자가 이런 말을 해주네요?

"혜나 님, 지금 이 코드가 틀린 건 아니지만 요즘엔 보통 async/await으로 비동기 실행 코드를 작성해요, 그러면 비동기 실행 코드를 동기 실행 코드처럼 편하게 짤 수 있어서 좋아요."

라구요.

여러분이 혜나를 도와서 현재 보이는 Promise Chaining 코드를 async/await 구문을 사용하는 코드로 바꿔보세요.


### 문제

```javascript

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    const lastUser = users[users.length - 1];
    return lastUser.id;
  })
  .then((id) => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`))
  .then((response) => response.json())
  .then((posts) => {
    const lastPost = posts[posts.length - 1];
    console.log(lastPost);
  });

/* async function getTheLastPostOfTheLastUser() {

}

getTheLastPostOfTheLastUser().then((lastPost) => {
  console.log(lastPost);
}); */


```


### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

```javascript

async function getTheLastPostOfTheLastUser() {
  const userJSON = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await userJSON.json();
  const lastUser = users[users.length - 1];
  const { id } = lastUser;
  const postsJSON = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  const posts = await postsJSON.json();
  const lastPost = posts[posts.length - 1];
  return lastPost;
}

getTheLastPostOfTheLastUser().then((lastPost) => {
  console.log(lastPost);
});


```

</div>
</details>