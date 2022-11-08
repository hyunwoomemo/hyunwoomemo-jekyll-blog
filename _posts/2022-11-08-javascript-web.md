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

