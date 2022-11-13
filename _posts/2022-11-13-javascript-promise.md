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
> <br/>
> promise 객체는 어떤 작업에 관한 상태 정보를 갖고 있음
> <br/>
> promise는 작업의 상태에 따라서 그에 맞는 상태를 가짐
> <br/>
> <br/>
> 만약 작업이 진행 중이라면 `pending` 상태
> <br/>
> 작업이 성공적으로 완료되었다면 `fulfilled` 상태 - 작업의 성공 결과를 추가적으로 가짐
> <br/>
> 작업이 실패했다면 `rejected` 상태 - 작업 실패 정보를 추가적으로 가짐
{: .prompt-tip}

## fetch 함수를 사용한 코드, 다시 해석하기

```javascript

fetch('https://www.google.com')
  .then((response) => response.text()) // fetch 함수가 리턴하는 객체의 then 메소드를 사용해서 콜백을 등록
  .then((result) => { console.log(result); });

```

콜백을 등록하기 위해서 사용한다고 했던 이 then 메소드는 

사실 promise 객체의 메소드로 promise 객체가 pending 상태에서 fulfilled 상태가 될 때 실행할 콜백을 등록하는 메소드

그러니까 서버로부터 리스폰스가 오면 프로미스 객체가 fulfilled 상태가 되고 then 메소드로 등록해두었던 콜백이 실행

여기서 잠깐 프로미스 객체가 fulfilled 상태가 될 때 프로미스 객체는 그 작업 성공 결과를 갖게 됨, 작업 성공 결과는 서버가 보내준 리스폰스

프로미스 객체의 작업 성공 결과는 첫 번째 콜백의 파라미터로 넘어옴

## Promise Chanining

프로미스 객체에 then 메소드를 연속적으로 붙이는 것을 프로미스 체이닝이라고 함

---

프로미스 객체의 then 메소드는 또 다른 프로미스 객체를 리턴

이 새로운 프로미스 객체는 처음에는 pending 상태지만

then 메소드 안의 콜백이 실행되고 어떤 값을 리턴한지에 따라서 그 상태가 달라짐

만약 콜백에서 프로미스 객체를 리턴하면 앞으로 프로미스 객체가 갖게 될 상태와 결과를 그대로 따라서 갖게 됨

