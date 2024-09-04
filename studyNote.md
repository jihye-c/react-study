
# Study Note

## SEP 5

#### React core concept
  
Components, JSX, Props, State
React Apps are built by Combining Components

* Components : Reusable building block, Related code lives together,Separation of concerns

## SEP 4, 2024

#### 리액트 왜 이용하는가?

리액트는 빌드 프로세스를 사용해 작성한 코드가 변형된다. package.json 파일에서 사용하는 툴을 확인 가능함.

그럼 왜 왜 빌드프로세스를 쓰는가?
1. 처리되지 않는 리액트 코드는 표준 문법을 사용하지 않기 때문에 브라우저에서 실행이 안됨.
2. 작성한 코드가 프로덕션을 위해 최적화 되지 않기 때문에.(min 버전)


#### Export / Default
  
```html
<script type="module"></script>
```
module 타입의 스트립트는 export/import 문법 사용 가능.
  
불러올 땐 import `이름` from `경로` 와 같은 식으로 사용하고
내보낼 땐 export `이름
  
export default는 이름 할당 없이 바로 값을 넘긴다.
한 파일 당 하나의 export default 값만 사용 가능.
  
이름이 할당되지 않은(default) 변수나 함수 불러오기
```javascript
import apiKey from './root/file.js'
```
    
이름이 할당된 변수나 함수 불러오기
```javascript
import {apiKey, loadFn} from './root/file.js'
```
  
할당된 이름 변경하기
```javascript
import {apiKey as mainKey, loadFn} from './root/file.js'
```
  
객체로 묶어 한 번에 불러오기
```javascript
import * as utils from './root/file.js'
```