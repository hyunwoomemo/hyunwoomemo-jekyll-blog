---
layout: single
title: "React UI-library"
categories: react
tag: [library]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

## FsLightbox

```console
yarn add fslightbox-react
```

![image](https://user-images.githubusercontent.com/105469077/198690548-b686c8b5-ed23-4b5f-a9f3-502a9f86e73e.png)

![image](https://user-images.githubusercontent.com/105469077/198690451-40b4b31f-8392-40b1-8211-8d59057c4178.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
/**
 * FsLightBoxEx
 *  어떤 요소(img, button, a 등) 를 클릭했을 때
 *  지정된 이미지, 영상 등을 모달 팝업으로 표시하는 기능
 * 스크롤바의 위치에 따라 재상되는 애니메이션 처리
 * 
 * https://fslightbox.com/
 * 
 * yarn add fslightbox-react
 * 
 * [Youtube 썸네일]
 * - 동영상 배경 썸네일(480x360): https://img.youtube.com/vi/영상코드/0.jpg
 * - 동영상 시작지점 썸네일(120x90): https://img.youtube.com/vi/영상코드/1.jpg
 * - 동영상 중간지점 썸네일(120x90): https://img.youtube.com/vi/영상코드/2.jpg
 * - 동영상 끝지점 썸네일(120x90): https://img.youtube.com/vi/영상코드/3.jpg
 * - 고해상도 썸네일(1280x720): https://img.youtube.com/vi/영상코드/maxresdefault.jpg
 * - 중간해상도 썸네일(640x480): https://img.youtube.com/vi/영상코드/sddefault.jpg
 * - 고품질 썸네일(480x360): https://img.youtube.com/vi/영상코드/hqdefault.jpg
 * - 중간품질 썸네일(320x180): https://img.youtube.com/vi/영상코드/mqdefault.jpg
 * - 보통품질 썸네일(120x90): https://img.youtube.com/vi/영상코드/default.jpg
 */

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import FsLightbox from 'fslightbox-react';

import img1 from '../assets/img/img1.avif';
import img2 from '../assets/img/img2.avif';
import img3 from '../assets/img/img3.avif';
import img4 from '../assets/img/img4.avif';
import img5 from '../assets/img/img5.avif';
import img6 from '../assets/img/img6.avif';

const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 0;
  margin: 0 5px;
  background: none;
  outline: none;
`

const FsLightboxEx = memo(() => {
  // 단일 이미지를 사용할 경우 모달창 표시 여부에 대한 상태값
  const [singleToggler, setSingleToggler] = useState(false);

  // 복수 이미지를 사용할 경우 모달창 표시 여부와 몇 번째 이미지를 표시할지에 대한 상태값
  const [multiToggler, setMultiToggler] = useState({
    open: false,
    index: 1
  });

  // 단일 Youtube 영상을 사용할 경우 모달 창 표시 여부에 대한 상태값
  const [youtubeToggler, setYoutubeToggler] = useState(false);

  // 복수 Youtube 영상을 사용할 경우 모달 창 표시 여부와 몇 번째 영상을 표시할지에 대한 상태값
  const [youtubeMultiToggler, setYoutubeMultiToggler] = useState({
    open: false,
    index: 1
  });

  return (
    <div>
      <h2>FsLightBox</h2>


      <h3>Single Gallery</h3>
      <div>
        <Button onClick={e => { setSingleToggler(!singleToggler) }}>
          <img src={img1} alt="img1" width='150' />
        </Button>
        <FsLightbox sources={[img1]} toggler={singleToggler} />
      </div>

      <h3>Multi Gallery</h3>
      <div>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 1 })}>
          <img src={img1} width='150' alt="img1" />
        </Button>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 2 })}>
          <img src={img2} width='150' alt="img2" />
        </Button>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 3 })}>
          <img src={img3} width='150' alt="img3" />
        </Button>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 4 })}>
          <img src={img4} width='150' alt="img4" />
        </Button>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 5 })}>
          <img src={img5} width='150' alt="img5" />
        </Button>
        <Button onClick={e => setMultiToggler({ open: !multiToggler.open, index: 6 })}>
          <img src={img6} width='150' alt="img6" />
        </Button>
        <FsLightbox toggler={multiToggler} sources={[img1, img2, img3, img4, img5, img6]} slide={multiToggler.index}></FsLightbox>
      </div>

      <h3>Youtuve Single link</h3>
      <div>
        <Button onClick={e => setYoutubeToggler(!youtubeToggler)}>
          <img src="https://img.youtube.com/vi/J6NATqm3l5I/maxresdefault.jpg" width='150' alt="img1" />
        </Button>
        <FsLightbox toggler={youtubeToggler} sources={['https://www.youtube.com/watch?v=J6NATqm3l5I']}/>
      </div>

      <h3>Youtube Multi link</h3>
      <div>
        <Button onClick={e => setYoutubeMultiToggler({open: !youtubeMultiToggler.open, index: 1})}>
          <img src="https://img.youtube.com/vi/ls3yEndaD8A/maxresdefault.jpg" width='150' alt="1" />
        </Button>
        <Button onClick={e => setYoutubeMultiToggler({open: !youtubeMultiToggler.open, index: 2})}>
          <img src="https://img.youtube.com/vi/xy5Ap0m2DMk/maxresdefault.jpg" width='150' alt="2" />
        </Button>
        <Button onClick={e => setYoutubeMultiToggler({open: !youtubeMultiToggler.open, index: 3})}>
          <img src="https://img.youtube.com/vi/mhKcx1zN_Xo/maxresdefault.jpg" width='150' alt="3" />
        </Button>
        <FsLightbox toggler={youtubeMultiToggler.open} sources={[
          'https://www.youtube.com/watch?v=ls3yEndaD8A',
          'https://www.youtube.com/watch?v=xy5Ap0m2DMk',
          'https://www.youtube.com/watch?v=mhKcx1zN_Xo',
        ]} slide={youtubeMultiToggler.index}/>
      </div>
    </div>
  );
});

export default FsLightboxEx;
```

</div>
</details>

## Aos
```console
yarn add aos
```

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
/**
 * AOS
 * Animaition On Scroll
 * 스크롤바의 위치에 따라 재상되는 애니메이션 처리
 * 
 * https://michalsnik.github.io/aos/
 * 
 * yarn add aos
 */

import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import "aos/dist/aos.css";

// 애니메이션을 적용할 박스

const Box = styled.div`
  width: 300px;
  height: 200px;
  font-size: 40px;
  color: white;
  background-color: #f60;
  text-align: center;
  line-height: 200px;
  margin: 250px auto;
`

const AosEx = memo(() => {

  useEffect(() => {
    // 웹 페이지가 열림과 동시에 AOS를 초기화 하기 위해서 호출되어야 함.
    // React의 경우 컴포넌트가 초기 렌더링 된 직후를 의미
    AOS.init();
  }, []);

  return (
    <div>
      <h2>AOS</h2>
      <Box data-aos='fade-zoom-in' data-aos-offset='0' data-aos-easing='ease-in-sine' data-aos-onDurationChange='600'>AOS</Box>
      <Box data-aos='fade-left' data-aos-offset='300' data-aos-easing='ease-in-sine' data-aos-onDurationChange='600'>AOS</Box>
      <Box data-aos='fade-right' data-aos-offset='300' data-aos-easing='ease-in-sine' data-aos-onDurationChange='600'>AOS</Box>
      <Box data-aos='fade-up' data-aos-offset='300' data-aos-easing='ease-in-sine' data-aos-onDurationChange='600'>AOS</Box>
      <Box data-aos='fade-down' data-aos-offset='100' data-aos-easing='ease-in-sine' data-aos-onDurationChange='600'>AOS</Box>
    </div>
  )
});

export default AosEx;
```

</div>
</details>


## Slider
```console
yarn add react-simple-slider
```

![image](https://user-images.githubusercontent.com/105469077/198701537-99191ca4-fa70-4754-9292-8777c043efae.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript
/**
 * React Simple Image Slider
 * 
 * https://github.com/kimcoder/react-simple-image#readme
 * 
 * yarn add react-simple-slider
 */

import React, { memo } from 'react';
import ImgeSlider from 'react-simple-image-slider';

import img1 from '../assets/img/img1.avif';
import img2 from '../assets/img/img2.avif';
import img3 from '../assets/img/img3.avif';
import img4 from '../assets/img/img4.avif';

const Slider = memo(() => {

  const images = [
    {url: img1},
    {url: img2},
    {url: img3},
    {url: img4},
  ]

  return (
    <div>
      <ImgeSlider 
        width="60%"
        height={480}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={2.0}
        loop={true}
        style={{margin: 'auto'}}
      />
    </div>
  );
});

export default Slider;
```

</div>
</details>

## SweetAlert2

```console
yarn add sweetalert2 sweetalert2-reacct-content
```

![image](https://user-images.githubusercontent.com/105469077/198914743-4cd1dc78-b5a9-4b49-9211-02bc3dc3a8ff.png)

<details>
<summary>코드 보기</summary>
<div markdown='1'>

```javascript

/**
 * SweetAlert2
 *  메시지 팝업창 라이브러리
 * 
 * https://sweetalert2.github.io/
 * 
 * yarn add sweetalert2 sweetalert2-reacct-content
 */

import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import img2 from '../assets/img/img2.avif';

const Button = styled.button`
  border: 1px solid #d5d5d5;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    background-color: #aaa;
  }

  &:active {
    background-color: #ccc;
    transform: scale(0.9, 0.9);
  }
`;

const SweetAlert2Ex = memo(() => {
  const MySwal = withReactContent(Swal);

  // Promise 방식을 사용한 다이얼로그
  const onButton1Click = useCallback(() => {
    MySwal.fire({
      // 불필요한 항목은 삭제 가능함
      title: 'Promise',
      text: 'SweetAlert을 활용한 메시지 박스 테스트 입니다.',
      icon: 'info',
      footer: '<a href="https://sweetalert2.github.io/">SweetAlert2에 대해 궁금한가요?</a>'
    }).then((result) => {
      console.debug(result);
      if (result.isConfirmed) {
        MySwal.fire('확인 버튼을 눌렀습니다.');
      }
    });
  }, [MySwal]);

  // Async~Await 방식을 사용한 다이얼로그
  const onButton2Click = useCallback(async () => {
    const result = await MySwal.fire({
      title: 'Async Await',
      text: 'SweetAlert을 활용한 메시지 박스 테스트 입니다.',
      // 아이콘 종류 --> success, error, warning, info, question
      icon: 'success',
      footer: '<a href="https://sweetalert2.github.io/">SweetAlert2에 대해 궁금한가요?</a>'
    });

    console.debug(result);

    if (result.isConfirmed) {
      MySwal.fire('확인 버튼을 눌렀습니다.');
    }
  }, [MySwal]);

  // 이미지 다이얼로그
  const onButton3Click = useCallback(async () => {
    const result = await MySwal.fire({
      imageUrl: img2,
      imageWidth: '95%',
      imageAlt: 'Photographic',
      title: 'My Photo',
      text: 'Hello?'
    });

    console.debug(result);

    if (result.isConfirmed) {
      MySwal.fire('확인 버튼을 눌렀습니다.');
    }
  }, [MySwal]);

  // 컨펌 다이얼로그
  const onButton4Click = useCallback(async () => {
    const result = await Swal.fire({
      title: '<strong style="color:#fff">HTML <u>example</u></strong>',
      icon: 'info',
      html: '<p style="color: #fff">You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags</p>',
      background: `url(${img2})`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    });

    console.debug(result);

    if (result.isConfirmed) {
      MySwal.fire('확인 버튼을 눌럿습니다.');
    } else if (result.isDismissed && result.dismiss === 'cancel') {
      MySwal.fire('취소 버튼을 눌렀습니다.');
    }
  }, [MySwal]);

  // 버튼이 3개 배치된 다이얼로그
  const onButton5Click = useCallback(async () => {
    const result = await Swal.fire({
      icon: 'question',
      title: '확인',
      text: '변경사항을 저장하시겠습니까?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: '확인',
      denyButtonText: '나중에',
      cancelButtonText: '취소'
    });

    console.debug(result);

    if (result.isConfirmed) {
      MySwal.fire('확인 버튼을 눌렀습니다.');
    } else if (result.isDenied) {
      MySwal.fire('나중에 버튼을 눌렀습니다.');
    } else if (result.isDismissed && result.dismiss === 'cancel') {
      MySwal.fire('취소 버튼을 눌렀습니다.');
    }
  }, [MySwal]);
  return (
    <div>
      <Button onClick={onButton1Click}>Button1</Button>
      <Button onClick={onButton2Click}>Button2</Button>
      <Button onClick={onButton3Click}>Button3</Button>
      <Button onClick={onButton4Click}>Button4</Button>
      <Button onClick={onButton5Click}>Button5</Button>
    </div>
  );
});

export default SweetAlert2Ex;

```

</div>
</details>