![image](https://user-images.githubusercontent.com/105469077/201514398-c0b32caf-7df5-44a0-b16c-fa7c93a77501.png)

![image](https://user-images.githubusercontent.com/105469077/201514441-03480738-4057-4d6c-882d-7207c8d188b4.png)

![image](https://user-images.githubusercontent.com/105469077/201514448-b81acedd-58c9-491d-81e9-060586579299.png)

하지만 프로미스 객체 이외의 값이라면 fulfilled 상태가 되고 해당 리턴값을 작업 성공 결과로 갖게 됨

![image](https://user-images.githubusercontent.com/105469077/201514476-19ef8d26-8601-4837-a59a-af91139e6950.png)

## text, json 메소드도 Promise 객체를 리턴

``` javascript

console.log('Start!');

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => {
    const users = JSON.parse(result);
    // ...
  });

console.log('End'); 

```

response 객체의 text 메소드로 리스폰스의 내용을 추출(`response.text();`)하고 이것을 Deserialize하거나(`JSON.parse(result);`)

```javascript

console.log('Start!');

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    // ...
  });

console.log('End');

```

response 객체의 json 메소드로 리스폰스의 내용 추출과 Deserialize를 한 번에 수행(`response.json()`)

> text 메소드와 json 메소드가 사실은 Promise 객체를 리턴하는 메소드라는 사실
{: .prompt-defi}

### 1. text 메소드

fetch 함수로 리스폰스를 잘 받으면, response 객체의 **text 메소드**는, **fulfilled 상태**이면서 **리스폰스의 바디에 있는 내용을 string 타입으로 변환한 값**을 '작업 성공 결과'로 가진 Promise 객체를 리턴합니다. 문장이 조금 기니까 반복해서 읽어보세요. 이때 그 작업 성공 결과는 string 타입인데요. 이때 그 값이 만약 JSON 데이터라면 이전에 배운 것처럼 JSON 객체의 parse 메소드로 Deserialize를 해줘야합니다.(`JSON.parse(result);`)

### 2. json 메소드

fetch 함수로 리스폰스를 잘 받으면, response 객체의 **json 메소드**는, **fulfilled 상태**이면서, **리스폰스의 바디에 있는 JSON 데이터를 자바스크립트 객체로 Deserialize해서 생겨난 객체**를 '작업 성공 결과'로 가진 Promise 객체를 리턴합니다. 만약 리스폰스의 바디에 있는 내용이 JSON 타입이 아니라면 에러가 발생하고 Promise 객체는 rejected 상태가 되면서 그 '작업 실패 정보'를 갖게 됩니다.

## Promise Chaining이 필요한 경우

`비동기 작업을 순차적으로 처리하기 위해서 `

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => {
    const users = JSON.parse(result);
    const { id } = users[0];
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  })
  .then((response) => response.text())
  .then((posts) => {
    console.log(posts);
  });

```

코드를 보면 전체 사용자 정보를 조회하기 위해서 Request를 보내고 Response가 올 때까지 기다립니다.
그리고 Response가 오면 Response에 들어있는 사용자 정보 중에서 

첫 번째 사용자의 id를 구해서 사용자가 작성한 글 목록을 조회해서 출력했습니다.

```두 번째 작업인 글 목록을 조회하고 출력하는 작업은 첫 번째 작업이었던 전체 사용자 정보 조회가 먼저 잘 이루어져야 가능한 작업입니다.```

첫 번째 작업이 이뤄지지 않았는데 두 번째 작업이 먼저 수행될 수는 없음

이렇게 순차적으로 비동기 작업을 처리해야 할 때 프로미스 체이닝을 하면 됨

## rejected 상태가 되면 실행할 콜백

![image](https://user-images.githubusercontent.com/105469077/201516788-99c4651f-055f-490a-8093-4680e0c7a03b.png)

만약 프로미스 객체가 rejected 상태가 됐을 때 실행할 콜백을 설정하고 싶다면

then 메소드의 `두 번째 파라미터`로 원하는 콜백을 넣어주면 됨

## catch 메소드

>catch 메소드 미사용
{: .prompt-info}

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text(), (error) => { console.log(error); })
  .then((result) => { console.log(result); });

```

>catch 메소드 사용
{: .prompt-info}

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .catch((error) => { console.log(error); }) // .then(undefined, (error) => { console.log(error); }) 코드와 같은 의미
  .then((result) => { console.log(result); });

```

>catch 메소드는 then 메소드를 변형한 것에 불과함!
{: .prompt-defi}

## catch 메소드는 마지막에 씁니다.

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .catch((error) => { console.log(error); })
  .then((result) => {
    console.log(result);
    throw new Error('test');
  });

```

마지막 then 메소드가 리턴한 프로미스 객체는 rejected 상태가 됩니다.

이렇게 rejected 상태의 프로미스만 남고 딱히 어떤 처리를 해주지 않으면 웹 브라우저는 에러로 인식

이런 문제를 해결하려면 

> catch 메소드를 가장 아래로 내려야 함
{: .prompt-tip}

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
    throw new Error('test');
  });
  .catch((error) => { console.log(error); })

```

## catch 메소드를 여러 개 쓰는 경우

**만약 중간에 에러가 발생해도 catch 메소드가 그 대안을 뒤로 넘겨줄 수 있으면 catch 메소드를 중간에 써도 됨**

```javascript

fetch('https://friendbook.com/my/newsfeeds')
  .then((response) => response.json()) // -- A
  .then((result) => { // -- B
    const feeds = result;
    // 피드 데이터 가공...
    return processedFeeds; 
  })
  .catch((error) => { // -- C
    // 미리 저장해둔 일반 뉴스를 보여주기  
    const storedGeneralNews = getStoredGeneralNews();
    return storedGeneralNews;
  })
  .then((result) => { /* 화면에 표시 */ }) // -- D
  .catch((error) => { /* 에러 로깅 */ }); // -- E

```

지금 **C줄에 있는 콜백**을 보세요. fetch 함수의 작업이 실패하면 C 줄의 콜백이 실행됩니다. 사실, 이 SNS 서비스의 웹 페이지에서는 사용자가 매번 뉴스피드를 볼 때마다, 나중에 오프라인 상태가 될 때를 대비해서 모든 사람이 공통으로 볼 수 있는, 텍스트로만 이루어진 최근 일반 뉴스 데이터를 갱신해서 웹 브라우저에 저장한다고 해봅시다. C줄의 콜백은 바로 이렇게 저장해둔 일반 뉴스 데이터를 그대로 가져오는 기능을 합니다. **이렇게 되면 인터넷이 안 되는 상황에서도 나만을 위한 최적화된 뉴스피드는 못 보지만 일반적인 세상 뉴스는 사용자가 볼 수 있게 되겠죠?**

이렇게 Promise Chain 중에서 **비록 에러가 발생했다고 해도 만약 실패한 작업 대신 다른 방법을 통해서 작업을 정상적으로 끝마칠 수 있는 상황이라면 catch 메소드를 중간에 사용하기도 합니다.** 그러니까 Promise Chain 중에서 단 하나의 작업이라도 실패하면 전체 작업이 실패했다고 봐도 되는 경우에는 그냥 Promise Chain 마지막에만 catch 메소드를 써주면 되겠지만, 어떤 작업들은 에러가 발생하더라도 다른 방식으로 복구해서 살려낼 방법이 있다면 catch 메소드 안의 콜백에서 그런 복구 작업을 해주면 되는 겁니다. 지금 위 코드에서는 미리 저장해둔 일반 뉴스 데이터를 구해오는 `getStoredGeneralNews` 함수를 실행하는 것처럼요.

catch 메소드를 Promise Chain의 마지막에 늘 써줘야 하는 것은 맞지만, 작업을 살릴 방법이 있다면 Promise Chain 중간에 catch 메소드를 써도 된다는 사실, 잘 기억해두세요.

## finally 메소드

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => { console.log(result); })
  .catch((error) => { console.log(error); })
  .finally(() => {console.log('exit'); });

```

그 전의 프로미스 객체가 fulfilled 상태가 되든 rejected 상태가 되든 상관없이 항상 실행

finally 메소드 안의 콜백은 작업 성공 결과나 작업 실패 정보가 필요하지 않기 때문에 파라미터가 필요 없음

## catch 메소드와 finally 메소드 퀴즈

```javascript

fetch('https://www.error.www')
  .then((response) => response.text())
  .then((result) => { console.log(result); })
  .catch((error) => { console.log('Hello'); throw new Error('test'); })
  .then((result) => { console.log(result); })
  .then(undefined, (error) => { })
  .catch((error) => { console.log('JS'); })
  .then((result) => { console.log(result); })
  .finally(() => { console.log('final'); });

```

이 코드에서 출력되는 모든 단어들이 알맞게 짝지어진 것을 고르세요. 
(https://www.error.www라는 URL은 존재하지 않기 때문에 fetch 함수의 작업은 실패합니다.)

1. Hello, undefined, final
2. Hello, test, undefined
3. Hello, test, JS, undefined, final
4. Hello, undefined, test

## Promise 객체는 왜 등장했을까?

이때까지 우리는 Promise Chaining, then/catch/finally 메소드 등 Promise 객체에 관한 많은 것들을 배웠습니다. 그런데 여기서 궁금한 점이 하나 있습니다. Promise 객체는 왜 등장한 걸까요?

사실 Promise 객체가 등장하기 전에도 비동기적인 처리를 할 수 있는 방법은 있었습니다. 
이전 노트에서 배운 setTimeout 함수나, addEventListener 메소드처럼요.

```javascript

setTimeout(callback, milliseconds);
addEventListener(eventname, callback);

```

이것들은 모두 직접 파라미터에 콜백을 전달하는 형식으로 정의되어 있는데요. 만약 fetch 함수를 이런 식으로 만들었다면

```javascript

fetch('https;//first.com', callback)

```

fetch 함수도 이런 식으로 사용했었겠죠? 그런데 왜 이런 방법이 선택되지 않고, 굳이 Promise 객체라는 문법이 도입된 것일까요? 
그 이유는 바로 함수에 콜백을 직접 넣는 형식은 `콜백 헬(callback hell)`이라고 하는 문제를 일으킬 수도 있기 때문입니다.

잠깐 이 코드를 봅시다. 만약 fetch 함수가 지금과 같이 Promise 객체를 리턴하는 게 아니라 setTimeout 함수처럼 콜백을 직접 집어넣는 형식의 함수였다면 우리는 여러 비동기 작업을 순차적으로 수행해야할 때

```javascript

fetch('https://first.com', (response) => {
  // Do Something
  fetch('https://second.com', (response) => {
    // Do Something
    fetch('https;//third.com', (response) => {
      // Do Something
      fetch('https;//fourth.com', (response) => {
        // Do Something
      });
    });
  });
});

```

이런 식의 코드를 작성해야 했을 겁니다. 지금 fetch 함수 안의 콜백에 fetch 함수가 있고 그 함수의 콜백 안에 fetch 함수가 있고 또.. 계속 이런 식으로 들어가있죠? 그런데 이 코드를 보면 어떤 느낌이 드시나요? 뭔가 읽기 어렵고 복잡해 보이죠? 한마디로 **가독성이 떨어집니다**. 그나마 지금은 실제 코드가 들어가야 할 자리에 "// Do Something" 이라는 주석이 들어가 있어서 괜찮지만, 실제로 필요한 코드들까지 들어가게 되면 이 코드의 가독성은 현저하게 떨어지게 되는데요. 이런 현상을 **콜백 지옥 또는 콜백 헬(callback hell)**이라고 합니다. 또는 지옥의 피라미드(Pyramid of Doom)라고도 합니다.

하지만 우리가 배웠던 대로 fetch 함수는 Promise 객체를 리턴하기 때문에

```javascript

fetch('https://first.com')
  .then((response) => {
    // Do Something 
    return fetch('https://second.com');
  })
  .then((response) => {
    // Do Something 
    return fetch('https://third.com');
  })
  .then((response) => { 
    // Do Something 
    return fetch('https://third.com');
  });

```

이런 식으로 Promise Chaining을 해서 좀 더 깔끔한 코드로 여러 비동기 작업을 순차적으로 처리할 수 있는데요. 
이렇게 **Promise 객체를 사용하면 callback hell 문제를 해결할 수 있습니다.**

이 뿐만 아니라 기존에 콜백을 직접 넣는 방식에 비해 Promise 객체의 문법은 비동기 작업에 관한 좀 더 세밀한 개념들이 반영되어 있습니다. 이전의 방식에서는 콜백에 필요한 인자를 넣어주고 실행하면 되는 단순한 방식이었다면, Promise 객체 문법에는 pending, fulfilled, rejected 상태, 작업 성공 결과 및 작업 실패 정보(이유), then, catch, finally 메소드 등과 같은 비동기 작업에 관한 보다 정교한 설계가 문법 자체에 반영되어 있다는 것을 알 수 있습니다.

바로 이렇게 Promise 객체라는 개념은,

(1) **callback hell 문제를 해결하고**, 이에 더해서 
(2) 비동기 작업 처리에 관한 좀 더 세밀한 처리를 자바스크립트 문법 단에서 해결하기 위해 등장했고,

그 유명한 자바스크립트의 2015년도 표준인 ES6(=ES2015)에 추가되었습니다.

## 직접 만들어보는 Promise 객체

```javascript

const p = new Promise((resolve, reject) => {
  setTimeout(() => { resolve('success'); }, 2000);
  setTimeout(() => { reject(new Error('fail')); }, 2000);
})

```

## Promisify

언제 이런 식으로 Promise 객체를 직접 만들게 되는 걸까요? 다양한 경우들이 있지만, 

**전통적인 형식의 비동기 실행 함수를 사용하는 코드를**, Promise 기반의 코드로 변환하기 위해 Promise 객체를 직접 만드는 경우가 많습니다. 

각각의 예시를 통해 이게 무슨 말인지 이해해봅시다.

### 1.setTimeout 함수 예시

예를 들어 이런 wait이라는 함수가 있다고 합시다.

```javascript

function wait(text, milliseconds) {
  setTimeout(() => text, milliseconds);
}

```

wait 함수는 특정 밀리세컨즈만큼 시간이 지난 후에 text 파라미터로 전달받은 값을 리턴하는 함수입니다. 이 wait 함수를 Promise Chaining 코드에서 사용해볼게요.

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

바로 이 Promise Chaining 코드에 wait 함수를 추가해볼 건데요. 이렇게 써보겠습니다.

```javascript

function wait(text, milliseconds) {
  setTimeout(() => text, milliseconds);
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => wait(`${result} by Codeit`, 2000)) // 2초 후에 리스폰스의 내용 뒤에 'by Codeit' 추가하고 리턴
  .then((result) => { console.log(result); });

```

기존 코드에 두 번째 then 메소드를 추가하고, 그 안에서 wait 함수를 호출했습니다. 이렇게 쓰면 2초 후에 리스폰스의 내용 뒤에 by Codeit이라는 문구를 붙여서 출력될 것 같은데요. 정말 그렇게 되는지 확인해봅시다.

코드를 실행해보면,

![image](https://user-images.githubusercontent.com/105469077/201526689-cd773fe0-ead9-4a1b-a72c-b51686329933.png)

**리스폰스의 내용과 by Codeit이 출력되지 않았습니다. 그 대신 undefined가 출력되었는데요.**

왜 그런 걸까요? 
그 이유는 바로 wait 함수에 있습니다.

```javascript

function wait(text, milliseconds) {
  setTimeout(() => text, milliseconds);
}

```

이 wait 함수는 내부에서 **setTimeout 함수를 호출**합니다. 그리고 **setTimeout 함수의 첫 번째 파라미터로 들어간 콜백이 2초 후에 text를 리턴**하죠. 그런데 여기서 혼동하면 안 되는 것은 wait 함수가

```javascript

...
  .then((result) => { return wait(`${result} by Codeit`, 2000); })
...

```

**이 두 번째 then 메소드 안의 콜백에서 실행될 때,**

**wait 함수는 setTimeout 함수를 실행할 뿐 아무것도 리턴하지 않는다는 사실입니다.** 
setTimeout 함수 안의 콜백이 2초 후에 리턴하는 **text는, wait 함수의 리턴값이 아닙니다.**

이 사실에 유의해야 하는데요. wait 함수는 단지 setTimeout 함수를 실행하고 아무것도 리턴하지 않는 함수일 뿐입니다. 

그리고 자바스크립트에서는 이전에 배운대로 함수에서 아무것도 리턴하지 않으면 undefined를 리턴하는 것으로 간주하기 때문에 wait 함수의 리턴값은 undefined입니다.

따라서 세 번째 then 메소드의 콜백으로 undefined가 넘어가고, 그래서 위 이미지에서 보이는 것처럼 undefined가 출력된 겁니다.

setTimeout은 비동기 실행되는 함수인데요. **Promise Chaining 안에서 이렇게 비동기 실행되는 함수를 바로 사용하면, 나중에 실행되는 부분의 리턴값(여기서는 text)를 Promise Chain에서 사용할 수 없게 됩니다.**

이 문제를 해결하려면 이전 영상에서 배웠던 Promise 객체를 직접 생성하는 방법을 사용하면 됩니다. 

wait 함수를 이렇게 수정해볼게요.

```javascript

// function wait(text, milliseconds) {
//   setTimeout(() => text, milliseconds);
// }

function wait(text, milliseconds) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => { resolve(text); }, 2000);
  });
  return p;
}

```

지금 wait 함수 안에서 Promise 객체를 직접 생성했고, executor 함수 안에서 setTimeout 함수를 호출했습니다. 

그리고 setTimeout 함수 안의 콜백에서 resolve 함수를 호출하는데 이 때 그 아규먼트로 text를 넣었습니다. 

그렇다면 Promise 객체 p는 2초 후에 fulfilled 상태가 될 것이고, 그 작업 성공 결과는 파라미터 text의 값이 될 될 것입니다. 

**wait 함수는 이제 Promise 객체 p를 리턴합니다.**

자, 이 상태에서 코드를 다시 실행해보면

```javascript

function wait(text, milliseconds) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => { resolve(text); }, 2000);
  });
  return p;
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => wait(`${result} by Codeit`, 2000)) // 2초 후에 리스폰스의 내용 뒤에 'by Codeit' 추가하고 리턴
  .then((result) => { console.log(result); });

```

이번에는 약 2초 후에 리스폰스의 내용이 잘 출력되고,

리스폰스의 내용 맨 마지막에는 by Codeit이라는 문구가 잘 붙어서 출력되는 것을 알 수 있습니다.

방금처럼 기존의 비동기 실행 함수(여기서는 setTimeout)의 콜백이 리턴하는 값을 Promise Chain에서 사용하고 싶다면, 해당 함수를 감싸서 Promise 객체를 직접 생성하는 코드를 작성해야 합니다. 

그리고 그 Promise 객체를 리턴해야 방금처럼 Promise Chain에서 해당 리턴값을 받아서 사용할 수 있습니다.

이렇게 전통적인 형식의 비동기 실행 함수를 Promise 객체로 감싸서 그 Promise 객체를 리턴하는 형식으로 만드는 작업을 `Promisify(프로미스화하다)`라고 하는데요. 

앞으로도 이 Promisify라는 용어를 사용하겠습니다. 

계속 내용을 읽어봅시다.

### 2. 콜백 헬(callback hell)과 Promise

이번에는 Promisify의 또 다른 예시를 보겠습니다. 

그런데 이번에는 브라우저가 아니라 조금 다른 환경에서의 코드를 볼 건데요. 바로 Node.js라고 하는 환경입니다. 

오늘날 자바스크립트가 실행되는 환경에는 웹 브라우저뿐만 아니라 Node.js라고 하는 것도 있습니다. 

이 Node.js는 오늘날 자바스크립트를 서버에서도 실행할 수 있게 해주는 또 다른 '자바스크립트 실행 환경'인데요. 

이 Node.js에서는 브라우저에서와는 또 다른 비동기 함수들이 제공됩니다. (Node.js가 뭔지 더 궁금하신 분들은 이 영상을 참고하세요.)

Node.js에는 다음과 같이 특정 파일의 내용을 읽기 위해 사용되는 readFile이라는 비동기 실행 메소드가 있습니다.

```javascript

fs.readFile('file1.txt', 'utf8', (error, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

```

여기서 fs는 readFile 메소드를 가진 객체로, 파일에 관한 기능들을 갖고 있습니다. 

일단 여기서 당장 중요한 내용은 아니니까 readFile 메소드에만 집중합시다. 

readFile 메소드는 첫 번째 파라미터로 파일의 이름, 두 번째 파라미터로 파일 해석 기준(인코딩 기준), 세 번째 파라미터로 콜백을 받는데요. 

readFile 함수는 파일을 읽다가 에러가 발생하면 콜백의 첫 번째 파라미터(error)에, 해당 에러 객체를 전달하고 콜백을 실행합니다. 

만약 파일을 정상적으로 다 읽었으면 콜백의 두 번째 파라미터(data)에, 읽어들인 파일 내용을 전달하고 콜백을 실행하는데요.

이 readFile 메소드도, 콜백을 파라미터에 바로 넣는 비동기 실행 함수라는 점에서 setTimeout 함수, addEventListener 메소드와 비슷합니다. 

그런데 이런 형식의 함수(또는 메소드)들은 한 가지 단점이 있다고 했었죠?(참고) 그건 바로 콜백 헬(callback hell) 문제입니다. 

예를 들어, 위 코드에서 이제 file1.txt 파일의 내용을 출력하고 나서 그 다음에 file2.txt라는 파일의 내용을 또 출력해야한다고 해봅시다. 그럼 코드가 이렇게 되겠죠?

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
      }
    });
  }
});

