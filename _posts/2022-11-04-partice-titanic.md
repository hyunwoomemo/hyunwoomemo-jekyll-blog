---
layout: single
title: "React-axios-hooks"
categories: parctice
tag: [axios]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
last_modified_at: 2022-11-04
---

# Axoios-Hooks

![image](https://user-images.githubusercontent.com/105469077/199882673-23170a9c-bc47-4d49-92d9-d2a7a7cf8526.png)

![React_App_—_Mozilla_Firefox_2022-11-04_12-48-53_AdobeExpress(1)](https://user-images.githubusercontent.com/105469077/199882352-3b142048-4fa5-461c-b2c8-c9521c809fb7.gif)


## App.js

```javascript

import React from 'react';
import Titanic from './pages/Titanic';

function App() {
  return (
    <div>
      <h1>11-Axoios-Hooks</h1>
      <Titanic />
    </div>
  );
};

export default React.memo(App);

```

## pages

<details>
<summary>폴더</summary>
<div markdown='1'>
<hr/>
**Titanic.js**

``` javascript

import React, { memo } from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import Table from '../components/Table';

// Axios 기능 제공 hook
import useAxios from 'axios-hooks';

// 페이지의 마운트 여부를 확인하기 위한 hook
import useMountedRef from '../hooks/useMountedRef';

/** 성별을 표시하기 위한 텍스트 라벨 */
const ColorText = styled.span`
  &:before {
    color: ${({sex}) => sex === 'male' ? '#06f' : '#c0c'};
    content: "${({sex}) => sex === 'male' ? '남자' : '여자'}";
    font-weight: 600;
  }
`;

/** 탑승지를 표시하기 위한 텍스트 라벨 */
const EmbarkedBox = styled.span`
  &:before {
    color: ${({embarked}) => embarked === 'C' ? '#f60' : (embarked === 'Q' ? '#00f' : '#990')};
    content: "${({embarked}) => embarked === 'C' ? '셰르부르' : (embarked === 'Q' ? '퀸즈타운' : '사우샘프턴')}";
    font-weight: 600;
  }
`;

/** 생존여부를 표시하기 위한 텍스트 라벨 */
const SurvivedBox = styled.span`
  &:before {
    background-color: ${({survived}) => survived ? '#090' : '#e00'};
    content: '${({survived}) => survived ? '생존' : '사망'}';
    color: #fff;
    font-weight: 600;
  }
`;

/** 드롭다운을 배치하기 위한 박스 */
const SelectContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin: 0;

  select {
    margin-left: 15px;
    font-size: 16px;
    padding: 5px 10px;
  }
`;

// 접속할 백엔드의 URL
const URL = 'http://localhost:3001/titanic';


const Titanic = memo(() => {
  // 탑승객 명단 목록을 Ajax로 가져온다.
  // --> 기본적으로 컴포넌트의 마운트와 동시에 자동 실행되어 응답 결과를 data에 저장한다.
  const [{ data, loading, error }, refetch] = useAxios(URL);
  // 각 드롭다운의 선택 상태를 저장하기 위한 상태 변수
  const [state, setState] = React.useState({
    sex: '',
    embarked: '',
    survived:''
  });
  // 이 컴포넌트가 화면에 마운트 되었는지를 확인하기 위한 hook
  const mountedRef = useMountedRef();

  /** 드롭다운 선택 변경시 호출되는 이벤트 */
  const onSelectChange = React.useCallback(e => {
    e.preventDefault();

    // 드롭다운의 입력값 취득
    const current = e.target;
    const key = current.name;
    const value = current[current.selectedIndex].value;

    // 기존의 상태값을 그대로 복사한 상태에서
    // 드롭다운의 name속성과 일치하는 key에 대한 value를 수정
    const newState = {...state, [key]: value};

    // 상태값 갱신
    setState(newState);

    // 갱신된 상태값 확인
    console.log(newState);

    // hook 함수 안에서 다른 상태값을 사용할 경우 해당 상태값을 모니터링 해야 한다.
  }, [state]); 

  /** state 상태값이 변경되었을 때 실행될 hook */
  React.useEffect(() => {
    // 컴포넌트가 화면에 마운트 된 이후에만 동작하도록 한다.
    if (mountedRef.current) {
      // 상태값 중에서 빈값이 아닌 항목들을 옮겨담는다.
      const params = {};
      for (const key in state) {
        if (state[key]) {
          params[key] = state[key];
        }
      }

      // Ajax 재요청
      refetch({
        params: params
      });
    }
    // hook 함수 안에서 다른 상태값을 사용할 경우 해당 상태값을 모니터링 해야 한다.
  }, [mountedRef, refetch, state]);


  /** 에러가 발생했다면 에러 메시지를 표시한다 */
  if (error) {
    console.error(error);

    // 컴포넌트 자체가 함수이고, 함수가 실행 도중 리턴을 하므로
    // 이 내용을 화면에 표시하고 컴포넌트의 실행은 중단된다.
    return (
      <div>
        <h1>Oops~!!! {error.code} Error.</h1>
        <hr />
        <p>{error.message}</p>
      </div>
    )
  }

  /** 메인 화면 구성 */
  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading} />

      {/* 검색 조건 드롭다운 박스 */}
      <SelectContainer>
        <select name='sex' onChange={onSelectChange}>
          <option value="">-- 성별 선택 --</option>
          <option value="male">남자</option>
          <option value="female">여자</option>
        </select>

        <select name='embarked' onChange={onSelectChange}>
          <option value="">-- 탑승지 선택 --</option>
          <option value="C">셰르브루</option>
          <option value="Q">퀸즈타운</option>
          <option value="S">사우샘프턴</option>
        </select>

        <select name="survived" onChange={onSelectChange}>
          <option value="">-- 생존 여부 선택 --</option>
          <option value="true">생존</option>
          <option value="false">사망</option>
        </select>
      </SelectContainer>

      <Table>
        <thead>
          <tr>
            <th>승객번호</th>
            <th>승객이름</th>
            <th>성별</th>
            <th>나이</th>
            <th>동승자 수</th>
            <th>객실등급</th>
            <th>방 호수</th>
            <th>티켓번호</th>
            <th>요금</th>
            <th>탑승지</th>
            <th>생존여부</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(({
            id, name, survived, pclass, sex, age, sibsp, parch, ticket, fare, cabin, embarked}, i) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td><ColorText sex={sex} /></td>
                  <td>{age}</td>
                  <td>{sibsp + parch}</td>
                  <td>{pclass}등석</td>
                  <td>{cabin}</td>
                  <td>{ticket}</td>
                  <td>{fare}</td>
                  <td><EmbarkedBox embarked={embarked} /></td>
                  <td><SurvivedBox survived={survived} /></td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </div>
  );
});

export default Titanic;

```

</div>
</details>

## hooks

<details>
<summary>폴더</summary>
<div markdown='1'>
<hr/>

**useMountedRef.js**

```javascript

import React from 'react';

/** 페이지 로딩이 완료되었음을 감지하기 위한 커스텀 훅 */
const useMountedRef = () => {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true;
    });
  }, []);

  return mountedRef;
};

