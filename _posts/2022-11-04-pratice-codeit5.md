---
layout: single
title: "React-가위바위보-초기화버튼"
categories: practice
tag: [component]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

이번 실습에선 children prop을 사용해볼 건데요,

주어진 코드에서 Button 컴포넌트는 아래처럼 name prop으로 텍스트를 보여주고 있습니다.

이걸 children prop을 사용하도록 Button.js 파일을 수정해주세요.

```javascript

<Button name="처음부터" onClick={handleClearClick} />

```

## 문제

**App.js**

```javascript

import Button from './Button';
import HandButton from './HandButton';

function App() {
  const handleButtonClick = (value) => console.log(value);
  const handleClearClick = () => console.log('처음부터');
  return (
    <div>
      <Button name="처음부터" onClick={handleClearClick} />
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;


```

**Button.js**

```javascript

function Button({ name, onClick }) {
  return <button onClick={onClick}>{name}</button>;
}

export default Button;


```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**App.js**

```javascript

import Button from './Button';
import HandButton from './HandButton';

function App() {
  const handleButtonClick = (value) => console.log(value);
  const handleClearClick = () => console.log('처음부터');
  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;

```

**Button.js**

```javascript

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;

```

</div>
</details>



