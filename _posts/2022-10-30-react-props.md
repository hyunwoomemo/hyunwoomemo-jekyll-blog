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

const Btn = ({ text, changeValue }) => {
    return <button 
    onClick={changeValue}
    >
    {text}
    </button>
  }
  const App = () => {
    const [value, setValue] = React.useState("Save Changes");
    const changeValue = () => setValue("Revert Changes");
    return (
      <div>
        <Btn text={value} changeValue={changeValue}/>
        <Btn text="Continue" />
      </div>
    );
  }

  const root = document.querySelector('#root');
  ReactDOM.render(<App />, root);

```