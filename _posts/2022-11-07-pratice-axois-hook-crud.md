---
layout: single
title: "React-axios-hooks-crud"
categories: practice
tag: [axios, crud]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# Axoios-Hooks-Crud

## 메인

![image](https://user-images.githubusercontent.com/105469077/200562859-500015fe-9502-4054-897a-923e7c7719be.png)

## 수정하기

![image](https://user-images.githubusercontent.com/105469077/200563024-95b54109-3839-45b3-8261-1d20ca531370.png)

## 추가하기

![image](https://user-images.githubusercontent.com/105469077/200563148-abd3f90e-fab3-4b09-8063-82df3b945e79.png)

**package.json**

```json

"proxy": "http://localhost:3003", // 추가
"scripts": { // 변경
    "start": "react-scripts start | json-server --watch data.json --port 3003",
}

```

<details>
<summary>src</summary>
<div markdown='1'>
<br/>

**App.js**

```javascript

import React, { memo } from 'react';
import {Routes, Route} from 'react-router-dom';

import ProfessorList from './pages/ProfessorList';
import ProfessorAdd from './pages/ProfessorAdd';
import ProfessorEdit from './pages/ProfessorEdit';


const App = memo(() => {
  return (
    <div>
      <h1>Axios-hook-CRUD</h1>

      <Routes>
        <Route path='/' exapt={true} element={<ProfessorList />} />
        <Route path='/add' element={<ProfessorAdd />} />
        <Route path='/edit/:id' element={<ProfessorEdit />} />
      </Routes>
    </div>
  );
});

export default App;

```

**index.js**

```javascript

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

```

</div>
</details>

<details>
<summary>pages</summary>
<div markdown='1'>
<br/>

**ProfessorList.js**

```javascript

import React, { memo, useEffect, useCallback } from 'react';
import useAxios from 'axios-hooks';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

import Spinner from '../components/Spinner';
import Table from '../components/Table';

const LinkContainer = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
`;

const TopLink = styled(NavLink)`
    margin-right: 15px;
    display: inline-block;
    font-size: 16px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    text-decoration: none;

    &:hover {
        background-color: #06f2;
    }
`;

const ProfessorList = memo(() => {
  const [professor, setProfessor] = React.useState([]);

  const [{ data, loading: loading1, error }, refetch] = useAxios("http://localhost:3003/professor", {
    useCache: false
  });

  useEffect(() => {
    setProfessor(data);
  }, [data]);

  const [{ loading: loading2 }, sendDelete] = useAxios({
    method: 'DELETE'
  }, {
    useCache: false,
    manual: true
  })

  const onDeleteClick = useCallback((e) => {
    e.preventDefault();

    const current = e.target;

    const id = parseInt(current.dataset.id);
    const name = current.dataset.name;

    if (window.confirm(`정말 ${name}교수의 정보를 삭제하시겠습니까?`)) {
      (async () => {
        try {
          await sendDelete({
            method: 'DELETE',
            url: `http://localhost:3003/professor/${id}`
          });
        } catch (e) {
          console.error(e);
          window.alert(`[${e.response.status}] ${e.response.statusText}\n${e.mssage}`);
          return;
        }
        setProfessor(professor => professor.filter((v, i) => v.id !== id));
      })();
    }
  }, []);

  return (
    <div>
      <Spinner loading={loading1 || loading2} />

      <LinkContainer>
        <TopLink to='add'>교수 등록하기</TopLink>
      </LinkContainer>

      {error ? (
        <div>
          <h1>Oops~!!! {error.code} Error.</h1>
          <hr />
          <p>{error.message}</p>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>아이디</th>
              <th>직급</th>
              <th>급여</th>
              <th>입사일</th>
              <th>보직수당</th>
              <th>소속학과번호</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {professor && professor.map(({ id, name, userid, position, sal, hiredate, comm, deptno }
            , i) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{userid}</td>
                  <td>{position}</td>
                  <td>{sal}만원</td>
                  <td>{dayjs(hiredate).format('YY/MM/DD')}</td>
                  <td>{comm && `${comm}만원`}</td>
                  <td>{deptno}</td>
                  <td><NavLink to={`edit/${id}`}>수정하기</NavLink></td>
                  <td><a href='#!' data-id={id} data-name={name} onClick={onDeleteClick}>삭제하기</a></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
});

export default ProfessorList;

```

**ProfessorAdd.js**

```javascript

import React, { memo } from 'react';
import useAxios from 'axios-hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import Spinner from '../components/Spinner';
import Table from '../components/Table';

const TableEX = styled(Table)`
    margin-top: 50px;
    margin-bottom: 15px;
    .inputWrapper {
        padding: 0;
        position: relative;
        text-align: left;

        .field {
            box-sizing: border-box;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 0;
            padding: 0 10px;
            outline: none;
            font-size: 14px;
        }

        label {
            margin-left: 7px;
            margin-right: 10px;

            input {
                margin-right: 10px;
            }
        }
    }

`;

const ProfessorAdd = memo(() => {
  const navigate = useNavigate();

  const [{ data, loading: loading1, error }] = useAxios('http://localhost:3003/department');

  const [{ loading: loading2 }, refetch] = useAxios({
    url: "http://localhost:3003/professor",
    method: 'POST'
  }, { manual: true });

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();

    const current = e.target;

    (async () => {
      try {
        await refetch({
          data: {
            name: current.name.value,
            userid: current.userid.value,
            position: current.position.value,
            sal: parseInt(current.sal.value),
            hiredate: dayjs(current.hiredate.value).toISOString(),
            comm: parseInt(current.comm.value),
            deptno: parseInt(current.deptno.value)
          }
        });
      } catch (e) {
        console.error(e);
        window.alert(`[${e.response.status}]${e.response.statusText}\n${e.message}`);
        return;
      }

      window.alert('저장되었습니다.');
      navigate('/');
    })();
  }, [refetch, navigate]);

  return (
    <>
      <Spinner loading={loading1 || loading2} />

      {error ? (
        <div>
          <h1>Oops~!!! {error.code} Error.</h1>
          <hr />
          <p>{error.message}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <TableEX>
            <colgroup>
              <col width="120" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td className="inputWrapper"><input className='field' type='text' name='name' /></td>
              </tr>
              <tr>
                <th>아이디</th>
                <td className="inputWrapper"><input className='field' type='text' name='userid' /></td>
              </tr>
              <tr>
                <th>직급</th>
                <td className="inputWrapper">
                  <label><input type="radio" name='position' value='교수'/>교수</label>
                  <label><input type="radio" name='position' value='부교수'/>부교수</label>
                  <label><input type="radio" name='position' value='조교수'/>조교수</label>
                  <label><input type="radio" name='position' value='전임강사'/>전임강사</label>
                </td>
              </tr>
              <tr>
                <th>급여(만원)</th>
                <td className="inputWrapper"><input className='field' type='number' name='sal' placeholder='숫자만 입력'/></td>
              </tr>
              <tr>
                <th>입사일</th>
                <td className="inputWrapper"><input className='field' type='date' name='hiredate' /></td>
              </tr>
              <tr>
                <th>보직수당(만원)</th>
                <td className="inputWrapper"><input className='field' type='number' name='comm' placeholder='숫자만 입력'/></td>
              </tr>
              <tr>
                <th>소속학과</th>
                <td className="inputWrapper">
                  <select name="deptno" className='field'>
                    <option value="">---- 선택하세요 ----</option>
                    {data && data.map((v, i) => {
                      return (
                        <option key={i} value={v.id}>{v.dname}</option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </TableEX>

          <div style={{ textAlign: 'center' }}>
            <button type='submit'>저장하기</button>
          </div>
        </form>
      )}
    </>
  );
});

export default ProfessorAdd;

```

**ProfessorEdit.js**

```javascript

import React, { memo } from 'react';
import useAxios from 'axios-hooks';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Spinner from '../components/Spinner';
import Table from '../components/Table';

const TableEX = styled(Table)`
    margin-top: 50px;
    margin-bottom: 15px;
    .inputWrapper {
        padding: 0;
        position: relative;
        text-align: left;

        .field {
            box-sizing: border-box;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 0;
            padding: 0 10px;
            outline: none;
            font-size: 14px;
        }

        label {
            margin-left: 7px;
            margin-right: 10px;

            input {
                margin-right: 10px;
            }
        }
    }

`;

const ProfessorEdit = memo(() => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [{ data: department, loading: loading1, error: err1 }] = useAxios('http://localhost:3003/department');
  const [{ data: professor, loading: loading2, error: err2 }, refetch] = useAxios(`http://localhost:3003/professor/${id}`);

  const onSubmit = React.useCallback((e) => {
    e.preventDefault();

    const current = e.target;

    (async () => {
      try {
        await refetch({
          method: 'PUT',
          data: {
            name: current.name.value,
            userid: current.userid.value,
            position: current.position.value,
            sal: parseInt(current.sal.value),
            hiredate: dayjs(current.hiredate.value).toISOString(),
            comm: parseInt(current.comm.value),
            deptno: parseInt(current.deptno.value)
          }
        });
      } catch (e) {
        console.error(e);
        window.alert(`[${e.response.status}]${e.response.statusText}\n${e.message}`);
        return;
      }

      window.alert('저장되었습니다.');
      navigate('/');
    })();
  }, [refetch, navigate]);

  return (
    <>
      <Spinner loading={loading1 || loading2} />

      {(err1 || err2) ? (
        <div>
          <h1>Oops~!!! {(err1 || err2)} Error.</h1>
          <hr />
          <p>{(err1 || err2).message}</p>
        </div>
      ) : (
        professor && (
        <form onSubmit={onSubmit}>
          <TableEX>
            <colgroup>
              <col width="120" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td className="inputWrapper"><input className='field' type='text' name='name' defaultValue={professor.name}/></td>
              </tr>
              <tr>
                <th>아이디</th>
                <td className="inputWrapper"><input className='field' type='text' name='userid' defaultValue={professor.userid}/></td>
              </tr>
              <tr>
                <th>직급</th>
                <td className="inputWrapper">
                  <label><input type="radio" name='position' defaultChecked={professor.position === '교수'} value='교수'/>교수</label>
                  <label><input type="radio" name='position' defaultChecked={professor.position === '부교수'} value='부교수'/>부교수</label>
                  <label><input type="radio" name='position' defaultChecked={professor.position === '조교수'} value='조교수'/>조교수</label>
                  <label><input type="radio" name='position' defaultChecked={professor.position === '전임강사'} value='전임강사'/>전임강사</label>
                </td>
              </tr>
              <tr>
                <th>급여(만원)</th>
                <td className="inputWrapper"><input className='field' type='number' name='sal' placeholder='숫자만 입력' defaultValue={professor.sal}/></td>
              </tr>
              <tr>
                <th>입사일</th>
                <td className="inputWrapper"><input className='field' type='date' name='hiredate' defaultValue={dayjs(professor.hiredate).format('YYYY-MM-DD')}/></td>
              </tr>
              <tr>
                <th>보직수당(만원)</th>
                <td className="inputWrapper"><input className='field' type='number' name='comm' placeholder='숫자만 입력' defaultValue={professor.comm}/></td>
              </tr>
              <tr>
                <th>소속학과</th>
                <td className="inputWrapper">
                  <select name="deptno" className='field' defaultValue={professor.deptno}>
                    <option value="">---- 선택하세요 ----</option>
                    {department && department.map((v, i) => {
                      return (
                        <option key={i} value={v.id}>{v.dname}</option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </tbody>
          </TableEX>

          <div style={{ textAlign: 'center' }}>
            <button type='submit'>저장하기</button>
          </div>
        </form>
        )
      )}
    </>
  );
});

export default ProfessorEdit;

```

</div>
</details>

<details>
<summary>components</summary>
<div markdown='1'>

**Spinner.js**

```javascript
import React, { memo } from "react";
import PropTypes from "prop-types";

// 로딩바 컴포넌트
// --> https://mhnpd.github.io/react-loader-spinner/
import { Blocks } from "react-loader-spinner";

const Spinner = memo(({ loading, width, height }) => {
  return (
    <Blocks
      visible={loading}
      height={width}
      width={height}
      ariaLabel="blocks-loading"
      wrapperStyle={{
        position: "absolute",
        zIndex: 9999,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClass="blocks-wrapper"
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
  height: PropTypes.number,
};

export default Spinner;
```

**Table.js**

```javascript
import styled from "styled-components";

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