export default useMountedRef;

```


</div>
</details>

## components

<details>
<summary>폴더</summary>
<div markdown='1'>
<hr/>

**MenuLink.js**

```javascript

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

/** 메뉴링크 --> NavLink: 현재 머물고 있는 페이지와 관련된 링크에 CSS 적용 */
const MenuLinkContainer = styled(NavLink)`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
  padding-bottom: 2px;
  color: #222;

  /* CSS의 가상클래서 hover */
  &:hover {
    color: #22b8cf;
  }

  &:after {
    content: '|';
    display: inline-block;
    padding: 0 7px;
    color: #ccc;
  }

  &:last-child {
    &:after {
      /* 글라색을 흰색으로 지정하여 화면에서 숨긴다. */
      color: #fff;
    }
  }

  /* 
    URL이 현재 메뉴를 가르키는 경우 (콜론이 아닌 점에 주의)
    활성 메뉴에 적용되는 기본 클래스 이름이 'active'이다.
  */

  &.active {
    text-decoration: underline;
    color: #22b8cf;

    &:after {
      /* 흰색 선을 추가하여 .active에서 지정한 border를 덮을 수 있도록 지정한다. (가림효과) */
      border-bottom: 4px solid #fff !important;
    }
  }
`;

const MenuLink = ({to, children}) => <MenuLinkContainer to={to}>{children}</MenuLinkContainer>;

export default MenuLink;

```
<hr/>

**Spinner.js**

```javascript

import React, { memo } from 'react';
import PropTypes from 'prop-types';

// 로딩바 컴포넌트
// --> https://mhnpd.github.io/react-loader-spinner/
import { Blocks } from 'react-loader-spinner';

const Spinner = memo(({loading,  width, height}) => {
  return (
    <Blocks
      visible={loading}
      height={width}
      width={height}
      ariaLabel="blocks-loading"
      wrapperStyle={{
        position: 'absolute',
        zIndex: 9999,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      wrapperClass='blocks-wrapper'
    />
  );
});

/** 기본값 정의 */
Spinner.defaultProps = {
  visible: false,
  width: 100,
  height: 100,
};

/** 데이터 타입 설정 */
Spinner.propTypes = {
  visible: PropTypes.bool.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Spinner;

```
<hr/>

**Table.js**

```javascript

import styled from 'styled-components';

/** 표에 CSS를 적용한 styledComponent */
const Table = styled.table`
  border-collapse: collapse;
  border-top: 3px solid #168;
  font-size: 14px;
  text-align: center;
  margin: auto;
  width: 100%;

  th {
    color: #168;
    background: #f0f6f9;
    padding: 10px;
    border: 1px solid #ddd;

    &:first-child {
      border-left: 0;
    }

    &:last-child {
      border-right: 0;
    }
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;

    &:first-child {
      border-left: 0;
    }

    &:last-child {
      border-right: 0;
    }
  }
`;

export default Table;

```

</div>
</details>