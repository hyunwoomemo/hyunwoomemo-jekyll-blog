---
layout: single
title: "async/await"
categories: javascript
tag: [async, awaut]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## async/await이란?

async는 `async`hronous의 줄임말로 비동기를 의미

async 안에 비동기적으로 실행될 부분이 있다는 것을 의미한다. 

그 부분은 바로 `await`이 붙어있는 코드

awiat은 "~을 기다리다" 라는 뜻의 영어 단어

await은 그 뒤의 코드를 실행하고 그 코드가 리턴하는 프로미스 객체가 fulfilled 상태 또는 rejected 상태가 될 때까지 기다림

```javascript

//  fetch('https://jsonplaceholder.typicode.com/users')
//    .then((response) => response.text())
//    .then((result) => { console.log(result); });

async function fetchAndPrint() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const result = await response.text();
  console.log(result);
}

fetchAndPrint();

```

>await은 async 함수 안에서만 사용할 수 있음
{: .prompt-defi}

## async/await 구문의 실행 원리

```javascript

/* fetch('https://www.google.com')
    .then((response) => response.text())
    .then((result) => { console.log(result); }); */

async function fetchAndPrint() {
  console.log(2); // 두 번째
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  console.log(7); // 일곱 번째
  const result = await response.text();
  console.log(result);
} 

console.log(1); // 첫 번째
fetchAndPrint();
console.log(3); // 세 번째
console.log(4); // 네 번째
console.log(5); // 다섯 번째
console.log(6); // 여섯 번째

```

```console

1
2
3
4
5
6
7
[리스폰스의 내용]

```

async 함수 안의 코드가 실행되다가 await을 만나면, 일단 await 뒤의 코드가 실행되고, 코드의 실행 흐름이 async 함수 바깥으로 나가서 나머지 코드를 다 실행합니다. 

물론 함수 바깥에 더 이상 실행할 코드가 없을 수도 있습니다. 

어느 경우든 그 이후로는, await 뒤에 있던 Promise 객체가 fulfilled 상태가 되기를 기다립니다. 

그리고 기다리던 Promise 객체가 fulfilled 상태가 되면 await이 Promise 객체의 작업 성공 결과를 리턴하는 겁니다.

## catch문과 finally문

**에러나는 코드**

```javascript

async function fetchAndPrint() {
  const response = await fetch('https://jsonplaceholder.typicode.commm/users'); // 접근할 수 없는 URL
  const result = await response.text();
  console.log(result);
} 

```

**해결**

```javascript

async function fetchAndPrint() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.commm/users');
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('exit');
  }
} 

```

> async 함수는 항상 프로미스 객체를 리턴
{: .prompt-tip}

```javascript

async function fetchAndPrint() {
  return 3;
}

fetchAndPrint();

```

위 코드는 단순 3을 리턴하지 않는다.

**실행 결과**

![image](https://user-images.githubusercontent.com/105469077/201941282-e64e0b24-78f9-4c08-81ec-61a5347dd5fa.png)