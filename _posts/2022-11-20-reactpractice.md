---
layout: single
title: "React 체크박스"
categories: practice
tag: [react]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

- [x] 숫자 10까지의 숫자들 중 홀수면 h1태그로 짝수면 h3태그로

- [x] 인풋태그에 작성중일때 looking for {키워드} 검색 버튼 클릭시 결과값 표시 => 커스텀 훅 만들기: useState와 useEffect의 반복으로 커스텀 훅 필요

- [x] Object.assign(a, b)

- [x] useState(() => {}) 초기값을 함수로 전달

- [ ] useState의 특성을 이용하여 클릭시 true 와 false를 switch 하기

- [ ] hook의 호출 타이밍

<details>
<summary>예시</summary>
<div markdown='1'>

```javascript

import React from "react";

const Child = () => {
  console.log('   Child render start');
  const [text, setText] = React.useState(() => {
    console.log('   Child useState');
    return "";
  });

  React.useEffect(() => {
    console.log("   Chaild useEffect, no deps");

    return () => {
      console.log("   Chaild useEffect [Cleanup], no deps");
    }
  })

  React.useEffect(() => {
    console.log("   Chaild useEffect, empty deps");

    return () => {
      console.log("   Chaild useEffect [Cleanup], empty deps");
    }
  }, [])

  React.useEffect(() => {
    console.log("   Chaild useEffect, [text] deps");

    return () => {
      console.log("   Chaild useEffect [Cleanup], [text] deps");
    }
  }, [text])

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const element = (
  <>
    <input type="text" onChange={handleChange}/>
    <p>{text}</p>
  </>
  )
  console.log('   Child render end');
  return element;
}

const App = () => {
  console.log('APP render start');
  const [show, setShow] = React.useState(() => {
    console.log("APP useState");
    return false;
  });

  React.useEffect(() => {
    console.log("APP useEffect, empty deps");

    return () => {
      console.log("APP useEffect [Cleanup], empty deps");
    }
  }, []);

  React.useEffect(() => {
    console.log("APP useEffect, no deps");

    return () => {
      console.log("APP useEffect [Cleanup], no deps");
    }
  });
  React.useEffect(() => {
    console.log("APP useEffect, [show]");

    return () => {
      console.log("APP useEffect [Cleanup], [show] deps");
    }
  }, [show]);

  const handleClick = () => {

    setShow((prev) => !prev);
  }

  console.log('APP render end');

  const element = (
    <>
      <button onClick={handleClick}>Search</button>
      {show ? <Child /> : null}
    </>
  )
  return element;
}


export default App;

```

</div>
</details>

- [ ] Clean Up

useEffect => render가 끝난 뒤
update시 => useEffect clean up / useEffect

- [X] useState의 lazy initialize

- [X] Why useRef ? useRef / ref / current

- [X] htmlFor, defaultValue
  
- [X] 0으로 시작하는 휴대폰 번호 입력 form 만들기 / valid 표시 
  
- [ ] Error Boundary: catch error 해서 보여주기 / Fallback : error가 났을 때 보여줄 컴포넌트
  
- [ ] event.target.elements / console.dir(element)
  
- [ ] contriller / input의 value 직접 관리 
 
- [ ] todo 리스트를 간단하게 만들고 done을 누르면 삭제 restore를 누르면 삭제한거 되살리기

- [ ] onClick={() => handleDoneClick(todo)} / onClick={handleDoneClick(todo)} 와 다른 점 ?
   : 파라미터가 필요할 때는 함수형식으로 전달, 뒤에 코드는 작동 안함 ?!

- [ ] 상태 끌어올리기 / 형제 컴포넌트의 상태 궁금 / 필요하면 부모로 lifting up / Props drilling