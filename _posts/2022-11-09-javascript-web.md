---
layout: single
title: "자바스크립트 Web API"
categories: javascript
tag: [fetch, url]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
last_modified_at: 2022-11-13
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

## PUT request, DELETE  request 보내기

**PUT request**

어떤 정보를 수정할 것인지 id값을 알아야함

**2번 직원 정보 수정**

```javascript

const member = {
  name: 'Alice',
  email: 'alice@codeitmail.kr',
  department: 'marketing',
};

fetch('https://learn.codeit.kr/api/members/2', {
  method: 'PUT',
  body: JSON.stringify(member),
})
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

**2번 직원 정보 삭제**

```javascript

fetch('https://learn.codeit.kr/api/members/2', {
  method: 'DELETE',
})
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

## Status Code

Response도 Request처럼 head와 body로 이루어져있음

Body는 실제 데이터를 담는 부분으로 주로 JSON 데이터가 들어감

리스폰스의 헤드에는 `상태코드(Status Code)`가 있음

### 각각의 상태 코드에는 대응되는 상태 메시지가 있음

모든 상태 코드(Status Code)는 각각 그에 대응되는 상태 메시지(Status Message)를 갖고 있습니다.

예를 들어, 우리가 배운 200번은 OK, 404번은 Not Found라는 상태 메시지를 갖고 있습니다. 각 상태 코드의 의미를 모두 외우기는 힘들기 때문에 이러한 상태 메시지는 상태 코드의 의미를 빠르게 파악하는데 도움을 줍니다.

### 상태 코드는 100번대~500번대까지 있음

이전 영상에서는 상태 코드 200번과 404번만 봤는데요. 사실 상태 코드는 100번대부터 500번대까지 존재합니다. 그리고 각 번호대는 그것만의 의미를 가지고 있는데요. 각 번호대 별 주요 상태 코드들을 살펴봅시다. 각 상태 코드는 상태 코드 옆에 바로 상태 메시지를 쓰는 형식(예: 200 OK)으로 나타내겠습니다.

<details>
<summary>📝Status Code</summary>
<div markdown='1'>

**(1) 100번대**

서버가 클라이언트에게 정보성 응답(Informational response)을 줄 때 사용되는 상태 코드들입니다.

- `100 Continue` : 클라이언트가 서버에게 계속 리퀘스트를 보내도 괜찮은지 물어봤을 때, 계속 리퀘스트를 보내도 괜찮다고 알려주는 상태 코드입니다. 예를 들어, 클라이언트가 용량이 좀 큰 파일을 리퀘스트의 바디에 담아 업로드하려고 할 때 서버에게 미리 괜찮은지를 물어보는 경우가 있다고 할 때, 서버가 이 100번 상태 코드의 리스폰스를 주면 그제서야 본격적인 파일 업로드를 시작합니다.
- `101 Switching Protocols` : 클라이언트가 프로토콜을 바꾸자는 리퀘스트를 보냈을 때, 서버가 '그래요, 그 프로토콜로 전환하겠습니다'라는 뜻을 나타낼 때 쓰이는 상태 코드입니다.

**(2) 200번대**

클라이언트의 리퀘스트가 성공 처리되었음을 의미하는 상태 코드들입니다.

- `200 OK` : 리퀘스트가 성공적으로 처리되었음을 포괄적으로 의미하는 상태 코드입니다. 이때 성공의 의미는 리퀘스트에 있던 메소드의 종류에 따라 다르겠죠? GET 리퀘스트의 경우 리소스가 잘 조회되었다는 뜻이고, POST 리퀘스트의 경우 새 리소스가 잘 생성되었다, PUT 리퀘스트의 경우 기존 리소스가 잘 수정되었다, DELETE 리퀘스트의 경우 기존 리소스가 잘 삭제되었다는 뜻입니다.
- `201 Created` : 리퀘스트의 내용대로 리소스가 잘 생성되었다는 뜻입니다. POST 리퀘스트가 성공한 경우에 200번 대신 201번이 올 수도 있습니다.
- `202 Accepted` : 리퀘스트의 내용이 일단은 잘 접수되었다는 뜻입니다. 즉, 당장 리퀘스트의 내용이 처리된 것은 아니지만 언젠가 처리할 것이라는 뜻인데요. 리퀘스트를 어느 정도 모아서 한번에 실행하는 서버인 경우 등에 이런 응답을 줄 수도 있습니다.

**(3) 300번대**

클라이언트의 리퀘스트가 아직 처리되지 않았고, 리퀘스트 처리를 원하면 클라이언트 측의 추가적인 작업이 필요함을 의미하는 상태 코드들입니다.

