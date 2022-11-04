---
layout: single
title: "React-가위바위보-간단 버전(1)"
categories: practice
tag: [JSX]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

앞으로 만들 가위바위보 게임을 간단히 JSX 버전으로 만들어 봅시다.

우선 아래 HTML 코드를 JSX로 옮겨 볼 건데요,

`root` 아이디를 가진 `div` 태그 바로 안에 `h1` , `button` 태그가 배치되도록 해주세요.

```html
<h1 id="title">가위바위보</h1>
<button class="hand">가위</button>
<button class="hand">바위</button>
<button class="hand">보</button>
```

## 문제

**index.js**

```javascript

import ReactDOM from "react-dom";

ReactDOM.render(<h1>코드를 수정해주세요</h1>, document.getElementById("root"));

```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**index.js**

```javascript

import ReactDOM from "react-dom";

ReactDOM.render(
  <div id="root">
    <h1 id='title'>가위바위보</h1>
    <button className='hand'>가위</button>
    <button className='hand'>바위</button>
    <button className='hand'>보</button>
  </div>,
  document.getElementById("root")
);

```

</div>
</details>



