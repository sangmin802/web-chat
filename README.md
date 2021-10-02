## 🍑 web-socket

- socket.io
- React.js
- node.js
- gh-pages
- heroku

## 🍎 server express + socket.io

- [web-chat-server](https://github.com/sangmin802/web-chat-server)

## 🍖 socket.io 네임스페이스 갯수

### 🍻 2개

1. `/loby`
2. `/rooms`

### 🍺 1개

1. `/chat`

- 본래는 두개의 네임스페이스로 `loby`와 `rooms` 의 `socket.io` 서버를 구분할 까 하다가, 그냥 하나의 서버를 사용하고 `loby` 컴포넌트 언마운트시, 전체채팅 이벤트에 대한 연결을 취소하고, 귓속말을 위한 `userID room`을 `leave` 하는게 더 나을듯 함.

## 📁 구조

- 🔴 : 서버
- 🔵 : 클라이언트

### 🍭 log-in

- 사용자의 아이디를 지정하는 컴포넌트

### 🥝 loby

- 유저리스트, 방리스트, 전체채팅·귓속말 내용 출력
- 모든 유저와 전체채팅을 하는 컴포넌트
- 특정 유저와 귓속말을 할 수 있는 컴포넌트
  > 메시지 내용을 동일한 `view`에 노출시키지만, 색상을 다르게
- 기본 `/`의 `socket.io` 서버가 아닌 커스텀 네임스페이스 `/loby`를 사용하여 서버를 생성하도록 함.
- 컴포넌트 언마운트 시 해당 네임스페이스의 서버는 종료시켜서 새로운 메시지 알람을 받지 않도록 함
- `/loby` 서버에서는 사용자의 `userID`를 `room`으로 생성하여 원하는 `userID`에게만 메시지를 전달할 수 있도록 함
  > `io.of('/loby').to(userID).emit`?
- 전체채팅의 경우 모든 사용자가 볼 수 있도록 메시지 전달
  > `io.of('/loby').emit`?
- `loby` 컴포넌트 마운트 시, 해당 네임스페이스의 서버에 접속한 모든 유저 인스턴스를 받아와 좌측에 출력
- `loby` 컴포넌트 마운트 시, `socket.io`의 `/rooms` 네임스페이스 서버에 등록된 모든 `room`들을 받아와 우측 상단에 출력
  > 내가 참여중인 방과, 개설된 방 구분
- 참여중인 방의 경우, 새로운 메시지 수신 시 새로운 메시지 갯수 노출
  > 카카오톡처럼
- 생성되어있는 `room` 클릭 시, `/rooms` 의 room에 `join`

  > `socket.join(room)`?

- [x] 🔴 `socket middleware`를 통해, `socket.id`를 `socket.userID`와 동일하게하여 추후 `room`에 `join`중인 `socket.id`로 `userStore`를 조회할 수 있도록 함
- [x] 🔵 `loby` 컴포넌트에서만 방생성, 방삭제, 유저접속을 수신함 `room`에서는 감지 못함.
- [x] 🔵 `join`한 `room`에 한해서 `room`과 `loby` 모두 `room message`, `join room`, `leave room`을 감지할 수 있음
- [x] 🔵 `room`이동시, `private messages`는 해당 `room`에서도 보이도록 함
- [x] 🔵 `private message`는 `loby` `room` 모두 가능하며, 귓속말 첨자인 `~에게` 클릭 시, `selected user` 활성화
- [x] 🔵 초기 로그인을 제외하고, `loby`컴포넌트가 마운트 될 때마다, 서버에서 유저리스트와 방리스트를 받아옴
  - [x] 🔵 단 방리스트의 경우, `room message`, `join room`, `leave room`과같은 변화를 반영하고있는 클라이언트의 방리스트와 `delete`, `create`를 반영한 서버의 방리스트를 융합하기 위해 서버측 방 리스트를 순회하여 `roomID` 클라이언트 방 리스트를 매칭시키고, 새로운 방이라면 서버의 방을 사용. 제거된 방이라면 자연스럽게 매칭 안되게 함
- [x] 🔵 메시지는 최 하단에서부터 채워나가는 방식.

### 🥯 room

- [x] 🔵 방 생성을 위해 `room` 생성 버튼 클릭

  - [x] 🔵 `roomName` 속성 지정 후 서버의 `create room` 이벤트 호출
    > 구현에 있어서는 일단 `roomID`로 `roomName` 대체

- [x] 🔴 `create room` 수신

  - [x] 🔴 `room store class`에 `room` 정보 추가
  - [x] 🔴 모든 유저에게 생성된 `room` 정보 전달을 위한 `room created` 호출

```ts
// 대략적인 room 구조
// 클라이언트에서 rooms는 new Map으로 관리
interface room {
  creater: string;
  isJoined: boolean = false;
  roomID: string;
  roomName: string;
  hasNewMessages: 0;
}
```

- [x] 🔵 `room created` 수신

  - [x] 🔵 `room.creater`가 `socket.userID`와 동일하면 `join room` 바로 호출
  - [x] 🔵 `rooms` 상태값에 해당 `room` 정보 추가

- [x] 🔵 방에 들어가기 위해 `join room` 호출

  - [x] 🔵 만약 이미 참여해서 `isJoined : true` 라면 `room-loby` 컴포넌트만 활성화
  - [x] 🔵 `isJoined : false` 라면 `join room socket event emit`

- [x] 🔴 `join room` 수신

  - [x] 🔴 호출한 `socket.userID`는 `socket.join(roomID)`로 참가
  - [x] 🔴 현재 해당 `roomID`에 접속중인 다른 `socket`들을 찾고, `userStore`에서 검색하여 전달
  - [x] 🔴 추가된 클라이언트 정보 전달. `join room` 호출
  - [x] 🔴 해당 `roomID`에 가입한 유저들에게만 `.to('roomID').emit`으로 입장 메시지 알림 `room message`

- [x] 🔵 `join room` 수신

  - [x] 🔵 `room`에 접속한 `userID`가 `socket.userID`와 동일, 즉 나 이고, `isJoined : false`상태라면 `isJoined : true`로 변경
  - [x] 🔵 `room`에 접속한 `userID`가 `socket.userID`와 동일, 즉 나라면 `room-loby` 컴포넌트 활성화
  - [x] 🔵 `room` 정보에 현재 `join`되어있는 `socket`들을 할당
  - [x] 🔵 `rooms` 상태값에 해당 `room` 정보 추가

- [x] 🔵 방 나가기.

  - [x] 🔵 방 `join` 상태는 유지하며, 로비로만 이동할 경우 `setRoom(null)`
  - [x] 🔵 방 `join` 상태 자체를 해지할 경우, `roomID`를 `leave rom` 이벤트로 `emit`
  - [x] 🔵 내가 해당 `room`의 유일한 참가자라면 나가기와 동시에 `delete room`
  - [x] 🔴 `delete room` 호출 시, `roomStore`에서 해당 `room` 제거한 뒤, 제거한 `roomID` 동일한 이벤트명으로 모든 클라이언트에 전달

- [x] 🔴 `leave room` 수신

  - [x] 🔴 해당 `roomID`에 대한 `socket.leave` 실행
  - [x] 🔴 퇴장한 클라이언트 정보 정보 `leave room` 이벤트로 클라이언트에 전달 및, 해당 `roomID`에 퇴장알림 전달

- [x] 🔵 `leave room` 수신

  - [x] 🔵 퇴장한 `userID`가 자신의 `socket.userID`와 동일하고 `isJoined : true`상태라면 `isJoined : false`로 변경
  - [x] 🔵 해당 `room`의 속성값들 모두 초기화`(messages, hasNewMessages ...)`
  - [x] 🔵 `rooms` 상태값 변경. 만약, `isJoined : false`로 바뀐 클라이언트라면, `room-loby`컴포넌트 비활성화

- [x] 🔵 `roomID`와 함께`room`에 메시지 전달

- [x] 🔴 `room message` 수신

  - [x] 🔴 해당 `roomID`에 메시지 내용 전달. 발신자는 `socket.userID`

- [x] 🔵 `room message` 수신

  - [x] 🔵 해당 `room`의 `messages`에 추가
  - [x] 🔵 현재 선택된 `room`이 아니라면, `hasNewMessages` 카운팅

- [x] 🔴 컴포넌트 언마운트 시, 모든 `room`에서 `leave` 및, `leave room` 알림
- [x] 🔴 컴포넌트 언마운트 시, 나만 남아있던 `room`이였다면, 해당 `room` 삭제

## 발생했던 문제 및 해결

### 상태값 hook

상태값이 업데이트 되는데에 이전의 상태값이나 다른 상태값을 참조해야하는 경우가 많기 때문에 `useReducer`를 사용하여 `action`에 따라 상태값을 업데이트 하도록 함.

> 이 방법으로, `chat` 특성상 상태값이 자주 업데이트 되는데, 이로 인한 `useCallback`이나 `useEffect`등이 불필요하게 여러번 호출되는 상황 제거