```

이렇게 코드를 쓰면 file1.txt의 내용이 출력되고, 그 다음에 file2.txt의 내용이 출력될 겁니다. 코드가 좀 복잡해졌지만 아직은 읽을만한 것 같습니다. 

그런데 이제 그 다음으로 file3.txt의 내용도 출력해야 한다고 해봅시다.

그렇다면

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

코드가 이렇게 됩니다. 이제 코드를 읽기 너무 어려워지지 않았나요?

콜백을 바로 파라미터에 집어넣는 전통적인 형식의 비동기 실행 함수들은 이런 문제가 있습니다. 

바로 순차적으로 비동기 실행 함수들을 실행하려고 하면 콜백 안에 또 콜백이 있고, 그 안에 또 `콜백이 있는 콜백 헬(콜백 지옥, callback hell) 현상`을 초래하게 된다는 겁니다.

실제로 실무에서 개발을 하다 보면 이런 콜백 헬이 아주 큰 문제가 됩니다. 

그런데 이런 함수들은 Promise 객체를 리턴하는 것도 아니고 애초에 이런 형식으로 정의되어 있기 때문에 문제를 해결하기가 어려워 보이는데요. 

이 문제에 대한 대표적인 해결책이 바로 우리가 배운 Promisify입니다.

지금 이 readFile 메소드를 Promisify해보겠습니다.

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

이런 식으로 readFile_promisified라는 이름의 함수를 정의했는데요. 

지금 함수 안에서는 Promise 객체를 직접 생성하고 있습니다. 

그리고 Promise 객체가 생성될 때 실행되는 executor 함수 안에서는 fs 객체의 readFile 메소를 호출했습니다.

여기서 중요한 것은 작업을 수행하다가 에러가 나면 readFile 함수의 콜백에서

```javascript

