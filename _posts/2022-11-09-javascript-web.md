---
layout: single
title: "자바스크립트 웹 개발 기본기"
categories: javascript
tag: [fetch, url]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
last_modified_at: 2022-11-10
---

# #웹 기초 다지기

## fetch 함수 살펴보기

`fetch` 는 "가져오다"라는 뜻의 영어 단어

```javascript

fetch('https://www.google.com')
  .then((response) => reponse.text())
  .then((result) => { console.log(result); });

```

> 여기서 중요한 점은 fetch 밑에 `.then((response) => reponse.text())` 이 함수가 fetch함수가 실행될 때 함께 바로 실행되는 함수가 아니라는 점이다.<br/><br/>
> 이 함수는 서버의 리스폰스가 온 후에야 실행
{: .prompt-tip}

이렇게 나중에 어떤 조건이 만족되었을 때 실행되는 함수를 `콜백(Callback)`이라고 합니다.

`then`이라는 메소드가 콜백을 등록해주는 메소드

then 메소드는 fetch 함수가 리턴하는 프로미스 객체의 메소드

이전 콜백의 리턴 값을 다음 콜백이 넘겨받을 수 있음

## JSON 데이터를 객체로 변환하기

```javascript

JSON.parse()

```

```javascript

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.text())
  .then((result) => {
    const users = JSON.parse(result);
    users.forEach((user) => {
      console.log(user.name);
    });
  });

```

```javascript

fetch('https://learn.codeit.kr/api/topics')
  .then((response) => response.text())
  .then((result) => {
    const topics = JSON.parse(result);
    const beginnerLevelTopics = topics.filter((topic) => topic.difficulty === '초급');
    console.log(beginnerLevelTopics);
  });

```

## POST request 보내기

>[실습용 URL](https://learn.codeit.kr/api/members)
{: .prompt-defi}

**GET 리퀘스트**

```javascript

fetch('https://learn.codeit.kr/api/members')
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

**3번 직원의 정보 조회**

```javascript

fetch('https://learn.codeit.kr/api/members/3')
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

**새로운 직원 추가하기**

```javascript

const newMember = {
  name: 'Jerry',
  email: 'jerry@codeitmall.kr',
  department: 'engineering',
};

fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  body: JSON.stringify(newMember),
})
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

fetch 함수의 두 번째 파라미터에 옵션을 추가한 객체를 `옵션 객체`라고 함

옵션 추가하지 않으면 `기본값으로 GET request`를 보냄

`stringify` 메소드는 자바스크립트 객체를 String타입의 JSON 데이터로 변환

자바스크립트 객체 그 자체는 외부에 바로 전송할 수 없기 때문에 `String`타입의 `JSON 데이터`로 변환해줘야 한다.

`stringify` 메소드는 `parse`메소드와 정반대의 기능을 함

