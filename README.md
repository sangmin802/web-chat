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

### 🥯 room

- 🔴🔵
- [ ] 🔵 `room` 생성 버튼 클릭
  - [ ] 🔵 `roomName` 속성 지정 후 서버의 `craete room` 이벤트 호출
- [ ] 🔴 `craete room` 수신
  - [ ] 🔴 `room store class`에 `room` 정보 추가. `users` 항목에 생성자는 바로 추가
  - [ ] 🔴 모든 유저에게 생성된 `room` 정보 전달 `create room` 호출

```ts
// 대략적인 room 구조
interface room {
  creater: string;
  isJoin: boolean = false;
  roomID: string;
  roomName: string;
  // room을 생성한 사람은 users에 바로 포함
  users: { userName: string; userID: string }[];
}
```

- [ ] 🔵 `create room` 수신

  - [ ] 🔵 `room.creater`가 `socket.userID`와 동일하면, 바로 `room component` 활성화
  - [ ] 🔵 `rooms` 상태값에 해당 `room` 정보 추가

- [ ] `room` 입장 시, 메시지 리스트 초기화
- [ ] `room` 입장 시, `loby`의 새로운 유저 입장, 퇴장, 전역 메시지 이벤트 비활성화
- [ ] `room` 입장 시, `room-loby` 컴포넌트 활성화
- [ ] `room` 입장 시, 해당 `room`에 입장 메시지 알림
