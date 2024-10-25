# OCT 25, 2024

### 모든 태그가 Root 안에 들어가지 않아도 된다!

리액트 작업시 자주 간과하게 되는 부분인데 정적인 내용이라면 굳이 root 안에 컴포넌트로 넣어 제어하지 않아도 된다.

---

# SEP 10, 2024
  
### Props 구조분해 할당을 위한 스프레드 연산자
```jsx
<Section id="value"></Section>
```
이렇게 적어도 직접 id란 props를 설정해주지 않으면 값이 적용되지 않는다.
```jsx
    function Section({id}){
        return(
            <section id={id}></section>
        )
    }
```
이런 식으로 매번 설정해줘야한다.
  
```jsx
<Section id="value"></Section>
```
```jsx
    function Section({value, ...props}){
        return(
            <section {...props}></section>
        )
    }
```
스프레드 연산자를 사용하면 이 구연 컴포넌트에서 사용할 수 있는 props를 모아 props object(속성 개체)로 병합하게 된다. 명시되지 않은 모든 속성들을 빌트인 속성 요소로 가져올 수 있다.
  
Parameter 자리에 있는 ...(스프레드 연산자)는 값을 모이기 위함이고 밑에 있는 ...은 값을 펼치기 위함이다.

### JSX Slot Usage

React에선 JSX 코드 역시 Props로 컴포넌트에 넘길 수 있으니 children 속성 대신 임의의 속성을 추가해 JSX 코드를 넘기기 위한 Slot을 남길 수 있다.

```jsx
<Tabs buttons={
    <>
        <TabButton isSelected={selectedTopic === 'components'} onClick={()=>handleClick('components')}>Components</TabButton>
        <TabButton isSelected={selectedTopic === 'components'} onClick={()=>handleClick('components')}>Components</TabButton>
    </>
}>
    {tabConents}
</Tabs>
```
```jsx
export default function Tabs({children, buttons}){
    return <>
        <menu>
            {buttons}
        </menu>
        {children}
    </>
}
```
  
### 컴포넌트 타입 동적 설정하기
```jsx
export default function Tabs({children, buttons, buttonsContainer}){
    //buttonsContainer의 argument로 내장 컴포넌트 이름의 문자열 값이 아닌 변수나 컴포넌트를 {넣게 되면}
    //그 컴포넌트 함수를 가져오게 된다.
    const ButtonsContainer = buttonsContainer;
    return <>
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>
}
```
커스텀 컴포넌트가 아닌 내장 컴포넌트를 이용하고 싶다면 문자열로 props를 보내면 된다.
단, 컴포넌트 태그 안에는 변수나 빌트인 요소(소문자로 시작하는 식별자)가 들어가지 못하므로
위 코드처럼 대문자로 시작하는 특수 상수나 변수를 사용해 값을 읽어오도록 하면 된다.
  
```jsx
      <Tabs ButtonsContainer="menu"></Tabs>
```
```jsx
export default function Tabs({children, buttons, ButtonsContainer}){
    return <>
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>
}
```
컴포넌트 타입을 정할거면 처음부터 이렇게 대문자 상수로 받아와도 동일한 동작을 한다.
  
```jsx
export default function Tabs({children, buttons, ButtonsContainer = 'menu'}){
    return <>
        <ButtonsContainer>
            {buttons}
        </ButtonsContainer>
        {children}
    </>
}
```
등호를 사용해 기본값을 세팅해놓을 수도 있다.

---

# SEP 9, 2024

### JSX를 쓰지 않고 DOM 생성하는 법

* JSX는 비표준 속성이기 때문에 빌드 과정을 거치게 된다. createElement 메소드를 사용해 빌드 과정을 거치지 않고 DOM을 구축할 수 있다.
  
