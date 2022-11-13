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

```javascript

const newMember = {
  name: 'Jerry',
  email: 'jerry@codeit.kr',
  department: 'engineering',
};

fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  headers: { // 추가된 부분
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newMember),
})
  .then((response) => response.text())
  .then((result) => { console.log(result); });

```

이 코드를 개발자 도구에서 실행해보면

![image](https://user-images.githubusercontent.com/105469077/201504933-1ff91f5f-630c-475c-8448-df0c4b4fd358.png)

이렇게 리퀘스트의 헤더들 중에서 제가 설정한 Content-Type 헤더가 잘 보입니다.

![image](https://user-images.githubusercontent.com/105469077/201504948-9616b1a7-42c8-4b50-87a1-609bcd402810.png)

## 그 밖에 알아야 할 내용들

### Ajax

초창기의 웹은 특정 웹 페이지에서 다른 웹 페이지로 갈 수 있는 링크(공식 명칭은 hyperlink입니다)를 클릭하면 새로운 웹 페이지가 로드되는 방식이었습니다. 오늘날에도 당연히 쓰이고 있는 방식인데요.

하지만 화면의 일부분만 바뀌면 되는 경우에도 매번 새 페이지가 로드되는 방식은 효율적이지도 않고 사용자에게도 그다지 좋지 않은 경험을 안겨주었습니다. 그래서 2000년대 초부터는 웹의 이런 단점을 극복하기 위해서 Ajax라는 기술이 도입되었습니다. 
Ajax는 웹 브라우저가 현재 페이지를 그대로 유지한 채로 서버에 리퀘스트를 보내고 리스폰스를 받아서, 새로운 페이지를 로드하지 않고도 변화를 줄 수 있게 해주는 기술입니다.

Ajax는 `Asynchronous JavaScript And XML`의 줄임말인데요. 이는 자바스크립트를 사용해서 비동기적으로(=사용자가 보고 있는 현재 화면에 영향을 미치지 않고 별도로 백그라운드에서 작업을 처리한다는 뜻) 리퀘스트를 보내고 리스폰스를 받는데 기반이 되는 기술들의 집합을 의미합니다. 여기서 마지막에 XML이 쓰인 것은 Ajax라는 용어가 생겨난 당시에 XML이 가장 많은 인기를 누리던 데이터 타입이었기 때문입니다. 오늘날에는 XML 말고 JSON도 꽤 많이 쓰이고 있긴 하지만요.

자, 어쨌든 지금 중요한 것은 Ajax의 원리를 이해하는 것입니다. Ajax의 원리는 여러분이 흔히 쓰는 구글 맵(Google Map) 같은 웹 서비스를 생각해보면 이해하기 쉽습니다. 구글 맵 웹 페이지를 예로 들어볼게요.

![image](https://user-images.githubusercontent.com/105469077/201505702-9f2484c4-b11d-4fc8-b026-879c096aa6eb.png)

제가 지금 구글 맵에서 서울특별시 중구 을지로 쪽을 보다가 '명동 성당'의 정보가 보고 싶어졌다고 해봅시다. 그럼 명동 성당 아이콘을 클릭하면 되겠죠? 이렇게 명동 성당을 클릭했을 때, 초창기의 웹이었다면 아예 새로운 페이지를 로드해야 했을 겁니다. 하지만 오늘날 우리가 쓰는 구글 맵이 그렇지는 않죠? 실제로 명동 성당 아이콘을 클릭해보면

![image](https://user-images.githubusercontent.com/105469077/201505708-a5b5a44a-8e7e-4f53-824d-de887fb8fa35.png)

현재 웹 페이지는 그대로 유지되고, 단지 그 밑에 명동 성당에 관한 간단한 정보창이 떠오를 뿐입니다. 이것이 가능한 이유는 웹 브라우저가, 사용자가 보고 있는 현재 페이지를 방해하지 않고 별도로 서버로 리퀘스트를 보내고, 리스폰스를 받아왔기 때문입니다.

만약 이런 Ajax 기술이 없었다고 생각해보세요. 우리는 웹 서비스를 사용할 때마다 별로 크게 바뀌지도 않는 화면을 매번 로드하는 불편함을 느꼈을 겁니다. 하지만 Ajax 기술 덕분에 구글 맵처럼 부드러운 UX(User Experience, 사용자 경험)를 제공하는 수많은 웹 서비스들을 사용할 수 있게 된 겁니다.

그럼 자바스크립트로는 어떻게 이 Ajax 기술을 사용해서 리퀘스트를 보내고 리스폰스를 받을 수 있을까요? 앞으로는 Ajax 기술을 기반으로 한 통신을 그냥 짧게 줄여서 'Ajax 통신'이라고 할게요.

자바스크립트에서는 `XMLHttpRequest`라고 하는 객체를 통해 Ajax 통신을 할 수 있습니다. XMLHttpRequest를 사용하는 예시 코드는 다음과 같은데요.

```javascript

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://learn.codeit.kr/api/members');
xhr.onload = function () {
  console.log(xhr.response);
};
xhr.onerror = function () {
  alert('Error!');
};
xhr.send();

```

지금 가장 첫 번째 줄의 코드에 XMLHttpRequest라고 하는 생성자 함수로 객체를 생성한 것 보이시죠? 이런 식의 코드를 작성하면 Ajax 통신을 할 수 있습니다. 궁금한 분들은 이 코드를 개발자 도구에 붙여넣고 직접 실행해보세요.

그런데 예전엔 XMLHttpRequest를 이렇게 직접 사용할 일이 많았지만 요즘에는 굳이 그렇게 하지 않아도 됩니다.(2020년 1월 기준) 
그 이유에는 크게 두 가지가 있는데요.

첫 번째 이유는 XMLHttpRequest 객체 이후에 등장한 함수, 바로 이때까지 `우리가 배운 fetch 함수를 사용해서 Ajax 통신을 할 수 있기 때문입니다.` 이때까지 배운 fetch 함수가 Ajax 통신을 하는 함수였다니 놀랍죠? fetch 함수는 XMLHttpRequest 객체를 사용할 때에 비해 좀 더 짧고 간단한 코드로 Ajax 통신을 할 수 있게 해주는 함수입니다. 그래서 많은 개발자들의 환영을 받았죠.

두 번째 이유는 XMLHttpRequest을 기반으로 더 쓰기 편하게 만들어진 `axios라는 패키지가 존재하기 때문`입니다. (자바스크립트에서는 라이브러리보다는 '패키지'라는 단어를 더 일상적으로 사용하기 때문에 '패키지'라고 표현하겠습니다.)

이런 이유들 때문에 굳이 XMLHttpRequest 객체를 직접 가져다 쓸 필요성이 줄어든 것입니다.

`개발 실무에서는 fetch 함수 또는 axios 패키지를 사용`하는데요. 보통 axios 패키지에 좀더 다양한 기능들이 있어서 주로 axios를 쓰는 편이지만, 외부의 패키지를 설치하고 싶지 않은 경우에는 fetch 함수를 사용하기도 합니다. 그리고 일단 fetch 함수의 원리에 대해서 알아야 axios도 잘 사용할 수 있기 때문에 이번 토픽에서는 fetch 함수를 중심으로 내용을 진행하고 있는 겁니다. fetch 함수의 어떤 원리를 알아야하는지에 대해서는 챕터 3부터 알아봅시다.

자, 다시 원래의 이야기로 내용을 마무리하겠습니다. 앞으로 웹 개발을 할 때는 Ajax 통신인 것과 Ajax 통신이 아닌 것을 구분할 수 있어야 합니다. 일단 Ajax 통신이 아닌 것은 이런 태그를 사용자가 클릭하도록 해서

```html
<a href="https://learn.codeit.kr/api/main">메인 화면으로 가기</a>
```

웹에서의 전통적인 방식처럼 새 페이지를 로드하게 하는 방식이고, Ajax 통신인 것은

```javascript
// (위 예시를 단순화한 코드입니다)
function getLocationInfo(latitude, longitude) {
  fetch('https://map.google.com/location/info?lat=latitude&lng=longitude')
    .then((response) => response.text())
    .then((result) => { /* 사용자 화면에 해당 위치 관련 정보 띄워주기 */ });
}
```

이런 식으로 사용자가 느낄 수 없게, 리퀘스트를 보내고 리스폰스를 받아 현재 페이지에 원하는 변화를 주는 방식이죠.

사용자 경험을 고려해서

(1) 언제 아예 새로운 페이지를 로드하고
(2) 언제 Ajax 통신을 해서 현재 페이지 내에서 부드러운 변화를 줄 건지를

잘 결정하는 것은 중요합니다.

양쪽 모두 공부해둬야 필요한 순간에 코드로 잘 구현해낼 수 있겠죠? 일단 이때까지 배운 `fetch 함수가 사실은 Ajax 통신을 하는 함수였다는 사실만큼은 꼭 기억합시다!`

### GET, POST, PUT, DELETE 이외의 메소드들

#### PATCH

PATCH 메소드는 기존의 데이터를 수정할 때 사용하는 메소드

`PUT`은 기존 데이터를 `아예 새로운 데이터로 덮어씀`으로써 수정 / `PATCH`는 새 데이터로 `기존 데이터의 일부를 수정`

#### HEAD

메소드에는 HEAD 메소드라는 것도 있습니다. HEAD 메소드는 GET 메소드와 동일합니다. 대신 GET 리퀘스트를 보냈을 때 받았을 리스폰스에서 바디 부분은 제외하고, 딱 헤드 부분만 받는다는 점이 다른데요. 왜 이런 메소드가 필요할까요? 

예를 들어, 웹 브라우저가 서버로부터 용량이 엄청나게 큰 영상 파일을 받고자 하는 상황이라고 해봅시다. 

만약 파일의 용량이 너무 큰 경우에는 파일을 받지 않으려고 하는데요. 

이때 파일의 용량만 조사하기 위해서 HEAD 메소드가 담긴 리퀘스트를 보내볼 수 있습니다. 

만약 https://movie.net/matrix (영화 '매트릭스') 라는 URL이 있다고 할 때 해당 URL로 HEAD 메소드가 설정된 리퀘스트를 보내면 그 리스폰스는 바디는 없고 헤드만 있을 겁니다. 

대신 이때 `Content-length와 같이 컨텐츠 용량을 나타내는 헤더가 있어서 파일의 용량 정보는 알게 될 수도 있는데요.` 그럼 이 용량을 사용자에게 보여주고 그래도 영화 파일을 시청할 건지 물어보는 코드를 작성할 수 있겠죠? 

바로 이렇게 실제 데이터가 아니라 데이터에 관한 정보만 얻으려고 하는 상황 등에 HEAD 메소드가 활용됩니다.