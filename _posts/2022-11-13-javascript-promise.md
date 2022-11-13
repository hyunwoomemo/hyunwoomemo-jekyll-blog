---
layout: single
title: "비동기 실행과 Promise 객체"
categories: javascript
tag: [fetch, promise]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## fetch 함수와 비동기 실행

```javascript

console.log('Start!');

fetch('https://www.google.com')
  .then((response) => response.text())
  .then((result) => { console.log(result); });

console.log('End'); 

```

이 코드에는 `2개의 콜백`이 있음

(1) (response) ⇒ response.text()
(2) (result) ⇒ { console.log(result); }

fetch 함수가 리퀘스트를 보내고, 서버의 리스폰스를 받게 되면 그때서야 이 콜백들이 순서대로 실행

전체 코드의 실행 순서


1. console.log('Start');
2. fetch 함수(리퀘스트 보내기 및 콜백 등록)
3. console.log('End');
4. 리스폰스가 오면 2. 에서 then 메소드로 등록해뒀던 콜백 실행

> 특정 작업을 시작(리퀘스트 보내기)하고 완벽하게 다 처리(리스폰스를 받아서 처리)하기 전에, 
> <br/>
> 실행 흐름이 바로 다음 코드로 넘어가고, 나중에 콜백이 실행되는 것을 '비동기 실행'이라고 함
{: .prompt-info}

'비동기 실행'이 '동기 실행'에 비해, 동일한 작업을 더 빠른 시간 내에 처리할 수 있음

![image](https://user-images.githubusercontent.com/105469077/201506924-646b04a4-ff20-4070-8421-227928f0307a.png)

## 알아야하는 비동기 실행 함수들

### 1. setTimeout 함수

setTimeout 함수는, 특정 함수의 실행을 원하는 시간만큼 뒤로 미루기 위해 사용하는 함수입니다.

```javascript

console.log('a');
setTimeout(() => { console.log('b'); }, 2000);
console.log('c');

```

fetch 함수에서는 콜백이 실행되는 조건이, '리스폰스가 도착했을 때'였다면, setTimeout에서 콜백이 실행되는 조건은, '설정한 밀리세컨즈만큼의 시간이 경과했을 때'입니다.

### 2. setInterval 함수

setInterval 함수는 특정 콜백을 일정한 시간 간격으로 실행하도록 등록하는 함수

```javascript

console.log('a');
setInterval(() => { console.log('b'); }, 2000);
console.log('c');

```

### addEventListener 메소드

만약 사용자가 웹 페이지에서 어떤 버튼 등을 클릭했을 때, 실행하고 싶은 함수가 있다면

(1) 해당 DOM 객체의 onclick 속성에 그 함수를 설정하거나, 
(2) 해당 DOM 객체의 addEventListener 메소드의 파라미터로 전달하면 됩니다.

(1) onclick 속성

```javascript

...

btn.onclick = function (e) { // 해당 이벤트 객체가 파라미터 e로 넘어옵니다.
  console.log('Hello Codeit!');
};

// 또는 arrow function 형식으로 이렇게 나타낼 수도 있습니다. 
btn.onclick = (e) => {
  console.log('Hello Codeit!');
};

...

```

(2) addEventListener 메소드

```javascript

...

btn.addEventListener('click', function (e) { // 해당 이벤트 객체가 파라미터 e로 넘어옵니다.
  console.log('Hello Codeit!');
});

// 또는 arrow function 형식으로 이렇게 나타낼 수도 있습니다.
btn.addEventListener('click', (e) => {
  console.log('Hello Codeit!');
});

... 

```

이렇게 클릭과 같은 특정 이벤트가 발생했을 때 실행할 콜백을 등록하는 addEventListener 메소드도 비동기 실행과 관련이 있습니다. 

파라미터로 전달된 콜백이 당장 실행되는 것이 아니라, 나중에 특정 조건(클릭 이벤트 발생)이 만족될 때(마다) 실행되기 때문입니다. 

```javascript

setTimeout(콜백, 시간) 
setInterval(콜백, 시간)
addEventListener(이벤트 이름, 콜백)

```

fetch 함수는 이 함수들과는 전혀 다르게 생겼습니다. 지금 보면,

```javascript

fetch('https://www.google.com')
  .then((response) => response.text()) // fetch 함수가 리턴하는 객체의 then 메소드를 사용해서 콜백을 등록
  .then((result) => { console.log(result); });

```

fetch 함수는 콜백을 파라미터로 바로 전달받는 게 아니라, `fetch 함수가 리턴하는 어떤 객체의 then 메소드를 사용해서 콜백을 등록`하는데요.

왜 fetch 함수만 사용하는 형식이 다른 걸까요? 그건 바로 fetch 함수는, 좀 더 새로운 방식으로 비동기 실행을 지원하는 자바스크립트 문법과 연관이 있기 때문입니다. 사실 `fetch 함수는 Promise 객체라는 것을 리턴하고, 이 Promise 객체는 비동기 실행을 지원하는 또 다른 종류의 문법에 해당`

## fetch 함수는 Promise 객체를 리턴

Promise 객체는 어떤 작업에 관한 `상태 정보`를 갖고 있는 객체

크게 세 가지 중 하나의 상태를 가짐

첫 번째는 작업이 진행 중임을 의미하는 `pending` 상태
두 번째는 작업이 성공적으로 완료되었음을 의미하는 `fulfilled` 상태
세 번째는 작업이 실패했음을 의미하는 `rejected` 상태

![image](https://user-images.githubusercontent.com/105469077/201511240-56496355-185d-47b2-8339-84746dd0fa5e.png)

작업이 성공해서 promise 객체가 fulfilled 상태가 되면 promise 객체는 그 작업의 성공 결과도 함께 갖게 됨

![image](https://user-images.githubusercontent.com/105469077/201511282-1c5c77e1-c264-47cb-9b0b-d5b7f427227e.png)

서버가 보내 준 리스폰스가 작업의 성공 결과에 해당

인터넷이 끊기는 등의 이유로 인해서 promise 객체과 rejected 상태가 되면 작업의 실패 이유에 관한 정보를 갖게 됨

### 정리

> fetch 함수는 promise 객체를 리턴
> <br/>
> promise 객체는 어떤 작업에 관한 상태 정보를 갖고 있음
> <br/>
> promise는 작업의 상태에 따라서 그에 맞는 상태를 가짐
> <br/>
> 만약 작업이 진행 중이라면 `pending` 상태
> <br/>
> 작업이 성공적으로 완료되었다면 `fulfilled` 상태 - 작업의 성공 결과를 추가적으로 가짐
> <br/>
> 작업이 실패했다면 `rejected` 상태 - 작업 실패 정보를 추가적으로 가짐
{: .prompt-tip}