```jsx
<div id="content">
    <p>Hello World!</p>
</div>
```
위의 DOM은 아래의 코드를 생성한다.
```javascript
React.createElement( //createElement 메소드 사용
    'div', //컴포넌트 타입
    {id:'content'}, //props 오브젝트
    React.createElement( //자식 컨텐츠
        'p',
        null,
        'Hello World'
    )
)
```
  
같은 원리로 아래의 두 코드는 같은 동작을 한다.
```jsx
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App/>);
```
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(React.createElement(App));
```

### Fragments (프래그먼트)

```jsx
    function App(){
        return(
            <Header/>
            <Main/>
            <Footer/>
        )
    }
    
```
return문은 하나의 값만 반환할 수 있기 때문에 목적 없이 그저 감싸기만 하는 태그를 씌우지 않고서는 여러개의 형제 요소를 return 할 수 없다. 이를 위한 대안이 바로 Fragment다.
  
```jsx
import {Fragment} from 'react';
function App(){
    return(
        <Fragment>
            <Header/>
            <Main/>
            <Footer/>
        </Fragment>
    )
}
```
구버전 프로젝트에서는 리액트에서 Fragment를 가져와 작성한다. 이렇게 Fragment 컴포넌트로 감싸주면 반환되는 값은 1개이지만 렌더링 된 DOM에서는 불필요한 태그 없이 형제 요소를 만들 수 있다.
```jsx
function App(){
    return(
        <>
            <Header/>
            <Main/>
            <Footer/>
        </>
    )
}
```
보통은 Fragment import 없이 이렇게 빈 태그를 씌우면 된다.
  
### Feature 및 State별로 컴포넌트 분리
상태 관리를 올바른 컴포넌트 안에서 하기 위해 컴포넌트를 쪼개는 것이 중요하다.

---
  
# SEP 8, 2024
  
### State
  
* State를 왜 쓰는가? 변수가 변경되어도 App 컴포넌트가 실행되지 않아서 UI는 변경되지 않음. UI를 변경하기 위해(App 컴포넌트를 재실행 하기 위해) State를 사용함.

```jsx
import {useState} from 'react';
```
Hooks라고 부르는 useState 함수를 import한다. use로 시작하는 함수들은 다 React hooks.
컴포넌트 함수 안에 바로 호출해야한다. 다른 코드에 중첩되면 안 된다.
(inside of Component Functions, on the top level)

Manage State

```jsx
function App() {
    const [counter, setCounter] = useState('initial state value');
}
```

(useState값을 할당받은) 위의 배열에서 실질적으로 관리되는 데이터는 첫 데이터고,
두 번째 데이터는 항상 첫 값을 업데이트 하는 특수 함수가 들어온다. - 따라서 이름을 setCounter와 같은 식으로 작명하게 된다.
  
### Conditional content rendering
  
조건적 콘텐츠 렌더링에는 여러가지 방법이 있다.
  
1. null을 포함한 삼항연산자
```jsx
    <div>
        {!condition > <p>Contents A</p> : null}
        {condition > <p>Contents B</p> : null}
    </div>
```

2. 일반 삼항연산자
```jsx
    return(
        <div>
            {!condition > <p>Contents A</p> : <p>Contents B</p>}
        </div>
    )
```

3. AND 연산자 이용
```jsx
    return(
        <div>
            {!condition && <p>Contents A</p>}
            {condition && <p>Contents B</p>}
        </div>
    )
```

4. 변수 사용
```jsx
    //return
    let contents = <p>Contents A</p>;
    if(condition){
        contents = <p>Contents B</p>;
    }
    return(
        <div>
            {contents}
        </div>
    )
