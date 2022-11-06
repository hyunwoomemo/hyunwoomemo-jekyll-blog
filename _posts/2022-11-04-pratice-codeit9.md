---
layout: single
title: "React-HandButton 클래스네임 적용
categories: practice
tag: [className]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 실습과제

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