- `301 Moved Permanently` : 리소스의 위치가 바뀌었음을 나타냅니다. 보통 이런 상태 코드가 있는 리스폰스의 헤드에는 Location이라는 헤더도 일반적으로 함께 포함되어 있습니다. 그리고 그 헤더의 값으로 리소스에 접근할 수 있는 새 URL이 담겨있는데요. 대부분의 브라우저는 만약 GET 리퀘스트를 보냈는데 이런 상태 코드가 담긴 리스폰스를 받게 되면, 헤드에 포함된 Location 헤더의 값을 읽고, 자동으로 그 새 URL에 다시 리퀘스트를 보내는 동작(리다이렉션, redirection)을 수행합니다.
- `302 Found` : 리소스의 위치가 일시적으로 바뀌었음을 나타냅니다. 이 말은 지금 당장은 아니지만 나중에는 현재 요청한 URL이 정상적으로 인식될 것이라는 뜻입니다. 이 상태 코드의 경우에도 보통 그 리스폰스의 헤드에 Location 헤더가 있고, 여기에 해당 리소스의 임시 URL 값이 있습니다. 이 경우에도 대부분의 브라우저들은 임시 URL로 리다이렉션합니다.
- `304 Not Modified` : 브라우저들은 보통 한번 리스폰스로 받았던 이미지 같은 리소스들을 그대로 내부에 저장하고 있습니다. 그리고 서버는 해당 리소스가 바뀌지 않았다면, 리스폰스에 그 리소스를 보내지 않고 304번 상태 코드만 헤드에 담아서 보냄으로써 '네트워크 비용'을 절약하고 브라우저가 저장된 리소스를 재활용하도록 하는데요. 사실 이 상태 코드는 웹에서 '캐시(cache)'라는 주제에 대해서 공부해야 정확하게 이해할 수 있습니다. 당장 배울 내용은 아니니까 넘어갈게요. 혹시 관심이 있는 분들은 이 [링크](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)를 참조하세요.

**(4) 400번대**

리퀘스트를 보내는 클라이언트 쪽에 문제가 있음을 의미하는 상태 코드들입니다.

- `400 Bad Request` : 말그대로 리퀘스트에 문제가 있음을 나타냅니다. 리퀘스트 내부 내용의 문법에 오류가 존재하는 등의 이유로 인해 발생합니다.
- `401 Unauthorized` : 아직 신원이 확인되지 않은(unauthenticated) 사용자로부터 온 리퀘스트를 처리할 수 없다는 뜻입니다.
- `403 Forbidden` : 사용자의 신원은 확인되었지만 해당 리소스에 대한 접근 권한이 없는 사용자라서 리퀘스트를 처리할 수 없다는 뜻입니다.
- `404 Not Found` : 해당 URL이 나타내는 리소스를 찾을 수 없다는 뜻입니다. 보통 이런 상태 코드가 담긴 리스폰스는 그 바디에 관련 웹 페이지를 이루는 코드를 포함하고 있는 경우가 많습니다. 예를 들어, 다음과 같이