...                         (error, data) => {
  if (error) {
    reject(error); // 에러 발생 시 -> rejected 
  } else {
    resolve(data); // 파일 내용 읽기 완료 -> fulfilled 
  }
}

```

reject 함수를 호출하고, 파일의 내용을 정상적으로 다 읽었을 때는 resolve 함수를 호출한다는 사실입니다. 

그리고 reject 함수의 파라미터에는 error 객체를, resolve 함수의 파라미터에는 파일의 내용인 data를 전달했는데요. 

이 각각은, 생성된 Promise 객체의 작업 실패 정보 또는 작업 성공 결과가 되겠죠?

이제 readFile 메소드를 Promisify해서 만든 readFile_promisified 함수를 사용해서 위의 콜백 헬 코드에서 작성했던 내용을 똑같이 작성해봅시다.

```javascript

readFile_promisified('file1.txt')
  .then((data) => { console.log(data); return readFile_promisified('file2.txt'); })
  .then((data) => { console.log(data); return readFile_promisified('file3.txt'); })
  .then((data) => { console.log(data); })
  .catch((error) => { console.log(error); });

```

짠! 어떤가요? 코드가 훨씬 깔끔해졌죠? readFile_promisified 함수는 Promise 객체를 리턴하기 때문에 이렇게 자유롭게 Promise Chain 안에서 사용할 수 있습니다.

이렇게 원하는 경우에는 전통적인 형식의 비동기 실행 함수를 Promisify해서 콜백 헬을 방지하고, 가독성 높은 코드를 작성할 수 있습니다.

### 3. Promisify를 하면 안 되는 함수들도 있습니다.

이제 기존의 전통적인 형식의 비동기 실행 함수도 원하는 경우에는 Promisify해서 콜백 헬을 방지할 수 있다는 것을 알게 되었습니다. 하지만 전통적인 형식의 비동기 실행 함수라고 해서 모두 Promisify해서 사용해도 되는 것은 아닙니다.

기존의 비동기 실행 함수들 중에서도 그 콜백을 한번만 실행하는 것들(setTimeout, readFile 등)만 Promisify해서 사용해도 되는데요.

이것들과 달리 만약 콜백을 여러 번 실행하는 함수들(setInterval, addEventListener 등)인 경우에는 이렇게 Promisify하면 안 됩니다. 왜냐하면 **Promise 객체는 한번 pending 상태에서 fulfilled 또는 rejected 상태가 되고나면 그 뒤로는 그 상태와 결과가 바뀌지 않기 때문입니다.** 이게 무슨 말인지 다음 코드를 보고 이해해봅시다.

```javascript

