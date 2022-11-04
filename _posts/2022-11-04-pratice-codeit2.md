---
layout: single
title: "React-가위바위보-HandIcon(2)"
categories: practice
tag: [Props]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

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

## 문제

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



