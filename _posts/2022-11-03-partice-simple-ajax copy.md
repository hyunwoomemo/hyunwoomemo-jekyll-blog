---
layout: single
title: "React-simple-ajax"
categories: practice
tag: [ajax]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
last_modified_at: 2022-11-03
---

# Simple-ajax

![image](https://user-images.githubusercontent.com/105469077/199888094-b93f6e3d-4ea3-4176-a995-e5b39a3945d3.png)

![image](https://user-images.githubusercontent.com/105469077/199888128-c58db1bb-50ef-4c86-84d3-dd60c29d6b30.png)

**package.json 수정사항**

```json

  "proxy": "http://localhost:3001",
  "scripts": {
    "start": "react-scripts start | json-server --watch backend/data.json --port 3001",
  }


```

## App.js

```javascript

import React from 'react';
import MenuLink from './components/MenuLink';
import {Routes, Route} from "react-router-dom";

import News from './pages/News';
import Department from './pages/Department';

function App() {
  return (
    <div>
      <h1>React-Simple-Ajax</h1>

      <nav>
        <MenuLink to="/news">뉴스목록</MenuLink>
        <MenuLink to="/department">학과관리</MenuLink>
      </nav>

      <hr />
      
      <Routes>
        <Route path='/news' element={<News />}></Route>
        <Route path='/department' element={<Department />}></Route>
      </Routes>
    </div>
  );
}

export default App;


```

## pages

<details>
<summary>폴더</summary>
<div markdown='1'>
<hr/>

**Department.js**

```javascript

import React, { memo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const Department = memo(() => {
  //  화면에 표시할 상태값(ajax 연동 결과롤 받아올 json) --> 초기값을 빈 배열로 정의
  //  ajax처리는 비동기이므로 데이터를 받아오는 처리의 완료 여부와 상관 없이 화면 출력이 먼저 수행 된다.
  //  그러므로 Ajax의 결과를 상태값에 저장하여 데이터를 받아온 후 화면이 자동 갱신 되도록 처리해야 한다.
  const [department, setDepartment] = useState([]);
  //  현재 ajax가 데이터를 로딩중인지 의미하는 상태 값
  const [loading, setLoading] = useState(false);

  // 수정할 항목에 대한 id값을 저장하기 위한 상태값
  const [updateId, setUpdateId] = React.useState(-1);

  //QueryString으로 전달되는 검색 키워드를 받는다.
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { keyword } = Object.fromEntries(query);

  // 페이지 강제 이동을 위한 객체 생성
  const navigate = useNavigate();

  /** 페이지가 처음 열렸을 때 실행할 hook */
  //  hook에 전달되는 콜백함수에 직접적으로 async를 적용할 수 없다.
  useEffect(() => {
    //async-await 처리를 위한 즉시 실행 함수 정의
    (async () => {
      //  Ajax 로딩 시작을 알림
      setLoading(true);

      //  ajax의 결과를 저장할 변수 준비
      let json = null;

      try {
        const response = await axios.get("/department", {
          //검색어가 있다면 dname값으로 설정, 그렇지 않으면 정의 안함
          params: keyword ? { dname: keyword } : null
        });
        json = response.data;
      } catch (e) {
        console.error(e);
        alert(`데이터 요청에 실패했습니다. \n${e.message}`);
        return;
      } finally {
        //  Ajax 종료
        setLoading(loading => false);
      }
      //ajax 값 반영
      setDepartment(department => json);
    })();
  }, [keyword]);

  /** 검색폼에서의 전송 이벤트 */
  //  성능 최적화를 위해 useCallback()적용함
  const onSerachSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("submit~!!");
    //  검색어를 QueryString으로 지정하여 페이지를 이동한다.
    navigate(`/department?keyword=${e.currentTarget.keyword.value}`)
  }, [navigate]);

  /** 데이터 추가 submit 이벤트 */
  const onDataAddSubmit = useCallback((e) => {
    //  페이지 강제 이동을 차단
    e.preventDefault();

    //  이벤트가 발생한 폼 자신
    const form = e.currentTarget;

    //  폼안의 input태그에 name속성으로 접근하여 입력값 취득
    const dname = form.dname.value;
    const loc = form.loc.value;

    (async () => {
      //  Ajax로딩 시작을 알림 --> 함수형 업데이트
      setLoading(loading => true);

      //  ajax의 결과를 저장할 변수 준비
      let json = null;
      try {
        const response = await axios.post('/department', {
          //  입력값을 post 파라미터로 전달
          dname: dname,
          loc: loc
        });
        json = response.data;
        console.log(json);
      } catch (e) {
        console.error(e);
        alert(`데이터 저장 실패 \n${e.message}`);
        return;
      } finally {
        setLoading(loading => false);
      }
      setDepartment(department => department.concat(json));

      form.reset();
    })();
  },[]);

  /** 데이터 삭제 버튼 click 이벤트 */
  const onDataDeleteClick = useCallback((e) => {
    // 클릭된 자기 자신
    const current = e.currentTarget;
    // 클릭된 자신에게 숨어 있는 data-id값을 추출
    const id = parseInt(current.dataset.id);
    console.log(`삭제 대상의 id값: ${id}`);

    // 삭제 요청을 위한 Ajax 처리
    (async () => {
      // Ajax 로딩 시작을 알림 --> 함수형 업데이트
      setLoading(loading => true);

      try {
        // 삭제의 경우 Ajax의 응답 결과가 필요 없다.
        await axios.delete(`/department/${id}`);
      } catch (e) {
        console.error(e);
        alert(`데이터 삭제에 실패했습니다. \n${e.message}`);
        return;
      } finally {
        // Ajax 로딩 종료를 알림 --> 함수형 업데이트
        setLoading(loding => false);
      }

      // Ajax 삭제 처리가 완료되면 프론트엔드가 가지고 있던
      // 복사본(department 상태값)에서도 동일한 항목을 찾아 제거해야 한다.
      setDepartment(department => {
        const dropId = department.findIndex((v, i) => {
          return v.id === id;
        });
        console.log(`제거할 대상의 배열 인덱스: ${dropId}`);

        // 상태값이 배열이므로 인덱스 번호가 3인 위치에서 1개의 데이터를 제거
        department.splice(dropId, 1);

        // 제거 결과를 리턴
        return department;
      });
    })();
  }, []);

  /** 데이터 수정 버튼 click 이벤트 */
  const onDataEditClick = useCallback((e) => {
    e.preventDefault();
    // 수정할 항목에 대한 인덱스 번호를 상태값으로 설정한다.
    const current = e.currentTarget;
    const id = parseInt(current.dataset.id);
    setUpdateId(id);
  }, []);

  /** 데이터 수정사항 저장 버튼 click 이벤트 */
  const onDataEditSubmit = useCallback((e) => {
    e.preventDefault();

    // 이벤트가 발생한 <form> 요소 취득
    const current = e.target;

    // <form> 요소 내의 <input> 요소들을 name 속성값으로 접그낳여 입력값을 얻음
    const id = current.id.value;
    const dname = current.dname.value;
    const loc = current.loc.value;

    // 백엔드에 데이터가 수정되었음을 알린다.
    (async () => {
      // Ajax 로딩 시작을 알림
      setLoading(true);

      // 수정 결과에 대한 json
      let json = null;

      // Ajax를 통한 데이터 삭제 요청
      try {
/*         const response = await axios.put(`http://localhost:3001/department/${id}`,{ */
        const response = await axios.put(`/department/${id}`,{ // 프록시 걸어서 localhost 부분 생략 가능
          dname: dname,
          loc: loc
        });

        // 수정 결과에 대한 json을 받음
        json = response.data;

        console.group('데이터 수정 결과');
        console.log(json);
        console.groupEnd();
      } catch (e) {
        console.error(e);
        alert(`데이터 수정에 실패했습니다. \n${e.message}`);
        return;
      } finally {
        // Ajax 로딩 종료를 알림
        setLoading(false);
      }

      // 수정 결과로 원본 배열의 원소를 교체한다.
      setDepartment(department => {
        // 원본 상태값과 비교하여 수정된 항목의 배열 인덱스를 찾는다.
        const editId = department.findIndex((v, i) => v.id === json.id);
        console.log(`제거할 대상의 배열 인덱스: ${editId}`);

        // 상태값이 배열이므로 인덱스 번호가 editId인 위치에서 1개의 데이터를 교체
        department.splice(editId, 1, json);

        // 수정된 배열을 리턴한다.
        return department;
      });
    })();

    // 상태변수를 되돌린다.
    setUpdateId(-1);
  })

    return (
      <div>
        <Spinner loading={loading} />
        {/* 입력 폼 */}
        <form onSubmit={onDataAddSubmit}>
          <div>
            <label htmlFor="dname">학과 : </label>
            <input type="text" name='dname' id='dname' />

          </div>
          <div>
            <label htmlFor="loc">위치 : </label>
            <input type="text" name='loc' id='loc' />
          </div>
          <button type="submit">저장하기</button>
        </form>

        {/* 검색 폼 */}
        <form onSubmit={onSerachSubmit}>
          <input type="text" name="keyword" />
          <button type='submit'>검색</button>
        <table border='1'>
          <thead>
            <tr>
              <th>학과번호</th>
              <th>학과명</th>
              <th>학과위치</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {!department.length ? (
              <tr>
                <td colSpan="5" align="center">
                  검색결과 없음.
                </td>
              </tr>
            ) : (
              department.map((item, index) => {
                // 상태값에 저장되어 있는 수정할 항목의 인덱스에 해당하는 원소라면?
                if (item.id === updateId) {
                  return (
                    <tr key={item.id}>
                      {/* 수정을 위한 <input> 요소를 표시 */}
                      <input type="hidden" name='id' defaultValue={item.id} />
                      <td>{item.id}</td>
                      <td><input type="text" name='dname' defaultValue={item.dname} /></td>
                      <td><input type="text" name='loc' defaultValue={item.loc} /></td>
                      <td colSpan='2'>
                        <button type='submit'>
                          수정사항 저장
                        </button>
                      </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.dname}</td>
                      <td>{item.loc}</td>
                      <td>
                        <button type='button' data-id={item.id} onClick={onDataEditClick}>수정하기</button>
                      </td>
                      <td>
                        <button type='button' data-id={item.id} onClick={onDataDeleteClick}>삭제하기</button>
                      </td>
                    </tr>
                  )
                } // end if
              })
            )}
          </tbody>
        </table>
        </form>
      </div>
    );
  });

