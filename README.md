## web-socket

- socket.io
- React.js
- node.js
- gh-pages
- heroku

## socket.io 네임스페이스 갯수

- `/loby`
- `/rooms`

## 구조

### log-in

- 사용자의 아이디를 지정하는 컴포넌트
- <b style="color : tomato">아이디 저장여부는 고민</b>

### loby

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

### room

- `room` 컴포넌트 입장 시, `loby` 네입스페이스의 서버에 대한 메시지 수신 등은 모두 받지 않도록 `disconnect`
- 해당 `room`에 참여중인 사용자 리스트 좌측에 출력
- 새로운 사용자 입장 시, 알림
- 새로운 사용자가 방에 입장하거나 기존 사용자가 떠났을 때, 나를 제외한 사용자에게 알림
  > `io.of('/rooms').to('room').broadcast`?
- <b style="color : tomato">해당 `room`에 대한 대화내용 저장 여부는 고민중</b>
- 방 나가기의 경우 해당 `room`에서 떠나기. 앞으로 해당 `room`에 대한 알림은 받지 않는 완전한 이별
  > `socket.leave(room)`?
- 로비로 이동시 해당 `room` 컴포넌트 언마운트
  > 해당 `room`에는 여전히 `join`된 상태

<b style="color : tomato">해당 `room`에 대한 대화내용 저장 여부는 고민중</b>

- <b style="color : tomato">해당 `room`에 대한 대화내용 저장 여부는 고민중</b>
