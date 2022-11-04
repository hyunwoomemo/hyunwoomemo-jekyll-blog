---
layout: single
title: "React-가위바위보-승부 기록"
categories: practice
tag: [state]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

주어진 `getResult` 함수를 사용해서 `승리`, `패배`, `무승부`에 해당하는 승부 결과를 만들 수 있었는데요.

이번 레슨에서는 이걸 누적해서 보여주는 승부 기록을 만들어 봅시다.

아래를 참고해서 `App.js` 파일을 수정해주세요.

- `handleButtonClick` 함수에서 `gameHistory` state에 `nextHistoryItem` 을 새 요소로 추가해주세요.
- `handleClearClick` 함수에서는 `gameHistory` 를 빈 배열로 변경합니다.

**실행 결과**

![image](https://user-images.githubusercontent.com/105469077/199934556-4f0a34c7-eb1a-43f0-8b30-86f9076985c8.png)

## 문제

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



