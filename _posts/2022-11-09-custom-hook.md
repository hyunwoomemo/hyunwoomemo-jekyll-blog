---
layout: single
title: "Custom hook"
categories: inbox
tag: [hook]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# 1. useMountedRef.js

>페이지 로딩이 완료되었음을 감지하기 위한 커스텀 훅
{: .prompt-info}

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
