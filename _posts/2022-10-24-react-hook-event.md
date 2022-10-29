---
layout: single
title: "React hook-event"
categories: react
tag: [hook]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# Hook event

## 01. 리액트 이벤트 시스템

#### 용어 정리

##### **a) 이벤트**

프로그램이 겪는 일련의 사건.

사용자가 프로그램에 대해 행하는 어떠한 행위를 포함한다.

##### **b) 이벤트 리스너**

이벤트가 발생할 때를 대기하고 있는 구현체.
웹에서는 HTML 태그에서 명시하는 이벤트 속성이 이에 해당한다.

```html
<a onclick='...'>
```

##### **c) 이벤트 핸들러**

이벤트가 발생한 순간 그에 반응하도록 구현된 코드나 함수 (또는 클래스)


#### 리액트에서 이벤트 구현시 주의점

1. 이벤트 리스터의 이름은 HTML속성이 아닌 JSX에 의한 자바스크립트 프로퍼티이므로 카멜 표기법으로 작성.
  - onclick (x)
  - onClick (o)
2. 이벤트 리스터에 전달할 이벤트 핸들러는 코드 형태가 아니라 반드시 `함수 형태`로 전달해야 한다.
3. DOM 요소 (=HTML 태그)에만 이벤트 리스너가 존재한다.
  - 직접 구현한 컴포넌트에 대해서는 설정 불가

* * *
## 02. Hooks

함수형 컴포넌트에서 상태값(state)를 관리하기 위한 기능으로 클래스형 컴포넌트의 LifeCycle에 대응된다.

> React v16.8부터 새로 추가되었음.

쉽게 이야기 하면 아래의 항목들은 특정 상황에서 자동으로 호출되는 함수들을 의미함.

### 1) 상태변수의 이해
<!-- ![상태변수의 이해](../img/a.png) -->

### 2) 기본 Hook 함수들

#### **a) useState**

##### State : **`컴포넌트의 상태`**

>useState는 state를 **간편하게 생성하고 업데이트** 해주는 기능을 제공
{: .prompt-info}

```javascript
const [state, setState] = useState(초기값);
```