![image](https://user-images.githubusercontent.com/105469077/200973363-f30e8e50-5904-4352-b3f6-33705f419148.png)

https://www.google.com/abc와 같이 존재하지 않는 URL에 접속하려고 하면 이런 페이지가 보이는 것을 알 수 있습니다.

- `405 Method Not Allowed` : 해당 리소스에 대해서 요구한 처리는 허용되지 않는다는 뜻입니다. 만약 어떤 서버의 이미지 파일을 누구나 조회할 수는 있지만 아무나 삭제할 수는 없다고 해봅시다. GET 리퀘스트는 허용되지만, DELETE 메소드는 허용되지 않는 상황인 건데요. 그런데 만약 그 이미지에 대한 DELETE 리퀘스트를 보낸다면 이런 상태 코드를 보게될 수도 있습니다.
- `413 Payload Too Large` : 현재 리퀘스트의 바디에 들어있는 데이터의 용량이 지나치게 커서 서버가 거부한다는 뜻입니다.
- `429 Too Many Requests` : 일정 시간 동안 클라이언트가 지나치게 많은 리퀘스트를 보냈다는 뜻입니다. 서버는 수많은 클라이언트들의 리퀘스트를 정상적으로 처리해야 하기 때문에 특정 클라이언트에게만 특혜를 줄 수는 없습니다. 따라서 지나치게 리퀘스트를 많이 보내는 클라이언트에게는 이런 상태 코드를 담은 리스폰스를 보낼 수도 있습니다.

**(5) 500번대**

서버 쪽의 문제로 인해 리퀘스트를 정상적으로 처리할 수 없음을 의미하는 상태 코드들입니다.

- 500 Internal Server Error : 현재 알 수 없는 서버 내의 에러로 인해 리퀘스트를 처리할 수 없다는 뜻입니다.
- 503 Service Unavailable : 현재 서버 점검 중이거나, 트래픽 폭주 등으로 인해 서비스를 제공할 수 없다는 뜻입니다.

자, 각 번호대의 주요 상태 코드들을 알아봤는데요. 정말 다양한 상태 코드들이 있죠? 이 상태 코드들만 깊게 공부해도 웹 개발에 필요한 많은 지식들을 쌓을 수 있습니다. 혹시 또다른 상태 코드들도 궁금한 분들은 여기 [이 페이지](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)를 참조하세요.

이 상태 코드들도 '모범적인 Web API, REST API' 노트에서 배웠던 'Web API 설계' 시에 결정되어야 하는 요소들입니다. 리퀘스트에 관한 URL과 메소드 종류 뿐만 아니라 리스폰스의 상태 코드 또한 각각의 상황에 알맞은 것들이 설정되도록 설계해야 하는데요. 사실 모든 상황을 세분화해서 매번 거기에 맞는 상태 코드를 넣는 것은 불필요한 작업이 될 수도 있긴 합니다. 그래서 보통은 꼭 사용할 상태 코드들만 추린 다음에 특정 유형의 상황들은 모두 하나의 상태 코드로 나타내는 전략이 주로 활용되는데요.

하지만 그렇다고 해서 서버가 리퀘스트를 잘 처리했든, 실패했든 상태 코드로 항상 200번을 보내버린다거나 하는 것은 매우 좋지 않습니다. 가장 이상적인 것은 존재하는 상태 코드를 최대한 많이 활용하는 것입니다.

</div>
</details>

## Content-Type이란?

### 1. Content-Type 헤더

Content-Type 헤더는 현재 리퀘스트 또는 리스폰스의 바디에 들어 있는 `데이터가 어떤 타입`인지를 나타냅니다.

Content-Type 헤더의 값은 '`주 타입(main type)/서브 타입(sub type)`'의 형식


1. 주 타입이 text인 경우(텍스트)

- 일반 텍스트 : text/plain
- CSS 코드 : text/css
- HTML 코드 : text/html
- JavaScript 코드 : text/javascript ...

2. 주 타입이 image인 경우(이미지)

- image/bmp : bmp 이미지
- image/gif : gif 이미지
- image/png : png 이미지 ...

3. 주 타입이 audio인 경우(오디오)

- audio/mp4 : mp4 오디오
- audio/ogg : ogg 오디오 ...

4. 주 타입이 video인 경우(비디오)

- video/mp4 : mp4 비디오
- video/H264 : H264 비디오 ...


5. 주 타입이 application인 경우

- application/json : JSON 데이터
- application/octet-stream : 확인되지 않은 바이너리 파일 ...

마지막으로 application/octet-stream이라고 하는 값도 보이는데요. '확인되지 않은 바이너리 파일'이라는 게 뭘까요? 일단 '바이너리 파일'이 뭔지를 알아야 할 것 같은데요. 컴퓨터에서는 모든 파일이 0과 1의 조합으로 이루어져 있다는 사실은 이미 아시죠? 하지만 이때 그 0과 1의 조합이 우리가 읽을 수 있는 텍스트로 변환 가능한 경우도 있고, 그렇지 않은 경우도 있습니다. 그렇지 않은 경우의 예로는 이미지 파일이나 비디오 파일 등이 있습니다. 이렇게 `텍스트 파일 이외의 파일들을 보통 바이너리 파일(binary file)`이라고 하는데요. 이 바이너리 파일들 중에서도 특정 확장자(.png, .mp4 등)의 포맷에 해당하지 않는 데이터들을 보통 이렇게 application/octet-stream으로 나타냅니다. 참고로 브라우저는 리스폰스의 Content-Type 헤더의 값으로 application/octet-stream이 쓰여 있으면 보통, 사용자에게 '다운로드 받으시겠습니까'와 같은 alert 창을 띄웁니다.

그런데 Content-Type 헤더는 왜 필요한 걸까요?`Content-Type 헤더가 존재하면, 바디의 데이터를 직접 확인해서 그 타입을 추론하지 않아도 되기 때문`입니다. 

>따라서 리퀘스트든, 리스폰스든 바디에 어떤 데이터가 존재하는 경우라면 이 Content-Type 헤더의 값을 적절하게 설정해주는 게 좋습니다.
{: .prompt-tip}

### 2. Content-Type 설정해보기