```
  
### CSS 동적 스타일링
  
기존과 동일하게 className이나 id로 css설정.
isSelected와 같은 변수를 true/false 받아 props로 전달하는 방식.
```jsx
function App(){
    const [selectedTopic, setSelectedTopic] = useState(); //selectedTopic State 생성
    function handleClick(selectedBtn){//handleClick 이벤트 시 
        setSelectedTopic(selectedBtn);//selectedTopic의 state를 전달받은 argument로 세팅
    }
    function TabButton({children,isSelected}){//탭버튼의 컴포넌트 함수
        return(
        <li><button className={isSelected ? 'active' : undefined}>{children}</button></li>
        )
    }
    return(
        <main>
            <TabButton isSelected={selectedTopic === 'components'} onSelect={()=>handleClick('components')}>Components</TabButton>
        <main/>
    )
}
```
  
### Dynamic output of lists
  
> map 함수란? 
> map()함수는 배열을 순회하며 콜백 함수를 적용하여 요소를 변환 후, 바뀐 값을 모아 새 배열로 반환한다.

map()을 통해 리스트를 동적으로 만들 수 있다. 
```jsx
function PaperItem({ image, number, description }) {
    return (
        <li>
            <img src={image} alt={`${number} image`} />
            <h3>{number}</h3>
            <p>{description}</p>
        </li>
    )
}
<ul>
    {PAPER.map((paperOption)=> //PAPER 배열 순회
    <PaperItem
        key={paperOption.number} //동적 리스트 출력엔 구분지울 수 있는 키 값이 있어야 해서 설정. 추후 자세히 설명
        {...paperOption}//paperOption의 속성들이 PaperItem 컴포넌트 생성 함수에 props로 전달됨
    />
    )} //PAPER 배열의 개수만큼 PaperItem 컴포넌트가 생성됨 
</ul>
```
  
---
  
# SEP 7, 2024
  
### Folder Structures
  
* 컴포넌트들은 모두 App.js에 있는 것이 아니라 별도의 `ComponentName.jsx` 파일에 분리하는 것이 일반적이다.
* CSS 역시 같은 이름으로 분리해서 파일을 가까이에 둘 수 있다. 혹은 ComponentName 폴더로 분리해 그 안에 담아도 된다.
  
### Children Props
  
props.children으로 컴포넌트 사이에 있는 텍스트를 사용할 수 있다.
```jsx

<Components>text</Components>

