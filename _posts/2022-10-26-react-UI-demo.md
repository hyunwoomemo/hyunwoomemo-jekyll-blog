---
layout: single
title: "React UI-demo"
categories: practice
tag: [UI]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# UI Demo

## Thumbnail 이미지

![image](https://user-images.githubusercontent.com/85672236/198413779-8a4cbc88-2809-471a-a767-27aac53c3f69.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
import React, { memo } from 'react';
import styled from "styled-components";

import img01 from '../assets/img/img01.jpg';
import img02 from '../assets/img/img02.jpg';
import img03 from '../assets/img/img03.jpg';
import img04 from '../assets/img/img04.jpg';
import img05 from '../assets/img/img05.jpg';

/** 썸네일 리스트에 대한 StyledComponent */
const ThumbList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 640px;
  margin: auto;
  display: flex;

  &:after {
    float: none;
    clear: both;
    content: '';
    display: block;
  }

  li {
    width: 20%;

    a {
      display: block;
      margin: 10px;

      img {
        width: 100%;
      }
    }
  }
`;

/** 이미지 뷰어 영역에 대한 StyledComponent */
const Viewer = styled.div`
  width: 620px;
  margin: auto;
  padding: 0 10px;

  img {
    width: 100%;
  }
`;

// 썸네일로 표시할 이미지와 제목에 대한 JSON 배열
const imgList = [
  {img: img01, title: '테스트 이미지 1'}, 
  {img: img02, title: '테스트 이미지 2'},
  {img: img03, title: '테스트 이미지 3'},
  {img: img04, title: '테스트 이미지 4'},
  {img: img05, title: '테스트 이미지 5'},
]

const ImageEx = memo(() => {
  
  // 현재 표시 중인 이미지의 인덱스 번호를 의미하는 상태값
  const [currentIndex, setCurrentIndex] = React.useState(0);
  

  /** 썸네일 이미지에 대한 클릭 이벤트 핸들러 */
  const onThumbnailClick = (e) => {
    // 클릭된 링크의 주소값 --> #0, #1, #2, #3, #4
    const href = e.currentTarget.getAttribute('href');
    // 추출한 href로부터 #을 제거하고 숫자만 추출
    const idx = parseInt(href.substring(1));
    // 상태값 갱신
    setCurrentIndex(idx);
  };

  // currentIndex 값이 변경되었을 때에 대한 후속 처리
  const {img: currentImg, title: currentTitle} = React.useMemo(() => {
    return imgList[currentIndex];
  }, [currentIndex])
  


  return (
    <div>
      <h2>ImageEx</h2>

      {/* 썸네일 리스트 표시하기 */}
      <ThumbList>
        {imgList.map((v, i) => {
          return (
            <li key={i}>
              <a href={`#${i}`} title={v.title} onClick={onThumbnailClick}>
                <img src={v.img} alt={v.title} />
              </a>
            </li>
          )
        })}
      </ThumbList>

      {/* 이미지 뷰어 */}
      <Viewer>
        {/* useMemo() 를 사용하지 않은 경우 */}
        <img src={imgList[currentIndex].img} alt={imgList[currentIndex].title} />
        {/* useMemo() 를 사용하여 currentIndex가 변경되었을 때 반응하는 상태값을 활용한 경우 */}
        <img src={currentImg} alt={currentTitle} />
      </Viewer>
    </div>
  )
});


export default ImageEx;
```

</div>
</details>

## Style 선택

![image](https://user-images.githubusercontent.com/105469077/198435815-ecc688c0-5843-4657-8e49-1ca6bb31aac4.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
import React, { memo, useRef } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  &.box1 {
    border: 10px solid black;
    margin: 10px auto;
    padding: 30px;
    text-align: center;
    width: auto;
  }

  &.box2 {
    border: 10px dotted red;
    margin: 10px auto;
    padding: 50px;
    text-align: left;
    width: 50%;
  }
`;

const Button = styled.input`
  margin: 0 5px;
`;

