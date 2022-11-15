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

## async 함수가 리턴하는 Promise 객체

`async 함수`는 그 안에서 리턴하는 값에 따라 그에 맞는 `Promise 객체를 리턴`합니다. 

### 1. 어떤 값을 리턴하는 경우

(1) Promise 객체를 리턴하는 경우

**해당 Promise 객체와 동일한 상태와 작업 성공 결과(또는 작업 실패 정보)를 가진 Promise 객체**를 리턴

(2) Promise 객체 이외의 값을 리턴하는 경우

Promise 객체 이외에 숫자나 문자열, 일반 객체 등을 리턴하는 경우에는, **fulfilled 상태이면서, 리턴된 값을 작업 성공 결과로 가진 Promise 객체를** 리턴

### 2. 아무 값도 리턴하지 않는 경우

이 경우에는 **fulfilled 상태이면서, undefined를 작업 성공 결과로 가진 Promise 객체**가 리턴

### 3. async 함수 내부에서 에러가 발생했을 때

async 함수 안에서 에러가 발생하면, **rejected 상태이면서, 해당 에러 객체를 작업 실패 정보로 가진 Promise 객체**가 리턴

## async 함수 안의 async 함수

```javascript

const applyPrivacyRule = async function (users) {
  const resultWithRuleApplied = users.map((user) => {
    const keys = Object.keys(user);
    const userWithoutPrivateInfo = {};
    keys.forEach((key) => {
      if (key !== 'address' && key !== 'phone') {
        userWithoutPrivateInfo[key] = user[key];
      }
    });
    return userWithoutPrivateInfo;
  });

  const p = new Promise((resolve, reject) => {
    setTimeout(() => { resolve(resultWithRuleApplied); }, 2000);
  });
  return p
};

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log(response);
    const result = await response.text();
    console.log(result);
    const users = JSON.parse(result);
    console.log(users);
    const resultWithPrivacyRuleApplied = await applyPrivacyRule(users);
    console.log(resultWithPrivacyRuleApplied);
    return resultWithPrivacyRuleApplied;
  } catch (error) {
    console.log(error);
  } finally {
    console.log('exit');
  }
}

getUsers().then((result) => { console.log(result); });

```

## async 함수를 작성할 때 주의해야할 성능 문제(심화)

```javascript

async function getResponses(urls) {
  for(const url of urls){
    const response = await fetch(url);
    console.log(await response.text());
  }
}

```

이 `getResponses` 함수는 urls라는 파라미터로, 여러 개의 URL들이 있는 배열을 받아서, 순서대로 각 URL에 리퀘스트를 보내고, 그 리스폰스의 내용을 출력하는 함수입니다. 

그런데 이 코드는 하나의 문제점이 있습니다. 

그건 바로 이전 URL에 리퀘스트를 보내고 리스폰스를 받아서 출력하고 나서야, 다음 URL에 대한 리퀘스트를 보낼 수 있다는 점입니다. 

즉, 순차적인 작업 처리를 한다는 점인데요. 

왜냐하면 이전 URL에 대해서 await 문이 붙은 Promise 객체가 fulfilled 상태가 될 때까지는 그 다음 URL에 대한 작업들이 시작될 수 없기 때문입니다.

만약 순차적인 처리를 해야 하는 경우라면 이 코드를 사용하는 게 맞겠지만, 만약 모든 리스폰스의 내용이 잘 출력되기만 하면 되고, 그 순서는 상관없는 경우라면 어떨까요? 

이 코드는 성능 관점에서 아쉬운 점이 있는 코드입니다.

만약 리스폰스의 내용의 순서가 중요하지 않은 경우라면 현재 코드를 이렇게 바꿔볼 수 있는데요.

```javascript

async function fetchUrls(urls){
  for(const url of urls){
    (async () => { // 추가된 부분!
      const response = await fetch(url);
      console.log(await response.text());
    })(); // 추가된 부분!
  }
}

```

지금 각 url에 리퀘스트를 보내고 리스폰스를 받는 코드를, 별도의 `즉시실행되는 async 함수`로 감싸줬는데요.

이렇게 코드를 고치면 일단 각 URL에 대해서 fetch 함수를 실행해서 리퀘스트를 보내는 것을 순서대로 바로 실행해버립니다. 

이전 코드처럼 이전 URL에 대한 리스폰스가 오기까지를 기다렸다가 다음 URL에 리퀘스트를 보내는 게 아니라요. 

이렇게 코드를 쓰면 일단 모든 URL에 대한 리퀘스트를 쭉 보내버리고, 먼저 리스폰스가 오는 순서대로 그 내용이 출력되죠.

리스폰스의 순서를 보장하지 않아도 되는 경우에는 이 코드가 훨씬 성능이 좋겠죠?

async 함수 안에서는 무언가를 반복 처리하는 코드를 쓸 때 유의해야 합니다. 

왜냐하면 의도치 않게 순차 처리를 수행하는 비효율적인 코드를 짜는 실수를 하게 되기 쉽기 때문이죠. 

만약 순차적인 처리가 필요한 경우가 아니라면 방금 본 것처럼 각 작업을 다시 async 함수로 묶어주면 된다는 사실, 기억해두세요!

## 비동기 실행 관련 문법 총정리

비동기 실행의 정의는 아래와 같이 다양한 방식으로 표현

