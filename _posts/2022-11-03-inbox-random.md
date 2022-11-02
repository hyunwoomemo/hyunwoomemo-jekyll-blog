---
layout: single
title: "랜덤 숫자 추출 방법 (범위 지정)"
categories: inbox
tag: [codeit]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## 1부터 n까지의 랜덤 숫자 추출

```javascript

Math.ceil(Math.random() * n);

```

## min부터 max까지의 랜덤 숫자 추출

```javascript

Math.floor(Math.random() * (max-min+1)) + min;

```