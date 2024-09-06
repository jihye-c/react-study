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