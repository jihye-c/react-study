# Study Note

---

## SEP 6, 2024
  
##### React core concept (2)

*Props : Configuring Components with "props". 데이터를 컴포넌트로 전송하고 사용할 수 있게 함.

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

##### 구조 분해

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

## SEP 5, 2024

##### React core concept (1)
  
Components, JSX, Props, State
React Apps are built by Combining Components

* Components : Reusable building block, Related code lives together,Separation of concerns
Component Rules : 함수명은 내장 컴포넌트와 구분짓기 위해 대문자로 시작 (PascalCase), 렌더될 HTML 마크업 반환
* JSX : HTML 마크업을 JSX라는 비표준 자바스크립트 문법으로 작성하게 됨. .jsx라는 확장자 내 파일에 작성.

---
  
## SEP 4, 2024
  
##### 리액트 왜 이용하는가?
  
리액트는 빌드 프로세스를 사용해 작성한 코드가 변형된다. package.json 파일에서 사용하는 툴을 확인 가능함.
  
> 그럼 왜 왜 빌드프로세스를 쓰는가?
> 1. 처리되지 않는 리액트 코드는 표준 문법을 사용하지 않기 때문에 브라우저에서 실행이 안됨.
> 2. 작성한 코드가 프로덕션을 위해 최적화 되지 않기 때문에.(min 버전)
  
##### Export / Default
  
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