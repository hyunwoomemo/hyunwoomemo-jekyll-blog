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

**package.json**

```json

"private": true, // 추가
"scripts": { // 변경
    "start": "react-scripts start | json-server --watch data.json --port 3001",
}

```

<details>
<summary>src</summary>
<div markdown='1'>
<br/>

**App.js**

```javascript
import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import GradeAdd from "../pages/GradeAdd";
import GradeEdit from "../pages/GradeEdit";
import GradeList from "../pages/GradeList";

function App() {
  return (
    <div>
      <h1>12-Axois-Hooks-CRUD</h1>

      <Routes>
        <Route path="/" exapt={true} element={<GradeList />}></Route>
        <Route path="/add" element={<GradeAdd />}></Route>
        <Route path="/edit/:id" element={<GradeEdit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
```

**index.js**

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

</div>
</details>

<details>
<summary>pages</summary>
<div markdown='1'>
<br/>

**GradeAdd.js**

```javascript
import React from "react";

const GradeAdd = () => {
  return <div>GradeAdd</div>;
};

export default GradeAdd;
```

**GradeEdit.js**

```javascript

```

**GradeList.js**

```javascript

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

<details>
<summary>helpers</summary>
<div markdown='1'>
<br/>

**CookieHelper.js**

**ExceptionHelper.js**

**RegexHelper.js**

**UtilHelper.js**

</div>
</details>