![image](https://user-images.githubusercontent.com/105469077/198813496-919ff037-0aca-48e2-be93-d475f7839407.png)

- 가장 기본적인 Hook 함수
- 함수형 컴포넌트에서 state값을 생성한다.
- 하나의 useState 함수는 하나의 상태 값만 관리할 수 있다.
- 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러번 사용하면 된다.


> 아래 코드처럼 useState의 `초기값으로 무거운 작업을 실행해야한다면 초기값에 콜백`을 넣어준다.
> 그러면 최초의 화면에 렌더링 될 때만 무거운 작업 함수가 불려지게 된다.


```javascript
const heavyWork = () => {
  return ( ... );
};

// 무거운 작업이 렌더링 될 때마다 실행
const App = () => {
  const [names, setNames] = useState(heavyWork());
}

// 무거운 작업이 맨 처음 화면에 렌더링 될 때만 실행
const App = () => {
  const [names, setNames] = useState(() => {
    return heavyWork();
  });
}
```

<details>
<summary>🔍 useState 예시</summary>
<div markdown="1">       

```javascript
import React from 'react'

const MyState = () => {
  /** 
   * state(상태)값 정의
   * - 이 페이지 안에서 유효한 전역변수 같은 개념.
   * - const [변수이름, 변수에 대한 setter함수] = React.useState(변수의 기본값);
   * - state값은 직접 변경할 수 없고 반드시 setter를 통해서만 변경 가능하다.
   * - useState() 함수에 전달하는 값은 state값에 대한 초기값이다.
   */
  const [myName, setMyName] = React.useState('');
  const [myPoint, setMyPoint] = React.useState(50);

  /** 이벤트 핸들러로 사용될 함수는 컴포넌트 함수 안에서 정의된다. */
  const onMyNameChange = e => {
    // e.currentTarget은 jQuery의 $(this)에 해당함.
    // 즉, 이벤트가 발생한 자신 (여기서는 input태그)
    setMyName(e.currentTarget.value);
  };

  // 상태값이 변경될 때마다 컴포넌트 함수는 매번 재실행된다.
  // 그러므로 컴포넌트 영역은 상태값의 변경에 따라 반복적으로 다시 렌더링 된다.
  // --> 결국 아래의 출력문은 상태값이 변경될 때마다 반복 출력된다.
  console.log(new Date());


  return (
    <div>
      <h2>MyState</h2>

      {/* state값을 출력할 때는 단순히 변수값으로서 사용한다. */}
      <h3>{myName}님의 점수는 {myPoint}점 입니다.</h3>

      <hr />

      <div>
        <label htmlFor="myNameInput">이름: </label>
        <input id='myNameInput' type="text" value={myName} onChange={onMyNameChange} />
      </div>

      <div>
        <label htmlFor="myPointInput">점수: </label>
        <input
          id='myPointInput' 
          type="range" 
          min='0'
          max='100'
          value={myPoint} 
          step='1'
          //이벤트 핸들러를 익명 화살표 함수 형식으로 정의한 경우
          onChange={e => {
            // 자기 스스로의 입력값을 myName이라는 state값에 반영함
            setMyPoint(e.currentTarget.value);
          }} 
          />
      </div>
    </div>
  );
};

export default MyState;
```

</div>
</details>


#### **b) useEffect**

![image](https://user-images.githubusercontent.com/105469077/198814275-53367a1e-0f7d-41a0-bd77-a117e79b5aab.png)

Mount, Update, Unmount 될 때 특정 작업을 실행시키고 싶다면 `useEffect`를 사용

`useEffect`는 기본적으로 렌더링 직후마다 실행되며,
두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

> 클래스 컴포넌트의 **componentDidMount**와 **componentDidUpdate**를 합친 형태

`useEffect`는 기본적으로 인자로 콜백 함수를 받는다.

```javascript
useEffect(() => { 작업 ... })
```

##### useEffect의 **두가지 형태**

1️⃣ 렌더릴 될 때마다 실행
```javascript
useEffecct(() => {
  작업...
});
```

최초 등장하거나 state값이 변경될 때 모두 실행 된다.

2️⃣ 화면에 첫 렌더링 될 때 실행 / value 값이 바뀔 때 실행
```javascript
useEffect(() => {
  작업...
}, [value]);
```

`업데이트시에는 생략되는 함수 정의`

컴포넌트가 마운트될 때 최초 1회만 실행 (state값이 변경될 때는 실행되지 않음)
```javascript
useEffect(() => {
  ... 처리할 코드 ...
}, []);
```


`특정 state, props값이 변경될 때만 호출되도록 설정하기`

```javascript
useEffect(() => {
  ... 처리할 코드 ...
}, [값이름]);
```

<details>
<summary>🔍 useEffect 예시</summary>
<div markdown="1">       

```javascript
import React from 'react';

import ponyo from '../assets/img/ponyo.png';

const MyEffect = () => {
  // 이미지의 밝기를 위한 상태값
  const [myBrightness, setBrightness] = React.useState(100);

  // 브라우저의 넓이를 의미하는 상태값
  const [myWidth, setMyWidth] = React.useState(window.innerWidth);

  // 사용자 정의 함수.
  const onMyResize = () => {
    console.log(`창 사이즈 변경됨 >> ${window.innerWidth}`);
    setMyWidth(window.innerWidth);
  }

  /** 이 컴포넌트가 화면에 막 등장함과 동시에 1회 실행됨 */
  React.useEffect(() => {
    console.clear();
    console.log('[MyEffect1] %s ::: 화면에 컴포넌트가 처음 로드될 때 처리되어야 할 기능', new Date());
    window.addEventListener('resize', onMyResize);
    return () => {
      console.log('화면에서 벗어남');
      window.removeEventListener('resize', onMyResize)
    };
  }, []);

  /** 이 컴포넌트가 화면에 막 등장할 때와 state, props값이 변경될 때마다 매번 실행됨 */
  React.useEffect(() => {
    console.log('[MyEffect2] %s ::: 화면에 컴포넌트가 처음 로드되거나 state, props 중 하나라도 변경될 경우 호출됨', new Date());
  });

  /** 이 컴포넌트가 화면에 막 등장할 때와 특정 state, props값이 변경될 때만 실행됨 */
  React.useEffect(() => {
    console.log('[MyEffect4] %s ::: myBrightness값이 변경됨', new Date());
  }, [myBrightness]);

  /** state값이 변경되어 화면이 다시 렌더링되거나 화면 이동 등의 이유로 이 컴포넌트가 사라질 때 실행됨 */
  React.useEffect(() => {
    return () => {
      console.log('[MyEffect3] %s ::: 이 컴포넌트가 화면에서 사라지기 직전에 처리되어야 할 기능', new Date());
    };
  });

  return (
    <div>
      <h2>MyEffect</h2>

      <h3>Window Width: {myWidth}</h3>

      <div>
        <input 
        type="range" 
        min='0'
        max='200'
        step='1'
        value={myBrightness}
        onChange={(e) => {
          setBrightness(e.currentTarget.value);
        }}
        />
      </div>

      <img 
        alt='Hello React'
        src={ponyo}
        width='480'
        style={{
          filter: 'brightness(' + myBrightness + '%)'
        }}
      />
    </div>

  )
}

export default MyEffect;
```

</div>
</details>

##### Clean Up (정리)

useEffect의 리턴값으로 함수를 넣어준다. (클로저를 명시)

`컴포넌트가 언마운트(화면에서 사라짐) 될 때 혹은 다음 렌더링 시 불릴 useEffect가 실행되기 이전에 실행`

```javascript
useEffect(() => { 
  // 구독...
  return () => { 
    // 구독 해지 ...
  };
}, []);
```


<details>
<summary>Clean Up 예시</summary>
<div markdown='1'>

# App.js

```javascript
import React, { useState, useEffect } from 'react';
import Timer from './component/Timer';


const App = () => {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div>
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
    </div>
  );
}

export default App;
```

# Timer.js

```javascript

import React, { useEffect } from 'react'

const Timer = () => {

  useEffect(() => {
    const timer = setInterval(() => { // Timer 컴포넌트가 처음 화면에 그렸을 때 timer를 실행
      console.log('타이머 돌아가는중...')
    }, 1000);

    return () => { // Timer 컴포넌트가 언마운트될 때 실행
      clearInterval(timer);
      console.log('타이머가 종료되었습니다.');
    };
  }, []);

  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요!</span>
    </div>
  )
}

export default Timer;
```

</div>
</details>

#### c) useContenxt
거의 사용되지 않음.

### 3) 특정한 경우에 사용되는 기능들

#### **a) useRef**

![image](https://user-images.githubusercontent.com/105469077/198828228-2d2a537f-47b8-4e97-8118-a5f97d147d2c.png)

ref Object는 수정이 가능하기 때문에 언제든지 변경 가능

![image](https://user-images.githubusercontent.com/105469077/198828271-e47e5312-1182-429f-b58d-955a42889d1b.png)

##### useRef가 유용한 대표적인 상황 2가지

###### 1. 저장공간

State의 변화 -> 렌더링 -> 컴포넌트 내부 변수들 초기화

Ref의 변화 -> No 렌더링 -> 변수들의 값이 유지됨

state 대신 `ref 사용시 불필요한 렌더링을 막을 수 있다.`

state의 변화 -> 렌더링 -> 그래도 Ref의 값은 유지됨

>그러므로 **변경 시 렌더링을 발생시키지 말아야하는 값을 다룰 때 편리**함
{: .prompt-tip}

<details>
<summary>useRef와 useState의 차이(렌더링 유무)</summary>
<div markdown='1'>

```javascript
import React, { useState, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  console.log(countRef); // countRef.current

  console.log('렌더링...');

  const increaseCountState = () => {
    setCount(count + 1);
  };

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref: ', countRef.current);
  }

  return (
    <div>
      <p>State: {count}</p>
      <p>Ref: {countRef.current}</p>
      <button onClick={increaseCountState}>State 올려</button>
      <button onClick={increaseCountRef}>Ref 올려</button>
    </div>
  );
};

export default App;

```

</div>
</details>

---




###### 2. DOM 요소에 접근

![image](https://user-images.githubusercontent.com/105469077/198828672-184ed880-5701-4b71-9bdb-348b4a0ff143.png)

대표적으로 input 요소를 클릭하지 않아도 focus를 주고 싶을 때 사용

<details>
<summary>변수와 ref의 차이점</summary>
<div markdown='1'>

```javascript
import React, { useState, useRef } from 'react';

function App() {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  const doRendering = () => {
    setRenderer(renderer + 1);
  }

  const increaseRef = () => {
    countRef.current += 1;
    console.log('ref:', countRef.current);
  }

  const increaseVar = () => {
    countVar += 1;
    console.log('Var:', countVar);
  }

  const printResult = () => {
    console.log(`ref: ${countRef.current}, var: ${countVar}`);
  }

  return (
    <div>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={doRendering}>렌더!</button>
      <button onClick={increaseRef}>Ref 올려</button>
      <button onClick={increaseVar}>Var 올려</button>
      <button onClick={printResult}>Ref Var 값 출력</button>
    </div>
  );
};

export default App;

```

</div>
</details>

---

함수형 컴포넌트에서 ref를 쉽게 사용할 수 있도록 처리해 준다.

Vanilla Script에서 `document.getElementById(...)`나 `document.querySelector(...)`로 DOM 객체를 취득하는 과정을 React 스타일로 표현한 것으로 이해할 수 있다.

<details>
<summary>🔍 useRef 예시</summary>
<div markdown='1'>

```javascript
import React from 'react';
import MyBox from '../components/MyBox';

/**
 * React에서 document.getElementById(...)에 해당하는 기능을 사용하는 방법
 */


const MyRef = () => {
  // HTML 태그를 react안에서 참조할 수 있는 변수를 생성
  const myDname = React.useRef();
  const myLoc = React.useRef();
  const myResult = React.useRef();

  // 컴포넌트에 설정하기 위한 ref
  const myBoxRef = React.useRef();

  // 화면에 출력되지 않은 상태변수를 생성할 수 있다.
  // useRef()함수에 전달하는 파라미터가 상태변수의 기본값이 된다.
  const myValue = React.useRef(0);

  // 컴포넌트가 다시 렌더링되었음을 확인하기 위한 시간 출력
  console.log(new Date());

  return (
    <div>
      <h2>MyRef</h2>

      <h3>ref 기본 사용 방법</h3>

      {/* 미리 준비한 컴포넌트 참조변수와 HTML 태그를 연결 */}
      <div>
        <label htmlFor="dname">학과명 : </label>
        <input type="text" ref={myDname} id="dname" />
      </div>

      <div>
        <label htmlFor="dname">학과위치 : </label>
        <input type="text" ref={myLoc} id="loc" />
      </div>

      <p>
        입력값 확인: <span ref={myResult}></span>
      </p>
      

      <button onClick={e => {
        // 컴포넌트 참조변수를 사용해서 다른 HTML 태그에 접근 가능
        // --> "참조변수.current" 해당 HTML 을 의마하는 Javascript DOM 객체
        // --> myDname.current와 document.querySelector(...), document.getElementById(...) 등으로 생성한 객체가 동일한 DOM 객체이다.
        console.log(myDname);
        console.log(myLoc);

        const dname = myDname.current.value;
        const loc = myLoc.current.value;

        myResult.current.innerHTML = dname + ',' + loc;

      }}>클릭</button>

      <button onClick={e => {
        // 이 변수는 갱신되더라도 컴포넌트 함수를 다시 실행시키지 않는다.
        myValue.current++;
        console.log(`myValue=${myValue}`);
      }}>Ref 상태변수 갱신</button>

      <hr />

      <h3>컴포넌트에 ref 적용하기</h3>

      {/* ref 참조변수를 컴포넌트에 전달 */}

      <MyBox ref={myBoxRef} />

      <button type='button' onClick={() => {
        // <MyBox>를 통해 myBoxRef를 주입받은 DOM에 접근하여 제어함
        myBoxRef.current.style.backgroundColor = '#f00';
      }}>Red</button>

      <button type='button' onClick={() => {
        // <MyBox>를 통해 myBoxRef를 주입받은 DOM에 접근하여 제어함
        myBoxRef.current.style.backgroundColor = '#00f';
      }}>Blue</button>
    </div>
  )
}

export default MyRef;
```

</div>
</details>

#### **b) useReducer**

useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 하고자 하는 경우 사용.

useState의 대체 함수로 이해할 수 있다.

state값이 다수의 하위값을 포함하거나 이를 활용하는 복잡한 로직을 만드는 경우에 useState보다 useReducer를 선호한다.

<details>
<summary>🔍 useReducer 예시</summary>
<div markdown='1'>

```javascript
import React from 'react';

/**
 * useReduce에 의해 호출될 사용자 정의 함수
 * --> action값이 oo일 때 state값을 ~~해라.
 * --> action값의 DataType은 개발자가 결정할 수 있다. (int, string, boolean, json ...)
 * --> state값의 DataType 역시 개발자가 결정할 수 있다. (int, string, boolean, json ...)
 * @param {int} state - 상태값 (useState의 state값과 동일)
 * @param {string} action - 어떤 동작인지에 대한 구분
 */

function setCounterValue(state, action) {
  console.log("[%o] %o", action, state);
  // action값의 상태에 따른 state 값의 가공 처리를 분기
  switch (action) {
    case 'HELLO':
      return state + 1;
    case 'WORLD':
      return state - 1;
    default:
      return 0;
  }
}

const MyReducer = () => {
  const [myCounter, setMyCounter] = React.useReducer(setCounterValue, 0);

  return (
    <div>
      <h2>MyReducer</h2>
      <p>현재 카운트 값: {myCounter}</p>
      <button type='button' onClick={e => setMyCounter('HELLO')}>UP</button>
      <button type='button' onClick={e => setMyCounter('WORLD')}>DOWN</button>
      <button type='button' onClick={e => setMyCounter('')}>RESET</button>
    </div>
  );
};

export default MyReducer;
```

</div>
</details>

#### **c) useMemo**

함수형 컴포넌트 내에서의 연산 최적화.

숫자, 문자열, 객체처럼 일반 값을 재사용하고자 할 경우 사용한다.

> **memorized 된 값을 반환한다** : 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술

<details>
<summary>🔍 useMemo 예시</summary>
<div markdown='1'>

```javascript
import React from 'react';
import dayjs from 'dayjs';

const MyMemo = () => {
  const day = dayjs();

  // 파라미터로 전달되는 단어의 길이를 반환하는 함수 --> 처리 비용이 매우 큰 함수를 가정함
  const getLength = w => {
    console.log('getLength(%s) 호출됨! :::: %s', w, day.format('YY/MM/DD hh:mm:ss.ms'));
    return w.length;
  };

  // 처리할 단어들
  const words = ['City', 'Eye', 'Apple', 'Apple', 'Orange'];

  // 버튼이 눌러진 횟수
  const [myCount, setMyCount] = React.useState(0);

  // 배열의 탐색 위치
  const [myIndex, setMyIndex] = React.useState(0);

  // 출력할 글자
  const [myWord, setMyWord] = React.useState(words[myIndex]);

  /** A(myWord)라는 상태값이 변경된 경우 B(myLen)라는 상태값도 갱신하는 처리 */
  // myWord를 모니터링하여 이 값이 변경되었을 때 그에 대한 효과로 myLen이라는 상태값을 업데이트하려는 상황.
  // 1) 출력할 글자의 길이를 상태값으로 정의
  // const [myLen, setMyLen] = React.useState(myWord.length);

  // 2) 미리 준비한 상태값이 변경될 수 있는 Effect Hook을 정의
  // React.useEffect(() => {
  //   setMyLen(getLength(myWord));
  // }, [myWord]);

  /** (1) + (2)에 대한 통합 기능 */
  // 두 번째 파라미터인 배열에 설정된 state값이 이전 상태와 다를 경우에만 콜백을 실행한다.
  // 콜백의 결과가 저장되는 myLen은 일반 상태값과 동일하게 사용할 수 있다.
  // 즉, myWord가 변경될 때만 콜백이 리턴하는 값을 활용하여 myLen을 갱신한다.
  const myLen = React.useMemo(() => {
    return getLength(myWord);
  }, [myWord]);

  return (
    <div>
      <h2>MyMemo</h2>
      <p>
        {myIndex}번째 단어 "{myWord}"의 길이: {myLen}
      </p>
      <button
        onClick={() => {
          const next = (myIndex + 1) % words.length;
          setMyIndex(next);
          setMyCount(myCount + 1);
          setMyWord(words[next]);
        }}>
        버튼 클릭
      </button>
    </div>
  )
}

export default MyMemo;
```

</div>
</details>

#### **d) useCallBack**

렌더링 성능 최적화에 사용됨.

이벤트 핸들러 함수를 필요한 경우에만 생성할 수 있다.

> **memorized 된 콜백을 반환한다.**

<details>
<summary>🔍 useCallback 예시</summary>
<div markdown='1'>

```javascript
import React from 'react'

const MyCallback = () => {
  const [myText, setMyText] = React.useState('Hello React');
  
  // 컴포넌트가 최초 렌더링될 때 1회만 이벤트 핸들러 함수를 정의하고 이후 부터는 계속적으로 재사용된다.
  // 만약 두 번째 파라미터인 배열에 특정 state값을 지정할 경우 해당 값이 수정될 때만 이벤트가 정의된다.
  // --> 이벤트 핸들러의 중복 정의를 방지해서 성능 향상을 꾀함.
  const onInpurtChange = React.useCallback ((e) => {
    setMyText(e.currentTarget.value);
  }, []);

  return (
    <div>
      <h2>MyCallback</h2>
      <h3>{myText}</h3>
      <input type="text" placeholder='input...' onChange={onInpurtChange} />
    </div>
  );
};

export default MyCallback;
```
</div>
</details>

### 내가 원하는 Hook 만들기

- hook은 상태값을 리턴한다.
- 상태값을 관리하는 모듈 === custom hook

<details>
<summary>🔍 MyHook</summary>
<div markdown='1'>

```javascript
import React from 'react';

/**
 * 사용자 정의 함수.
 * useState와 useEffect를 하나의 함수로 묶는 용도로 정의함.
 */
const useMyWidth = () => {
  // 브라우저의 넓이를 의미하는 상태값
  const [myWidth, setMyWidth] = React.useState(window.innerWidth);

  // 사용자 정의 함수
  const onMyResize = () => setMyWidth(window.innerWidth);

  // 페이지 로드시에 이벤트 정의, 페이지 종료시에 이벤트 해제
  React.useEffect(() => {
    window.addEventListener('resize', onMyResize);
    return () => window.removeEventListener('resize', onMyResize);
  }, []);

  // 마지막에 상태값을 리턴한다.
  return myWidth;
};

export default useMyWidth;
```
</div>
</details>

<details>
<summary>🔍 MyWidth (custom hook) </summary>
<div markdown='1'>

```javascript 
import React from 'react';
import useMyWidth from '../hooks/MyHook';

const MyWidth = () => {
  const myWidth = useMyWidth();

  return (
    <div>
      <h2>MyState</h2>
      <h3>windowWidth: {myWidth}</h3>
    </div>
  );
};

export default MyWidth;
```
</div>
</details>


### Hook 사용시 주의 사항

1. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행할 수 없다.
2. React Component 내에서만 호출할 수 있다.

