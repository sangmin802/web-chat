## 📬 web-socket

### 서버 및 API

- `heroku` 를 사용하여 `socket.io` 서버 생성

### 모듈

- `Socket.io` : 서버에서 능동적으로 전달하는 값을 수신하기 위한 모듈
- `Jest`, `React-testing-library` : `Unit test`
- `styled-components` : `CSS-in-JS`

### src 디렉토리 구조

- `components` : 재활용가능한 컴포넌트 관리. 대부분 단순 `UI`를 그리기 위한 컴포넌트
- `hooks` : 기능에 따라서 추상화된 로직들을 관리
- `json` : 정적인 `json`데이터 관리
- `pages` : 각종 로직이 연결되는 최상위 컴포넌트
  > `Route` 개념
- `socket` : `socket.io` 구성 요소. 이후에 추가되는 `socket` 관련 `reducer` 도 포함
- `styles` : `global Style`
- `types` : `types`

### Components 규칙

1. `Text`, `Input`, `Button`과 같은 가장 작은 단위의 컴포넌트들은 최대한의 재사용성을 위해 기본 `Element`들을 확장하여 사용

```js
import { ButtonHTMLAttributes } from "react";
import * as Styled from "./index.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  border?: string;
}

function Button({ border = "borderless", children, ...props }: ButtonProps) {
  return (
    <Styled.Button border={border} {...props}>
      {children}
    </Styled.Button>
  );
}

export default Button;
```

2. `margin`과 같은 컨텐츠 외부에 영향을 주는 스타일들은 상위컴포넌트에서 지정
3. 최대한 추상화 단계 통일화
4. `UI`를 구성하는데 사용되는 상태값을 계산하는 로직을 최대한 `hooks`로 추상화 하여 선언형으로 사용

### useReducer

상태값 관리 `hook`을 `useState`가 아닌 `useReducer` 사용

1. 상태값이 업데이트 됨에 있어, 이전의 값과 다른 상태값에 대한 의존을 갖게되는 상황이 많아서 사용

   > 의존성 배열을 사용하는 `useEffect`, `useCallback`과 같은 라이프 사이클에서도 성능이 개선됨

### 고민사항

1. `Redux`

- 컴포넌트 구조면에서 조합을 사용하여 `props depth`에 대한 문제는 없었기 때문에, 전역 상태관리의 필요를 못느낌.
- `useReducer`로 `Redux`의 `reducer`기능을 충분히 대체 가능

2. `Redux-Saga`

- `Redux`의 사용이 강제됨
- `take`와 같은 기능으로 `connect`, `disconnect` 로직을 `flow` 형식으로 작성할 수 있을것 같음.
- `channel`기능이 `socket`과 상당히 궁합이 잘맞는다고 함.