const StyleEx = memo(() => {
  // <Box>를 제어하기 위한 참조변수
  const myBox = useRef();

  return (
    <div>
      <h2>StyleEx</h2>

      <Box className='box1' ref={myBox}>
        <h1>Hello React</h1>
      </Box>

      <Button type="button" value="(폰트) orange" onClick={e => {
        // 직접 CSS 속성 설정하기
        myBox.current.style.color = '#f60';
      }} />

      <Button type="button" value="(폰트) sky" onClick={e => {
        // setProperty 메서드를 사용하여 CSS 속성 설정하기
        myBox.current.style.setProperty('color', '#06f');
      }} />

      <Button type="button" value="(배경) yellow" onClick={e => {
        // 직접 CSS 속성을 설정할 경우 Javascript property 명으로 접근해야 한다.
        myBox.current.style.backgroundColor = '#ff0';
      }} />

      <Button type="button" value="(배경) pink" onClick={e => {
        // setProperty 메서드를 사용할 경우 원래의 CSS 속성명을 사용할 수 있다.
        myBox.current.style.setProperty('background-color', '#f0f');
      }} />

      <Button type='button' value='box1 클래스 적용' onClick={e => {
        myBox.current.classList.add('box1');
        myBox.current.classList.remove('box2');
      }} />

      <Button type='button' value='box2 클래스 적용' onClick={e => {
        myBox.current.classList.add('box2');
        myBox.current.classList.remove('box1');
      }} />

    </div>
  );
});

export default StyleEx;
```

</div>
</details>


## Tab 구현

![image](https://user-images.githubusercontent.com/105469077/198437085-338f4e66-5356-440a-84e7-bbcc9eca765b.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
import React, { memo, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

const TabContainer = styled.div`
  .tab-button-group {
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    display: flex;

    .tab-button {
      display: block;
      background-color: inherit;
      min-width: 100px;
      box-sizing: border-box;
      border: none;
      outline: none;
      padding: 14px 16px;
      font-size: 17px;
      color: #222;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      transition: 0.3s;
  
      &:hover {
        background-color: #ddd;
      }
  
      &.active {
        background-color: #ccc;
      }
    }
  }

  .tab-page {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-top: none;
  }
`;

const tabContent = [{
  id: 'newyork',
  subject: 'NewYork',
  content: 'NewYork is the capital city of US.',
}, {
  id: 'london',
  subject: 'London',
  content: 'London is the capital city of England.',
}, {
  id: 'paris',
  subject: 'Paris',
  content: 'Paris is the capital city of France.',
}, {
  id: 'seoul',
  subject: 'Seoul',
  content: 'Seoul is the capital city of Korea.',
}]

const TabEx = memo(() => {
  /** 현재 표시되고 있는 탭의 인덱스 번호 */
  const [tabIndex, setTabIndex] = useState(0);

  /** 버튼에 대한 이벤트 처리 함수 */
  const onTabButtonClick = useCallback((e) => {
    e.preventDefault();

    const current = e.currentTarget;
    const href = current.getAttribute('href');
    console.log(href);
    /**
    // 일반 상태값 갱신
    setTabIndex(tabIndex => tabContent.findIndex(e => `#${e.id}` === href));
    /*/
    // 콜백함수형 상태값 갱신 --> 상태값을 화면에 직접적으로 출력하는 경우는 사용하지 않는다.
    setTabIndex((currentValue) => {
      console.log(`변경전 상태값 ==> ${currentValue}`)
      const newValue = tabContent.findIndex(element => `#${element.id}` === href);
      console.log(`변경후 상태값 ==> ${newValue}`);
      return newValue;
    });
    /**/
  }, []);

  /** tabIndex 값이 변경된 직후 실행된다 */
  // 리턴값에 대한 구조분해를 수행한다.
  const {subject, content} = useMemo(() => {
    // tabContent의 tabIndex번째 항목을 리턴한다.
    // --> {id: ..., subject: ..., content: ...}
    return tabContent[tabIndex];
  }, [tabIndex]);

  return (
    <div>
      <h2>TabEx</h2>

      <TabContainer>
        {/* Tab버튼 그룹 */}
        <div className='tab-button-group'>
          {tabContent.map((v, i) => {

            // 조건부 className 적용하기 위한 객체 생성
            const cls = classnames({
              'tab-button' : true,
              'active' : i === tabIndex
            });

            return (
              <a key={i} className={cls} href={`#${v.id}`}
                onClick={onTabButtonClick}>{v.subject}</a>
            )
          })}
        </div>

        {/* Tab 페이지 영역 */}
        <div className='tab-page'>
          <h3>{subject}</h3>
          <p>{content}</p>
        </div>
      </TabContainer>
    </div>
  );
});

