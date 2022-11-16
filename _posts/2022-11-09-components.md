---
layout: single
title: "Components 모음"
categories: inbox
tag: [component]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 1. MenuLink.js

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

# 2. NewsList.js

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

# 3. Spinner.js

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
        position: 'fixed',
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

# 4. Table.js

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

# 5. ErrorView.js

>에러 정보를 표시하기 위한 컴포넌트
{: .prompt-info}

```javascript

import React, { memo } from 'react';

const ErrorView = memo(({error}) => {
  return (
    <div>
      <h1>Oops~!!! {error.code} Error.</h1>
      <hr />
      <p>{error.message}</p>
    </div>
  );
});

export default ErrorView;

```

# 6. BarChartView.js
> 그래프를 표시하기 위한 컴포넌트
{: .prompt-info}

```javascript

import React, { memo } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartView = memo(({ labels, dataset, legend}) => {
  /** 그래프 옵션 */
  const options = {
    indexAxis: 'x',
    responsive: true
  };

  /** chart에 표시될 데이터 (막대그래프용) */
  const data = {
    labels: labels,
    datasets: [{
      label: legend,
      backgroundColor: '#0066ff44',
      borderColor: '#06f',
      borderWidth: 1,
      data: dataset,
    }]
  };

  return ((labels && dataset) && <Bar data={data} options={options} />);
});

BarChartView.defaultProps = {
  lables: [],
  dataset: [],
  legend: ''
}

export default BarChartView;

```