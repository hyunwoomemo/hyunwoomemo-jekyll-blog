---
layout: single
title: "React-가위바위보"
categories: practice
tag: [JSX]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 가위바위보-간단 버전

## 실습과제

앞으로 만들 가위바위보 게임을 간단히 JSX 버전으로 만들어 봅시다.

우선 아래 HTML 코드를 JSX로 옮겨 볼 건데요,

`root` 아이디를 가진 `div` 태그 바로 안에 `h1` , `button` 태그가 배치되도록 해주세요.

```html
<h1 id="title">가위바위보</h1>
<button class="hand">가위</button>
<button class="hand">바위</button>
<button class="hand">보</button>
```

### 문제

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

# 가위바위보-HandIcon

## 실습과제

이번 실습에서는 앞에서 만들었던 HandIcon 컴포넌트에다 Props 를 적용해봅시다.

Prop 의 값에 따라 가위, 바위, 보 이미지를 보여줄 건데요.

아래를 참고해서 `HandIcon.js` 에 컴포넌트를 작성해주세요.

- HandIcon 컴포넌트에는 value 라는 prop 이 있습니다.
- img 태그의 src 속성은 value 의 값에 따라 다음과 같이 지정해주세요.
  - 'rock' 인 경우 rockImg 를 보여줍니다.
  - 'scissor' 인 경우 scissorImg 를 보여줍니다.
  - 'paper' 인 경우 paperImg 를 보여줍니다.
- img 태그의 alt 속성은 value 값으로 지정해주세요.

