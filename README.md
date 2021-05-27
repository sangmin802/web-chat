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

### 서버의 이벤트 호출 매우 짧은시간내에 중첩

- 실시간 동일한 상태값을 변경하면서, 매우 빠른 시간내에 다시 실행된다면 `useCallback`으로 참조하고 있는 상태값이 최신상태를 유지하지 못하는 상황이 발생했음.
  > `a` 메소드를 통해, 업데이트된것을 바로 이후에 실행되는 `b` 메소드에서는 구형의 상태값을 사용함
- `a` 라는 상태값을 변경시키는 메소드들의 경우, 일정 시간 내에 실행된다면 모두 변화가 없는 같은 상황의 상태값을 순차적으로 사용하도록 처리함.

  1. `useMemo`로 현재의 상태값을 기억하는 인스턴스 생성

  ```ts
  // debounce class
  export class Debounce {
    timer: any;
    newState: any;
    setState: any;
    arr: any[] = [];
    time: number = 0;

    constructor(state: any, setState: Function, t: number) {
      this.newState = state;
      this.setState = setState;
      this.time = t;
    }

    doWork() {
      this.arr.forEach(work => {
        work();
      });
      this.setState(this.newState);
    }

    debounceAct(work: any) {
      if (this.timer) {
        console.log("새로운 작업이 추가되었습니다.");
        clearTimeout(this.timer);
      }
      this.arr.push(work);
      this.timer = setTimeout(() => {
        this.doWork();
        this.arr = [];
      }, this.time);
    }
  }

  // debounce instance
  const roomsDebounce = useMemo(
    () => new Debounce(rooms, setRooms, 0),
    [rooms, setRooms]
  );
  ```

  2. `a` 메소드가 실행된 다음 특정 시간 내 `b` 메소드가 실행되면 작업 배열에 담기.
  3. 특정 시간 내 다른 요청이 접수되지 않을 경우 기억해놓은 상태값을 작업배열이 순차적으로 진행

  ```ts
  // 실제 사용 work 하나
  const onRoomCreated = useCallback(
    (room: IRoom) => {
      roomsDebounce.debounceAct(() => {
        if (room.creater === socket.userID) joinRoom(room.roomID);
        const newRooms = { ...roomsDebounce.newState, [room.roomID]: room };
        roomsDebounce.newState = newRooms;
      });
    },
    [roomsDebounce, joinRoom]
  );
  ```

  4. 인스턴스 내에 기억해놓은 상태값을 최신으로 변경시킴
  5. 이후에 일괄 `setState` 처리 하여, `useMemo`를 통해 최신의 상태값을 기억하는 인스턴스 생성

#### 예상되는 문제

아직 테스트중에 발생하지는 않고있지만, 혹시나 이런문제도 생길수 있지 않나 생각해본다.

1. 누적된 작업을 처리하는 아주 짧은 시간에 새로운 작업이 또 들어옴
2. 아직 상태값이 완전히 변경되지 않은 상태에서 또 작업이 쌓이게 됨
3. 상태값이 변경되면서 새로운 인스턴스를 생성하여 쌓이 작업들이 초기화되거나 혹은, 구형의 상태값을 사용하여 작업을 함

#### 예상 해결

반영 x

1. 상태값 할당을 인스턴스 생성단계가 아닌, 생성된 인스턴스에 상태값이 변경될 때 마다 최신화하도록 함. 방법은 인스턴스 내부 함수를 통해 진행. 이 내부함수에는 상태값을 최신화하는 구문과, 상태값이 최신화 되었다는 `boolean` 속성을 `true`로 변경함.
   > 인스턴스 자체는 재생성되는 경우가 없게되므로, 누적되는 작업배열이 초기화되지 않음.
2. 여러 요청들로 작업들은 누적되지만, 만약 `boolean`속성이 `false`라면 `setTimeout`을 실행시키지 않고, 작업만 누적시킴.
3. 작업들이 진행되면 `boolean`은 `false`로 변경
4. 이전의 `work`배열에 담긴 작업들이 완료되고, `setState`를 통해 상태값이 변경되면 내부함수가 최신화 된 상태값을 받아오고, `boolean`속성을 `true`로 변경하고, 아무것도 실행시키지 않는 빈 작업으로 인스턴스를 깨워서 `setTimeout`이 실행되도록 함.