export default Department;

```
<hr/>

**News.js**

```javascript

import React, { memo, useState, useEffect } from 'react';
import axios from 'axios';

import NewsList from '../components/NewsList';
import Spinner from '../components/Spinner';

const News = memo(() => {
  //  화면에 표시할 상태값(ajax 연동 결과롤 받아올 json) --> 초기값을 빈 배열로 정의
  //  ajax처리는 비동기이므로 데이터를 받아오는 처리의 완료 여부와 상관 없이 화면 출력이 먼저 수행 된다.
  //  그러므로 Ajax의 결과를 상태값에 저장하여 데이터를 받아온 후 화면이 자동 갱신 되도록 처리해야 한다.
  const [newsList, setNewsList] = useState([]);
  //  현재 ajax가 데이터를 로딩중인지 의미하는 상태 값
  const [loading, setLoading] = useState(false);

  /** 페이지가 처음 열렸을 때 실행할 hook */
  //  hook에 전달되는 콜백함수에 직접적으로 async를 적용할 수 없다.
  useEffect(() => {
    //async-await 처리를 위한 즉시 실행 함수 정의
    (async () => {
      //  Ajax 로딩 시작을 알림
      setLoading(true);

      //  ajax의 결과를 저장할 변수 준비
      let json = null;

      try {
        const response = await axios.get("/news/");
        json = response.data;
      } catch (e) {
        console.error(e);
        alert(`데이터 요청에 실패했습니다. \n${e.message}`);
        return;
      } finally {
        //  Ajax 종료
        setLoading(false);
      }
      //ajax 값 반영
      setNewsList(json);
    })();
  }, []);
  return (
    <div>
      <Spinner loading={loading} />
      <NewsList news={newsList} />
    </div>
  );
});