function Components(props){
    return (
        <div>{props.children}</div>
    )
}
//OR... use objects destructuring
function Components({children}){
    return (
        <div>{children}</div>
    )
}
```
위와 같이 컴포넌트가 타 컴포넌트나 내용을 감싸 구축하는 것을 Component composition (컴포넌트 합성)이라고 한다.
"children"을 이용하던 Attributes를 이용하던은 개인의 자유... 두 방법 모두 알아두고 맥락과 기호에 맞춰 사용할 것.
  
### Event Handling
  
버튼에 Click Event listener 추가하기
```jsx
function Components(props){
    function clickHandler(){
        console.log('Hello World');
    }
    return (
        <div>
            <button onClick={clickHandler}> Click Me!</button>
        </div>
    )
}
```
* built in element는 on으로 시작하는 props를 지원함. (ex. onClick, onMouseEnter...)
* onProps의 값은 함수. 함수의 포인터를 적는다. `onClick={clickHandler();}` 로 하지 않고 `onClick="clickHandler"`로 적는 이유는 괄호를 붙이면 코드 라인이 실행될 때 함수 역시 실행되기 때문.
* 보통 이벤트 발생 시 호출하는 함수의 이름은 뭘로 지어도 자유긴 하나 관습적으로 `handle`+`eventName` 혹은 `event`+`Handler`로 짓는다.
  
식별자 Listening(청취) 하기
```JSX
    function Components(props){
        function clickHandler(selectedBtn){
            console.log('Hello ' + selectedBtn);
        }
        return (
            <div>
                // arrow function expression
               <button onClick={()=>clickHandler('Parameter')}> Click Me!</button>
                 //Anonymous function expression
                <button onClick={function(){clickHandler('Parameter')}> Click Me!</button>
            </div>
        )
    }
```
* 이벤트로부터 독립적인 함수를 구성 및 설정하고 싶다면 (ex. 식별자 얻기) prop값으로 포인터를 바로 넣지 않고 함수를 다른 함수로 감싼다. 화살표 함수나 익명 함수를 많이 사용한다.
* 익명함수를 씌우면 코드 라인이 실행될 때 함수만 정의되고 실행되지 않기 때문에 실행을 통제할 수 있다. 괄호를 붙여 파라미터를 전달해도 바로 실행되지 않고 이벤트가 발생할 때에만 실행된다.
  
---
  
# SEP 6, 2024
  
### React core concept (2)
  
* Props : Configuring Components with "props". 데이터를 컴포넌트로 전송하고 사용할 수 있게 함.

1. Components에 Props(custom HTML attributes)를 작성하면
```JSX
    <CoreConcept
        title = "Components"
        description = "Building Blocks"
    >
```
  
2. 리액트가 attributes들을 (props) 받아와 하나의 객체에 merge
```JSX
    {
        title : 'Components'
        description : 'Building Blocks'
    }
```
  
3. React에 의해 컴포넌트 함수의 첫 번째 arguments로 전달됨.
```JSX
    function CoreConcept(props){
        return <h3>{props.title}<h3/>
    }
```
  
### 구조 분해
  
객체의 props 명과 데이터의 속성 이름이 비슷할 경우 스프레드 연산자를 이용해 바로 키값을 뽑아낼 수 있다.
```JSX
    //before
    <CoreConcept 
        title={CORE_CONCEPTS[0].title}
        description={CORE_CONCEPTS[0].description}
        image={CORE_CONCEPTS[0].image}
    />

    //after
    <CoreConcept {...CORE_CONCEPTS[0]}/>
```
  
컴포넌트 함수 내에서도 중괄호를 이용해 객체 구조 분해를 사용할 수 있다.
```JSX
    //before
    function CoreConcept(props){
        return(
            <li>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            </li>
        )
    }

    //after
    function CoreConcept({image, title, description}){
        return(
            <li>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            </li>
        )
    }
```
  
---
  
# SEP 5, 2024
  
### React core concept (1)
  
Components, JSX, Props, State
React Apps are built by Combining Components

* Components : Reusable building block, Related code lives together,Separation of concerns
Component Rules : 함수명은 내장 컴포넌트와 구분짓기 위해 대문자로 시작 (PascalCase), 렌더될 HTML 마크업 반환
* JSX : HTML 마크업을 JSX라는 비표준 자바스크립트 문법으로 작성하게 됨. .jsx라는 확장자 내 파일에 작성.

---
  
# SEP 4, 2024
  
### 리액트 왜 이용하는가?
  
리액트는 빌드 프로세스를 사용해 작성한 코드가 변형된다. package.json 파일에서 사용하는 툴을 확인 가능함.
  
> 그럼 왜 왜 빌드프로세스를 쓰는가?
> 1. 처리되지 않는 리액트 코드는 표준 문법을 사용하지 않기 때문에 브라우저에서 실행이 안됨.
> 2. 작성한 코드가 프로덕션을 위해 최적화 되지 않기 때문에.(min 버전)
  
### Export / Default
  
module 타입의 스트립트는 export/import 문법 사용 가능.  
```html
    <script type="module"></script> 
```
  
불러올 땐 import `이름` from `경로` 와 같은 식으로 사용하고 내보낼 땐 export `이름`
export default는 이름 할당 없이 바로 값을 넘긴다. 한 파일 당 하나의 export default 값만 사용 가능.
  
1. 이름이 할당되지 않은(default) 변수나 함수 불러오기
```javascript
    import apiKey from './root/file.js'
```
    
2. 이름이 할당된 변수나 함수 불러오기
```javascript
    import {apiKey, loadFn} from './root/file.js'
```
  
3. 할당된 이름 변경하기
```javascript
    import {apiKey as mainKey, loadFn} from './root/file.js'
```
  
4. 객체로 묶어 한 번에 불러오기
```javascript
    import * as utils from './root/file.js'
```