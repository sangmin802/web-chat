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
  - [ ] 🔴 현재 해당 `roomID`에 접속중인 다른 `socket`들을 찾고, `userStore`에서 검색하여 전달
  - [x] 🔴 추가된 클라이언트 정보 전달. `join room` 호출
  - [x] 🔴 해당 `roomID`에 가입한 유저들에게만 `.to('roomID').emit`으로 입장 메시지 알림 `room message`

- [x] 🔵 `join room` 수신

  - [x] 🔵 `room`에 접속한 `userID`가 `socket.userID`와 동일, 즉 나 이고, `isJoined : false`상태라면 `isJoined : true`로 변경
  - [x] 🔵 `room`에 접속한 `userID`가 `socket.userID`와 동일, 즉 나라면 `room-loby` 컴포넌트 활성화
  - [ ] 🔵 `room` 정보에 현재 `join`되어있는 `socket`들을 할당
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

### 서버의 이벤트 호출 매우 짧은시간내에 중첩

- [x] 🔴 컴포넌트 언마운트 시, 나만 남아있던 `room`이였다면, 해당 `room` 삭제

해당 문제에 있어, 여러개의 방이 동시에 지워지도록 한다면 `socket.off`를 하고 다시 이벤트를 `socket.on` 하는 속도가 서버에서 보내는 이벤트 속도를 따라가질 못하여 몇몇개는 남는 상황임

따라서, 시간 내에 요청이 들어온다면 작업을 멈추는 `debounce`사용

- `delete room` 파트

```ts
// 누적된 작업을 받아와서 일괄 처리함
const deleteRoom = useCallback(
  arr => {
    const newRooms: IRooms = {};
    const roomVals = Object.values(rooms);
    roomVals.forEach(room => {
      if (arr.includes(room.roomID)) return;
      newRooms[room.roomID] = room;
    });
    setRooms(newRooms);
  },
  [rooms, setRooms]
);

// 작업콜백함수와 시간을 갖고있는 debounce 메소드 반환
const deleteDebounceAct = useMemo(() => debounce(deleteRoom, 20), [deleteRoom]);

useEffect(() => {
  // delete room 호출로 roomID를 서버에서 받아오면 debounce 클로져에서 작업을 배열에 담음
  // setTimeout으로 지정한 대기시간 내에 새로운 요청이 들어온다면
  // 기존의 것은 clearTimeout 하고, 배열에 새 작업을 담고 다시 setTimout돌림
  // 이후 반복
  socket.on("delete room", deleteDebounceAct);
  return () => {
    socket.off("delete room");
  };
}, [deleteDebounceAct]);
```

- `debounce` 파트

```ts
export function debounce(cb: any, t: number) {
  let timer: any;
  const arr: any[] = [];
  function debounceAct(work: any) {
    if (timer) {
      console.log("새로운 요청으로 인해 대기합니다");
      clearTimeout(timer);
    }
    arr.push(work);
    timer = setTimeout(() => {
      cb(arr);
    }, t);
  }
  return debounceAct;
}
```