export default News;

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

**NewsList.js**

```javascript

/**
 * 배열 데이터를 탐색하면서 배열의 원소 단위로 컴포넌트를 분리한 케이스
 */

import React from 'react';
import styled from 'styled-components';
// import NewsData from '../NewsData';

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .list-item {
    border-top: 1px solid #eee;

    &:last-child {
      border-bottom: 1px solid #eee;
    }

    .list-item-link {
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      align-items: center;
      padding: 5px 10px;
      text-decoration: none;
      color: #000;
      transition: all 0.1s;

      &:hover {
        background-color: #eeeeee55;
      }

      .thumbnail {
        width: 150px;
        height: 100px;
        display: block;
        object-fit: cover;
        flex: none;
      }

      .content {
        flex: 0 1 auto;
        padding: 5px 0 5px 20px;
        background-color: #ff01;

        h3 {
          background-color: #ff01;
          box-sizing: border-box;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          margin-bottom: 10px;

          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        p {
          background-color: #0601;
          font-size: 14px;
          margin: 0;
          margin-bottom: 8px;

          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        ul {
          background-color: #0601;
          list-style: none;
          padding: 0;
          margin: 0;

          li {
            display: inline-block;
            font-size: 12px;

            &:first-child:after {
              content: '|';
              display: inline-block;
              color: #555;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
`;

const NewsList = ({news}) => {
  return (
    <div>
      <ListContainer>
        {news.map(({ author, title, description, url, image, datetime }, i) => {
          return (
            <li className='list-item' key={i}>
              <a href={url} className="list-item-link" target="_blank" rel='noreferrer'>
                <img src={image} alt={title} className="thumbnail" />
                <div className='content'>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    <li>{author}</li>
                    <li>{new Date(datetime).toLocaleString()}</li>
                  </ul>
                </div>
              </a>
            </li>
          )
        })}
      </ListContainer>
    </div>
  );
};

export default NewsList;

```
<hr/>

**Spinner.js**

```javascript

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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


</div>
</details>