![image](https://user-images.githubusercontent.com/105469077/199498470-ceb87720-11c8-4660-a2c4-be50b525cf00.png)

### 문제

**App.js**

```javascript

import HandIcon from './HandIcon';

function App() {
  return (
    <div>
      <HandIcon value="rock" />
      <HandIcon value="scissor" />
      <HandIcon value="paper" />
    </div>
  );
}

export default App;

```

**HandIcon.js**

```javascript

import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';

function HandIcon() {
  return <img src={rockImg} alt="rock" />;
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

import HandIcon from './HandIcon';

function App() {
  return (
    <div>
      <HandIcon value="rock" />
      <HandIcon value="scissor" />
      <HandIcon value="paper" />
    </div>
  );
}

export default App;

```

**HandIcon.js**

```javascript

import rockImg from './assets/rock.svg';
import scissorImg from './assets/scissor.svg';
import paperImg from './assets/paper.svg';

const IMAGE = {
  rock : rockImg,
  scissor : scissorImg,
  paper: paperImg
}

function HandIcon({ value }) {
  const src = IMAGE[value];
  return <img src={src} alt={value} />;
}

export default HandIcon;

```

</div>
</details>

# 가위바위보-HandButton

## 실습과제

앞에서 만든 `HandIcon` 컴포넌트를 활용해 가위바위보 버튼을 만들어봅시다.

아이콘이 그려진 버튼을 클릭하면 콘솔에 각각 rock, scissor, paper 가 출력되는 버튼인데요,

아래를 참고해서 HandButton.js 파일을 수정해주세요.

1. HandButton 컴포넌트의 button 태그 안에 HandIcon 컴포넌트를 배치합니다.
2. HandButton 의 value prop을 HandIcon 의 prop으로 넘겨줍니다.
3. button 을 클릭했을 때 handleClick 함수가 실행되도록 이벤트 핸들러를 추가합니다.

### 문제

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

# 가위바위보-초기화버튼

## 실습과제

이번 실습에선 children prop을 사용해볼 건데요,

주어진 코드에서 Button 컴포넌트는 아래처럼 name prop으로 텍스트를 보여주고 있습니다.

이걸 children prop을 사용하도록 Button.js 파일을 수정해주세요.

```javascript

<Button name="처음부터" onClick={handleClearClick} />

```

### 문제

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

# 가위바위보-패고르기

## 실습과제

이번 실습에서는 패 고르기 기능을 만들어 봅시다.

버튼을 눌러 가위바위보 패를 내고, 랜덤한 상대방 패를 만들어 결과를 출력해 볼 건데요.

아래를 참고해서 `App.js` 파일에 state를 사용하는 코드를 작성해주세요.

**state 추가하기**

- `hand`, `otherHand` 변수를 state 로 바꾸어 주세요.
- `hand`, `otherHand` state의 초깃값은 `'rock'` 으로 합니다.

**state 값 변경하기**

- `handleButtonClick` 함수에서
  - `hand` state 의 값을 `nextHand` 로 바꿉니다
  - `otherHand` state 의 값을 `generateRandomHand()` 의 리턴 값으로 바꿉니다.
- `handleClearClick` 함수에서
  - `hand` state 와 otherH`and state 의 값을 `'rock'` 으로 변경합니다.

**실행 결과**

![image](https://user-images.githubusercontent.com/105469077/199903674-83052c0e-083c-44ba-b527-eb4a9892e4d4.png)

```javascript

<Button name="처음부터" onClick={handleClearClick} />

```

### 문제

**App.js**

```javascript

import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  // hand와 otherHand를 state로 바꾸어 주세요
  const hand = 'rock';
  const otherHand = 'scissor';

  const handleButtonClick = (nextHand) => {
    // hand의 값을 nextHand 로 바꿔주세요
    // otherHand의 값을 generateRandomHand()의 리턴 값으로 바꿔주세요
  };

  const handleClearClick = () => {
    // hand와 otherHand의 값을 'rock' 으로 변경해주세요
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <p>{getResult(hand, otherHand)}</p>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**App.js**

```javascript

import React, { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  // hand와 otherHand를 state로 바꾸어 주세요
  const [hand, setHand] = useState('rock');
  const [otherHand, setOtherHand] = useState('rock');

  const handleButtonClick = (nextHand) => {
    setHand(nextHand);
    setOtherHand(generateRandomHand());
  };

  const handleClearClick = () => {
    setHand('rock');
    setOtherHand('rock');
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <p>{getResult(hand, otherHand)}</p>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

</div>
</details>

# 가위바위보-승부 기록

## 실습과제

주어진 `getResult` 함수를 사용해서 `승리`, `패배`, `무승부`에 해당하는 승부 결과를 만들 수 있었는데요.

이번 레슨에서는 이걸 누적해서 보여주는 승부 기록을 만들어 봅시다.

아래를 참고해서 `App.js` 파일을 수정해주세요.

- `handleButtonClick` 함수에서 `gameHistory` state에 `nextHistoryItem` 을 새 요소로 추가해주세요.
- `handleClearClick` 함수에서는 `gameHistory` 를 빈 배열로 변경합니다.

**실행 결과**

![image](https://user-images.githubusercontent.com/105469077/199934556-4f0a34c7-eb1a-43f0-8b30-86f9076985c8.png)

### 문제

**App.js**

```javascript

import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    // gameHistory에 nextHistoryItem 을 추가해주세요
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    // gameHistory를 비워주세요
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <p>승부 기록: {gameHistory.join(', ')}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**App.js**

```javascript

import React, { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  // hand와 otherHand를 state로 바꾸어 주세요
  const [hand, setHand] = useState('rock');
  const [otherHand, setOtherHand] = useState('rock');

  const handleButtonClick = (nextHand) => {
    setHand(nextHand);
    setOtherHand(generateRandomHand());
  };

  const handleClearClick = () => {
    setHand('rock');
    setOtherHand('rock');
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <p>{getResult(hand, otherHand)}</p>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

</div>
</details>

# 가위바위보-배점

## 실습과제

이번엔 배점 기능을 한번 구현해보겠습니다.

원하는 숫자로 배점을 정하면, 게임이 진행될 때마다 이긴 쪽이 해당하는 점수를 얻는 기능인데요.

`input` 태그로 배점을 정하고 이것에 따라 점수에 반영하려고 합니다.

여기서 리액트에서 특별한 prop을 하나 사용해 보도록 하겠습니다.

**onChange**

바로 `input` 태그의 `onChange` 라는 prop입니다.

이전에 자바스크립트로 `input` 을 다루는 방법을 공부하셨다면, 입력값이 변경될 때마다 이벤트를 받으려면 `oninput` 이벤트 핸들러 함수로 처리한다는 걸 배웠을 겁니다.

하지만 리액트에서는 `onChange` 라는 prop을 사용해서 처리합니다. 동작은 `oninput` 이벤트 핸들러이지만 `onChange` 으로 사용하는 건데요.

의미상으로도 좀 더 직관적이죠? 이와 관련된 내용은 아래 링크를 참고하시면 자세히 살펴보실 수 있을 겁니다.

[리액트 공식 문서 - DOM 엘리먼트](https://ko.reactjs.org/docs/dom-elements.html#onchange)

### 문제

이번 실습에서는 `App.js` 파일에서 `handleBetChange` 핸들러 함수를 구현할 건데요.

이벤트에서 얻어 온 값을 `bet` 스테이트의 값으로 변경해주세요.

그리고 이 함수를 배점 `input` 의 `onChange` 핸들러로 추가해봅시다.

## (옵션) 생각해 볼 문제

`number` 타입의 `input` 을 사용하더라도 반드시 1과 9 사이의 정수만 전달되는 게 아닙니다. 키보드로 입력하면 알파벳 같은 문자나 소수점을 입력할 수 있는데요, 이벤트 핸들러 함수에서 값을 관찰하면서 `bet` state의 값이 반드시 1과 9 사이의 정수가 되도록 만들어 보세요.

**실행 결과**

![image](https://user-images.githubusercontent.com/105469077/200010874-5d8a2b7c-beb4-489b-8ef0-84d5cc95d6c6.png)

**App.js**

```javascript

import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    // 여기에 코드를 작성하세요
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div>
        {score} : {otherScore}
      </div>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <input type="number" value={bet} min={1} max={9}></input>
      </div>
      <p>승부 기록: {gameHistory.join(', ')}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

### 정답

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

**App.js**

```javascript

import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import { compareHand, generateRandomHand } from './utils';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    // 여기에 코드를 작성하세요
    let num = Number(e.target.value);
    num > 9 ? num %= 10 : num < 1 ? num = 1 : num;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div>
        {score} : {otherScore}
      </div>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <div>
        <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
      </div>
      <p>승부 기록: {gameHistory.join(', ')}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;

```

</div>
</details>

# HandButton 클래스네임 적용

## 실습과제

HandButton 컴포넌트에 CSS 파일로 스타일을 지정해봅시다.

아래를 참고해서 HandButton 컴포넌트와 HandIcon 컴포넌트를 수정해주세요.

- HandButton 컴포넌트
 - HandButton.css 파일을 불러옵니다
 - button에 'HandButton' 클래스를 적용해주세요.
 - HandIcon 에 'HandButton-icon' 클래스를 적용해주세요.
- HandIcon 컴포넌트
  - className prop을 추가하고, 이 prop을 img 태그에 적용합니다.


**실행 결과**

마우스를 올렸을 때 아래처럼 버튼의 색이 바뀝니다.

![image](https://user-images.githubusercontent.com/105469077/200160866-52cb7118-9a2c-429e-a887-a2a8c3c0cf33.png)

**HandButton.js**

```javascript

import HandIcon from './HandIcon';

// CSS 파일로 스타일을 적용해주세요
function HandButton({ value, onClick }) {
  const handleClick = () => onClick(value);
  return (
    <button onClick={handleClick}>
      <HandIcon value={value} />
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

// className prop을 추가하고, img 태그에 적용해주세요
function HandIcon({ value }) {
  const src = IMAGES[value];
  return <img src={src} alt={value} />;
}

export default HandIcon;

```

### 과제 해설

<details>
<summary>코드 보기</summary>
<div markdown='1'>
<hr/>

우선 `import` 로 CSS 파일을 불러옵니다.

그리고 버튼과 `HandIcon` 에 클래스를 지정해줄게요.

**HandButton.js**

```javascript

import HandIcon from './HandIcon';
import './HandButton.css';

function HandButton({ value, onClick }) {
  const handleClick = () => onClick(value);
  return (
    <button className="HandButton" onClick={handleClick}>
      <HandIcon className="HandButton-icon" value={value} />
    </button>
  );
}

export default HandButton;

```

`HandIcon` 컴포넌트에서는 부모로부터 받은 클래스네임을 이미지 태그에 적용해야 하니까,

`className` prop을 받아서 아래처럼 적용해줍니다.

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

function HandIcon({ className, value }) {
  const src = IMAGES[value];
  return <img className={className} src={src} alt={value} />;
}

export default HandIcon;

```

</div>
</details>
