---
layout: single
title: "React Practice"
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

- [ ] useState의 lazy initialize