const box = document.getElementById('test');
let count = 0;

function addEventListener_promisified(obj, eventName) { // 이런 Promisify는 하지 마세요
  const p = new Promise((resolve, reject) => {
    obj.addEventListener(eventName, () => { // addEventListener 메소드
      count += 1;
      resolve(count);
    });
  });
  return p;
}

addEventListener_promisified(box, 'click').then((eventCount) => { console.log(eventCount); });

```

이 코드에서 보이는 addEventListener_promisified 함수는 DOM 객체의 addEventListener 메소드를 Promisify한 함수인데요.

지금 Promise 객체가 생성될 때 실행되는 executor 함수 안에서는, DOM 객체에 어떤 이벤트가 발생할 때, 실행할 콜백을 등록하고 있습니다. 
특정 이벤트가 발생할 때마다 count라고 하는 변수의 값을 1씩 늘려서 resolve 함수의 파라미터로 전달해서 실행하도록 하는 내용이 들어있는데요.

마지막 코드를 보면,

```javascript

addEventListener_promisified(box, 'click')
  .then((eventCount) => { console.log(eventCount); });

```

이렇게 addEventListener_promisified 함수의 아규먼트로 DOM 객체 box와 문자열 'click'을 넣어서 box 객체가 클릭 이벤트에 반응하도록 했습니다. 
(HTML 코드는 생략된 상태입니다.)

하지만 이 코드를 실행하고 box를 클릭해보면 
**처음에 1이 딱 출력되고 나서 그 다음 count 값들은 출력되지 않습니다.**

왜냐하면 pending 상태에 있던 Promise 객체(여기서는 p 객체)가 한번 fulfilled 상태 또는 rejected 상태가 되고 나면 
Promise 객체의 상태 및 결과가 고정되어 그 뒤로는 바뀌지 않기 때문입니다.

따라서 지금 위 코드에 보이는 resolve(count)라고 하는 코드가 box 버튼을 클릭할 때마다 여러 번 실행된다고 해도 p 객체가 갖고 있는 상태와 결과는 변하지 않습니다. 그래서 then 메소드 안의 콜백도 처음 클릭했을 때 딱 한번 실행되고 끝인 겁니다.

이렇게 콜백이 여러 번 실행되어야하는 비동기 실행 함수인 경우에는 Promisify를 하면 안 됩니다. Promisify를 하고 싶은 경우라도, 콜백이 딱 한 번 실행되는 함수인 경우에만 해야한다는 사실, 잘 기억하세요!

## 이미 상태가 결정된 Promise 객체

**(1) fulfilled 상태의 Promise 객체 만들기**

```javascript