- 특정 작업이 시작되고, 그 작업이 모두 완료되기 전에 바로 다음 코드가 실행되는 방식의 실행, 나머지 작업은 나중에 콜백을 통해 수행되는 방식의 실행
- 특정 처리를 나중으로 미루는 방식의 실행
- 콜백을 등록해두고, 추후에 특정 조건이 만족되면 그 콜백으로 나머지 작업을 수행하는 방식의 실행

> 특정 처리를 담당하는 존재(콜백)의 실행을 나중으로 미룬다는 점
{: .prompt-tip}

```비동기 실행 관련 문법 3가지```

(1) 파라미터로 바로 콜백을 전달하는 형태의 전통적인 비동기 실행 함수

(2) Promise

(3) async/await

### 1. 파라미터로 바로 콜백을 전달하는 형태의 전통적인 비동기 실행 함수

**setTimeout, setInterval 함수, DOM 객체의 addEventListener 메소드** 등

```javascript

setTimeout(() => {
  console.log('asynchronously executed');
}, 2000);

button.addEventListener('click', (event) => { console.log('You Clicked'); });

```

이렇게 함수의 파라미터로 콜백을 바로 전달하는 방식은 여전히 많은 경우에 쓰이고 있지만, 
여러 비동기 작업의 순차적인(sequential) 처리가 필요한 경우에 이런 함수들로 코드를 작성하면,

```javascript

fs.readFile('file1.txt', 'utf8', (error1, data1) => {
  if (error1) {
    console.log(error1);
  } else {
    console.log(data1);
    fs.readFile('file2.txt', 'utf8', (error2, data2) => {
      if (error2) {
        console.log(error2);
      } else {
        console.log(data2);
        fs.readFile('file3.txt', 'utf8', (error3, data3) => {
          if (error3) {
            console.log(error3);
          } else {
            console.log(data3);
          }
        });
      }
    });
  }
});

```

위와 같이 코드의 가독성이 급격하게 떨어지는 `콜백 헬(callback hell`) 문제가 발생할 가능성이 높다

### 2. Promise

```javascript

fetch('https://www.google.com')
  .then((response) => response.text())
  .then((result) => { console.log(result); })
  .catch((error) => { console.log(error); })
  .finally(() => { console.log('exit'); });

```

**Promise 객체를 사용하면 콜백 헬 문제를 방지하면서, 여러 비동기 작업을 순차적으로 처리**할 수 있다

그리고 기존의 1.과 같은 전통적인 비동기 실행 함수들 중에서도 그 콜백이 단 한 번만 실행되는 함수들은

```javascript

function readFile_promisified(filename) {
  const p = new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (error, data) => {
      if (error) {
        reject(error); // 에러 발생 시 -> rejected
      } else {
        resolve(data); // 파일 내용 읽기 완료 -> fulfilled
      }
    });
  });
  return p;
}

```

이런 식으로 `Promisify`해서 콜백 헬의 가능성을 없애고, Promise Chain 안에서 그 콜백의 리턴값을 사용할 수 있다

그리고 rejected 상태의 Promise 객체에 대비하기 위한 `catch` 메소드, 어느 상황이든 항상 마지막에 실행해야 할 코드가 있을 때 사용하는 `finally` 메소드

### 3. async / await 구문

```javascript

async function fetchAndPrint() {
  try {
    const response = await fetch('https://www.google.www');
    const result = await response.text();
    console.log(result);
  } catch(error) {
    console.log(error);
  } finally {
    console.log('exit');
  }
}

fetchAndPrint();

```

async/await 구문은 `Promise 객체를 다루는 코드(Promise Chaining 코드 등)를 사람들이 좀더 익숙하게 느끼는 동기 실행 스타일의 코드로 작성할 수 있게 해주는 Syntactic sugar`

async 함수 안의 내용이 순차적으로 실행되다가도, `await 문을 만나면 await 바로 뒤에 붙은 코드를 실행해두고, 일단은 함수 바깥으로 코드 흐름이 바뀐다`

`Promise 기반의 코드들은 가능한 경우에 모두 async/await 구문으로 전환해서 작성하는 게 더 좋습니다.`

2021년 1월을 기준으로 아직 위의 3가지 비동기 실행 관련 문법들은 서로 상호보완적인 것들이라고 할 수 있습니다. 왜냐하면 아직 아래와 같이 하나가 다른 하나를 완벽히 대체하지 못하는 측면이 있기 때문입니다.

- 콜백을 함수의 파라미터로 바로 전달하는 전통적인 방식의 비동기 실행 함수들 중에서도 setInterval, addEventListener처럼 그 콜백이 단 한번이 아니라 여러 번 실행되어야 하는 것들은 Promisify해서 사용하면 안 됩니다. Promise 객체는 한번 fulfilled 또는 rejected 상태가 되고나면 그 상태와 결과가 다시는 바뀌지 않기 때문입니다.
- async/await 구문의 경우, await은 async 함수 안에서만 사용할 수 있고, 코드의 top-level(어떤 함수 블록 안에 포함된 것이 아닌 코드의 최상위 영역)에서는 사용될 수는 없습니다. 그래서 코드의 top-level에서 async 함수가 리턴한 Promise 객체의 작업 성공 결과를 가져오려면 await을 사용할 수는 없고, 여전히 then 메소드를 사용해야합니다.
