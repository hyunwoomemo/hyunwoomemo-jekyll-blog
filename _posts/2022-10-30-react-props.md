---
layout: single
title: "React Props"
categories: react
tag: [props]
author_profile: true
toc: true
toc_label: "목록"
toc_icon: "bars"
toc_sticky: true
---

# props

```javascript

const Btn = ({ text, fontSize }) => {
    return <button 
    style={{
      fontSize,
    }}
    >
    {text}
    </button>
  }
  
  // propTypes
  Btn.propTypes = {
    text: PropTypes.string.isRequired, // 필수값 설정
    fontSize: PropTypes.number, 
  }

  const App = () => {
    const [value, setValue] = React.useState("Save Changes");
    return (
      <div>
        <Btn text={value} fontSize={18}/>
        <Btn text="Continue" fontSize={16}/>
      </div>
    );
  }

```