export default TabEx;
```

</div>
</details>

## Submenu 구현 

![image](https://user-images.githubusercontent.com/105469077/198440351-69dc71fb-2636-4061-856d-fcc89447590c.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript

import React, { memo, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import btn from '../assets/img/btn.png'; 
import btnOver from '../assets/img/btn_over.png';

const MenuContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  .link {
    display: block;
    width: 179px;
    height: 48px;
    background: url(${btn});
    line-height: 48px;
    text-align: center;
    font-weight: bold;
    color: #cfdfb5;
    text-decoration: none;

    &:hover {
      background: url(${btnOver});
    }
  }

  .menu-item {
    flex: 0 0;
    /* 서브메뉴의 기준점을 부모요소로 지정하기 위한 처리 */
    position: relative;

    /** 서브메뉴가 펼쳐지더라도 다른 요소들 위에 떠 있어야 하므로, Position 처리 */
    .sub {
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      z-index: 1000;
      max-height: 0;
      overflow: hidden;
      transition: max-height 180ms ease-out;
    }
  }
`;

const SubmenuEx = memo(() => {
  const onMenuItemOver = useCallback((e) => {
    const current = e.currentTarget;
    const sub = current.querySelector('.sub');
    // scrollHeight는 요소의 크기를 벗어난 만큼의 높이를 의미
    sub.style.maxHeight = sub.scrollHeight + 'px';
  }, []);

  const onMenuItemOut = useCallback((e) => {
    const current = e.currentTarget;
    const sub = current.querySelector('.sub');
    sub.style.maxHeight = null;
  }, []);

  return (
    <div>
      <h2>SubmenuEx</h2>

      <MenuContainer>
        <li className='menu-item' onMouseOver={onMenuItemOver} onMouseOut={onMenuItemOut}>
          <Link to='#' className='link'>Frontend</Link>
          <ul className='sub'>
            <li><Link to='#' className='link'>HTML+CSS</Link></li>
            <li><Link to='#' className='link'>Javascript</Link></li>
            <li><Link to='#' className='link'>jQuery</Link></li>
          </ul>
        </li>
        <li className='menu-item' onMouseOver={onMenuItemOver} onMouseOut={onMenuItemOut}>
          <Link to='#' className='link'>Backend</Link>
          <ul className='sub'>
            <li><Link to='#' className='link'>PHP</Link></li>
            <li><Link to='#' className='link'>JSP</Link></li>
            <li><Link to='#' className='link'>Node.js</Link></li>
          </ul>
        </li>
        <li className='menu-item' onMouseOver={onMenuItemOver} onMouseOut={onMenuItemOut}>
          <Link to='#' className='link'>Mobile</Link>
          <ul className='sub'>
            <li><Link to='#' className='link'>IOS</Link></li>
            <li><Link to='#' className='link'>Android</Link></li>
            <li><Link to='#' className='link'>Hybrid</Link></li>
          </ul>
        </li>
      </MenuContainer>
      {/* 페이지 컨텐츠를 가정한 요소 */}
      <h1>Hello World</h1>
    </div>
  );
});

export default SubmenuEx;
```

</div>
</details>

## Collapse 구현

![image](https://user-images.githubusercontent.com/105469077/198441424-529cfd45-b346-4eff-89d6-f11944097009.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

### Collapse.js
```javascript
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const CollapseContainer = styled.div`
  .collapse-title {
    background-color: #777;
    color: white;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    font-weight: normal;
    margin: 0;
    text-align: left;
    outline: none;
    font-size: 15px;

    &.active, &:hover {
      background-color: #555;
    }
  }

  .collapse-content {
    padding: 0 20px;
    background-color: #f1f1f1;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }
`;

const Collapse = memo(({title, content}) => {
  const onCollapseTitleClick = useCallback((e) => {
    // 클릭된 자기 자신
    const current = e.currentTarget;
    // 스스로에게 active 클래스에 대한 적용 여부 변경
    current.classList.toggle('active');

    // 제어할 대상을 탐색
    const content = current.parentElement.querySelector('.collapse-content');

    // content에 maxHeight 속성이 있다면 (혹은 0이 아니라면)
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }, []);
  return (
    <CollapseContainer>
      <h1 className='collapse-title' onClick={onCollapseTitleClick}>{title}</h1>
      <div className='collapse-content'>
        <p>{content}</p>
      </div>
    </CollapseContainer>
  )
});

export default Collapse;
```

### CollapseEx.js

```javascript
import React, { memo } from 'react';
import Collapse from '../components/Collapse';
/** 표시할 내용(데이터) */

const content = [{
  title: 'Open Collapsible',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.'
}, {
  title: 'Open Collapsible',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.'
}, {
  title: 'Open Collapsible',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.'
}, {
  title: 'Open Collapsible',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.'
}, {
  title: 'Open Collapsible',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.'
}];

const CollapseEx = memo(() => {
  return (
    <div>
      <h2>CollapseEx</h2>
      {content.map(({title, content}, i) => <Collapse key={i} title={title} content={content}/>)}
    </div>
  )
});

export default CollapseEx;
```

</div>
</details>