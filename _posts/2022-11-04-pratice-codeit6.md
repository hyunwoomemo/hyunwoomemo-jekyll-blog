---
layout: single
title: "React-가위바위보-패고르기"
categories: practice
tag: [state]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

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

## 문제

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