const p = Promise.resolve('success');

```

**(2) rejected 상태의 Promise 객체 만들기**

```javascript

const p = Promise.reject(new Error('fail'));

```

## 여러 Promise 객체를 다루는 방법 (심화)

실무 개발에서는 **여러 개의 Promise 객체를 동시에 다뤄야 하는 경우**도 있음

### 1. all 메소드

```javascript

// 1번 직원 정보
const p1 = fetch('https://learn.codeit.kr/api/members/1').then((res) => res.json());
// 2번 직원 정보
const p2 = fetch('https://learn.codeit.kr/api/members/2').then((res) => res.json());
// 3번 직원 정보
const p3 = fetch('https://learn.codeit.kr/api/members/3').then((res) => res.json());

Promise
  .all([p1, p2, p3])
  .then((results) => {
    console.log(results); // Array : [1번 직원 정보, 2번 직원 정보, 3번 직원 정보]
  });

```

지금 이 코드에는 서로 다른 3개의 URL로 리퀘스트를 보내는 fetch 함수들이 보입니다. 

URL을 자세히 보니 이전에 사용했던 직원 정보에 관한 학습용 URL이네요. 지금 1번, 2번, 3번 직원의 정보를 각각 요청하고 있죠?

그 다음 부분을 보면, Promise의 all이라는 메소드를 호출하고 있고, all 메소드의 아규먼트로는 배열 하나가 들어있습니다. 

그 배열의 요소들은, 각 직원 정보를 요청하고 받아서 Deserialize까지 수행한 작업 성공 결과를 담고 있는 Promise 객체들인 p1, p2, p3 객체입니다.

이 all 메소드는 무슨 기능을 하는 걸까요? **all 메소드도 then 메소드처럼 새로운 Promise 객체를 리턴**하는데요. 

all 메소드는 이렇게 아규먼트로 들어온 **배열 안에 있는 모든 Promise 객체가 pending 상태에서 fulfilled 상태가 될 때까지 기다립니다. **

그리고 모든 Promise 객체들이 fulfilled 상태가 되면, all 메소드가 리턴했던 Promise 객체는 fulfilled 상태가 되고, 
각 Promise 객체의 작업 성공 결과들로 이루어진 배열을, 그 작업 성공 결과로 갖게 됩니다.

이 코드를 직접 실행해보면,

![image](https://user-images.githubusercontent.com/105469077/201528318-bc1f8e28-ece4-4cde-a9dc-4e99229fe301.png)

이렇게 all 메소드가 리턴한 Promise 객체는,

(1) 각 개별 Promise 객체의 작업 성공 결과로 이루어진 배열을 
(2) 자신의 작업 성공 결과로 갖는다는 것을 알 수 있습니다.

배열의 각 요소로 각 직원 정보 객체가 잘 보이죠? 이렇게 all 메소드는 여러 Promise 객체의 작업 성공 결과를 기다렸다가 모두 한 번에 취합하기 위해서 사용합니다.

그런데 만약 p1~3 객체들 중 하나라도, rejected 상태가 되면 어떻게 될까요?

all 메소드가 리턴한 Promise 객체는 p3 객체처럼 rejected 상태가 되고 동일한 작업 실패 정보를 갖게 됩니다. 

>이렇게 all 메소드는 하나의 Promise 객체라도 rejected 상태가 되면, 전체 작업이 실패한 것으로 간주해야 할 때 사용합니다. 
{: .prompt-tip}

그리고 이렇게 Promise 객체가 하나라도 rejected 상태가 되는 경우에 대비하려면 
이전에 배웠던 것처럼 catch 메소드를 붙여주면 됩니다.

### 2. race 메소드

race 메소드도 all 메소드와 마찬가지로 여러 Promise 객체들이 있는 배열을 아규먼트로 받습니다. 

그리고 race 메소드도 all 메소드처럼 Promise 객체를 리턴하는데요. 하지만 그 적용 원리가 다릅니다.

race 메소드가 리턴한 Promise 객체는 아규먼트로 들어온 배열의 여러 Promise 객체들 중에서 
`가장 먼저 fulfilled 상태 또는 rejected 상태가 된 Promise 객체와 동일한 상태와 결과를 갖게 됩니다.`

예를 들어 이런 코드가 있다고 할 때,

```javascript

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Success'), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail2')), 4000);
});

