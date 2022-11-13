---
layout: single
title: "신입 사원 정보 반영하기"
categories: practice
tag: [promise]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 실습과제

대세 온라인 쇼핑몰 중 하나인 코드잇몰(codeitmall)은 사업을 더 확장하기 위해서 올해 여름에 신입사원 채용을 진행했습니다. 그리고 이제 최종 인터뷰 결과가 나와서 그 중에서 합격한 사람들의 정보 그러니까 신입 직원들의 정보를, 기존의 직원 정보에 추가하려고 하는데요.

최종 인터뷰 결과 URL: [https://learn.codeit.kr/api/interviews/summer](https://learn.codeit.kr/api/interviews/summer)

이 URL로 GET 리퀘스트를 보내면 최종 인터뷰 결과를 볼 수 있습니다. 
어떤 사람이 합격인 경우 그 result 프로퍼티에 pass, 불합격인 경우 fail이라고 적혀있는데요. 
이 중에서 pass 값을 가진 사람들만을 추려서, 기존의 직원 정보에 추가해야 합니다.

직원 정보 URL: [https://learn.codeit.kr/api/members](https://learn.codeit.kr/api/members)"

이 URL을 사용해서 기존의 직원 정보에 신입 직원들의 정보를 추가하고, 올해의 새 직원 명단을 출력해보세요. 
참고로 이전에 직원 정보를 추가하기 위해 POST 리퀘스트를 보낼 때는 객체 하나를 보내서 하나의 직원 정보를 추가했지만, 여러 직원 정보가 담긴 배열을 보내서 모두 추가하는 것도 가능합니다. 이 사실을 기억하고 코드의 빠진 부분을 채워보세요.


### 문제

```javascript

fetch('https://learn.codeit.kr/api/interviews/summer')
  .then((response) => response.json())
  .then((interviewResult) => {
    const { interviewees } = interviewResult;
    const newMembers = interviewees.filter((interviewee) => interviewee.result === 'pass');
    // 여기에 코드를 작성하세요.
  })
  .then((newMembers) => fetch('https://learn.codeit.kr/api/members', {
    method: 'POST',
    body: // 여기에 코드를 작성하세요.
  }))
  .then((response) => { 
    if (response.status === 200) {
      // 여기에 코드를 작성하세요.
    } else {
      throw new Error('New members not added');
    }
  })
  .then((response) => response.json())
  .then((members) => {
    console.log(`총 직원 수: ${members.length}`);
    console.log(members);
  });

```


### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

```javascript

fetch('https://learn.codeit.kr/api/interviews/summer')
  .then((response) => response.json())
  .then((interviewResult) => {
    const { interviewees } = interviewResult;
    const newMembers = interviewees.filter((interviewee) => interviewee.result === 'pass');
    // 여기에 코드를 작성하세요.
    return newMembers;
  })
  .then((newMembers) => fetch('https://learn.codeit.kr/api/members', {
    method: 'POST',
    body: // 여기에 코드를 작성하세요.
    JSON.stringify(newMembers),
  }))
  .then((response) => { 
    if (response.status === 200) {
      // 여기에 코드를 작성하세요.
      fetch('https://learn.codeit.kr/api/members');
    } else {
      throw new Error('New members not added');
    }
  })
  .then((response) => response.json())
  .then((members) => {
    console.log(`총 직원 수: ${members.length}`);
    console.log(members);
  });

```

</div>
</details>