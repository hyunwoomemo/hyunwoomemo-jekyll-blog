---
layout: single
title: "React-가위바위보-HandButton"
categories: practice
tag: [component]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

앞에서 만든 `HandIcon` 컴포넌트를 활용해 가위바위보 버튼을 만들어봅시다.

아이콘이 그려진 버튼을 클릭하면 콘솔에 각각 rock, scissor, paper 가 출력되는 버튼인데요,

아래를 참고해서 HandButton.js 파일을 수정해주세요.

1. HandButton 컴포넌트의 button 태그 안에 HandIcon 컴포넌트를 배치합니다.
2. HandButton 의 value prop을 HandIcon 의 prop으로 넘겨줍니다.
3. button 을 클릭했을 때 handleClick 함수가 실행되도록 이벤트 핸들러를 추가합니다.

## 문제

**App.js**

```javascript

import HandButton from './HandButton';

function App() {
  const handleClick = (value) => console.log(value);
  return (
    <div>
      <HandButton value="rock" onClick={handleClick} />
      <HandButton value="scissor" onClick={handleClick} />
      <HandButton value="paper" onClick={handleClick} />
    </div>
  );
}

export default App;

```

**HandButton.js**

```javascript

function HandButton({ value, onClick }) {
  const handleClick = () => onClick(value);
  return <button>여기에 HandIcon을 배치해주세요</button>;
}

export default HandButton;


```

**HandIcon.js**

```javascript

import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

function HandIcon({ value }) {
  const src = IMAGES[value];
  return <img src={src} alt={value} />;
}

export default HandIcon;

```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**App.js**

```javascript

import HandButton from './HandButton';

function App() {
  const handleClick = (value) => console.log(value);
  return (
    <div>
      <HandButton value="rock" onClick={handleClick} />
      <HandButton value="scissor" onClick={handleClick} />
      <HandButton value="paper" onClick={handleClick} />
    </div>
  );
}

export default App;

```

**HandButton.js**

```javascript

function HandButton({ value, onClick }) {
  const handleClick = () => onClick(value);
  return (
    <button onClick={handleClick}>
      <HandIcon value={value}/>
    </button>
    );
}

export default HandButton;

```

**HandIcon.js**

```javascript

import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

function HandIcon({ value }) {
  const src = IMAGES[value];
  return <img src={src} alt={value} />;
}

export default HandIcon;

```

</div>
</details>