Promise
  .race([p1, p2, p3])
  .then((result) => {
    console.log(result); // hello 출력
  })
  .catch((value) => {
    console.log(value);
  });

```

지금 race 메소드 안의 배열에 들어있는 Promise 객체들 중에서 무엇이 가장 빨리 fulfileld 또는 rejected 상태가 될까요? 

답은 1초 후에 fulfilled 상태가 되는 p1 객체입니다.

p1 객체는 1초 후에 fulfilled 상태가 되고, 그 작업 성공 결과로 문자열 Success를 가지게 되는데요. 

p2는 2초 후에, p3는 4초 후에 rejected 상태가 됩니다.

race 메소드가 리턴한 Promise 객체는 이 중에서 가장 빨리 상태 정보가 결정된 p1 객체와 동일한 상태와 결과를 가집니다. 

말그대로` race 메소드는 여러 Promise 객체들을 레이스(race, 경쟁)시켜서 가장 빨리 상태가 결정된 Promise 객체를 선택하는 메소드`입니다. 

---

all 메소드나 race 메소드 말고 `allSettled, any라는 메소드`도 있습니다. 

이것들도 all, race 메소드처럼 **Promise 객체 배열을 아규먼트로 받고 Promise 객체를 리턴**하는데요.

이것들도 간단하게 설명하겠습니다.

각 메소드가 리턴한 Promise 객체가 A라고 할 때,

`allSettled` 메소드 : 배열 내의 모든 Promise 객체가 fulfilled 또는 rejected 상태가 되기까지 기다리고, pending 상태의 Promise 객체가 하나도 없게 되면, A의 상태값은 fulfilled 상태가 되고 그 작업 성공 결과로, 하나의 배열을 갖게 됩니다. 

이 배열에는 아규먼트로 받았던 배열 내의 각 promise 객체의

(1) 최종 상태를 status 프로퍼티, 
(2) 그 작업 성공 결과는 value 프로퍼티, 
(3) 그 작업 실패 정보는 reason 프로퍼티

에 담은 객체들이 요소로 존재합니다. 
이런 식으로 말이죠.

```javascript

[
   {status: "fulfilled", value: 1},
   {status: "fulfilled", value: 2},
   {status: "fulfilled", value: 3},
   {status: "rejected",  reason: Error: an error}
]

```

참고로 fulfilled 상태와 rejected 상태를 묶어서 `settled` 상태라고 하는데요. allSettled 메소드는 말 그대로 배열 속 Promise 객체들이 settled 상태가 되기만 하면 되는 겁니다. 

이에 반해 위에서 배운 all 메소드는 모든 Promise 객체들이 fulfilled 상태가 되기를 기다리는 거구요.

`any` 메소드 : 여러 Promise 객체들 중에서 가장 먼저 fulfilled 상태가 된 Promise 객체의 상태와 결과가 A에도 똑같이 반영됩니다. 

만약 모든 Promise 객체가 rejected 상태가 되어버리면 AggregateError라고 하는 에러를 작업 실패 정보로 갖고 rejected 상태가 됩니다. 

any라는 단어의 뜻처럼 배열 속의 Promise 객체 중 단 하나라도 fulfilled 상태가 되면 되는 겁니다.