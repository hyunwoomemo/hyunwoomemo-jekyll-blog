---
layout: single
title: "React-가위바위보-배점"
categories: practice
tag: [event]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

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

## 문제

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
