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

- [ ] 🔵 방 생성을 위해 `room` 생성 버튼 클릭

  - [ ] 🔵 `roomName` 속성 지정 후 서버의 `craete room` 이벤트 호출

- [ ] 🔴 `craete room` 수신

  - [ ] 🔴 `room store class`에 `room` 정보 추가
  - [ ] 🔴 모든 유저에게 생성된 `room` 정보 전달을 위한 `room created` 호출

```ts
// 대략적인 room 구조
interface room {
  creater: string;
  isJoined: boolean = false;
  roomID: string;
  roomName: string;
  users: { userName: string; userID: string }[];
  messages: { content: string; from: string }[];
}
```

- [ ] 🔵 `room created` 수신

  - [ ] 🔵 `room.creater`가 `socket.userID`와 동일하면 `join room` 바로 호출
  - [ ] 🔵 `rooms` 상태값에 해당 `room` 정보 추가

- [ ] 🔵 방에 들어가기 위해 `join room` 호출

- [ ] 🔴 `join room` 수신

  - [ ] 🔴 호출한 `socket.userID`는 `socket.join(roomID)`로 참가
  - [ ] 🔴 `room store`에 해당 `roomID`의 `users`에 해당 `socket` 유저 정보 추가
  - [ ] 🔴 수정된 `room`을 클라이언트에게 반환. `update room` 호출
  - [ ] 🔴 해당 `roomID`에 가입한 유저들에게만 `.to('roomID').emit`으로 입장 메시지 알림 `room message`

- [ ] 🔵 `update room` 수신

  - [ ] 🔵 받아온 새로운 `room` 의 `users`에 자신인 `socket.id`가 들어있다면 `isJoined : true`로 변경
  - [ ] 🔵 `rooms` 상태값에 해당 `room` 정보 추가

- 메시지 수신관련 추가필요
