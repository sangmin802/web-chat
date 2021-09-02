import { useEffect, useCallback } from "react";
import { socket } from "socket/index";
import { IUser, IUsers } from "types/user";
import { IChat } from "types/chat";
import { IRooms, IRoom } from "types/room";

interface Props {
  users: IUsers;
  setUsers(T: any): void;
  rooms: IRooms;
  setRooms(T: any): void;
  room: null | string;
  setRoom(T: null | string): void;
  setChat(T: any): void;
  selectedUser: IUser | null;
}

export function useAppSocket({
  setUsers,
  setRooms,
  room,
  setRoom,
  setChat,
  selectedUser,
}: Props) {
  // 방을 나갈 때, 클라이언트에 저장되어있는 방 정보를 초기화하고 새롭게 받아오도록 처리
  const leaveRoom = useCallback(
    roomID => {
      setRoom(null);

      setRooms((oldRooms: any) => {
        const newRooms: IRooms = {};
        const roomVals: any = Object.values(oldRooms);
        roomVals.forEach((room: any) => {
          if (room.roomID !== roomID) newRooms[room.roomID] = room;
        });
        return newRooms;
      });
      // setRooms(newRooms);
      socket.emit("leave room", roomID);
    },
    [setRoom, setRooms]
  );

  const goLoby = useCallback(() => {
    socket.emit("go loby");
  }, []);

  const sendRoomMessage = useCallback(({ content, roomID }) => {
    socket.emit("room message", { content, roomID });
  }, []);

  const sendPrivateMessage = useCallback(content => {
    socket.emit("private message", content);
  }, []);

  // 초기 유저리스트, 방리스트 수령, 로비로 이동시 새롭게 추가or제거된 유저나 방 수령
  useEffect(() => {
    socket.on("users", (users: IUser[]) => {
      const newUsers: IUsers = {};
      users.forEach(user => {
        user.self = false;
        if (user.userID === socket.userID) user.self = true;
        newUsers[user.userID] = user;
      });
      setUsers(newUsers);
    });

    socket.on("rooms", (rooms: IRoom[]) => {
      const newRooms: IRooms = {};
      rooms.forEach(room => (newRooms[room.roomID] = room));
      setRooms(newRooms);
    });

    socket.on("go loby", ({ newUsers, newRooms }) => {
      setRooms((oldRooms: any) => {
        const combinedRooms: IRooms = {};
        newRooms.forEach((room: IRoom) => {
          if (oldRooms[room.roomID])
            combinedRooms[room.roomID] = oldRooms[room.roomID];
          // 새로운 방 생성
          if (!oldRooms[room.roomID]) combinedRooms[room.roomID] = room;

          // 서버에서 받아온 방이 기존 rooms에 없다면 제거
        });
        return combinedRooms;
      });

      setUsers((oldUsers: any) => {
        const combinedUsers: IUsers = {};
        newUsers.forEach((user: IUser) => {
          if (oldUsers[user.userID])
            combinedUsers[user.userID] = oldUsers[user.userID];
          if (!oldUsers[user.userID]) combinedUsers[user.userID] = user;
        });
        return combinedUsers;
      });
    });

    return () => {
      socket.off("users");
      socket.off("rooms");
      socket.off("go loby");
    };
  }, [setRooms, setUsers]);

  const onJoinRoom = useCallback(
    ({ roomUsers, userID, userName, roomID }) => {
      setRooms((oldRooms: any) => {
        const targetRoom = { ...oldRooms[roomID] };
        const joinSelf = socket.userID === userID;
        targetRoom.isJoined = true;
        const newUsers = roomUsers.map((roomUser: IUser) => {
          roomUser.self = false;
          if (roomUser.userID === socket.userID) roomUser.self = true;
          return roomUser;
        });

        targetRoom.users = newUsers;
        targetRoom.messages.push({
          content: `${userName}님이 입장하셨습니다.`,
        });
        const newRooms = { ...oldRooms, [roomID]: targetRoom };
        if (joinSelf) setRoom(roomID);
        return newRooms;
      });
    },
    [setRoom, setRooms]
  );

  const onLeaveRoom = useCallback(
    ({ roomUsers, userName, roomID }) => {
      setRooms((oldRooms: any) => {
        const targetRoom = { ...oldRooms[roomID] };
        if (!targetRoom) return;
        targetRoom.users = roomUsers;
        targetRoom.messages.push({
          content: `${userName}님이 퇴장하셨습니다.`,
        });
        const newRooms = { ...oldRooms, [roomID]: targetRoom };
        return newRooms;
      });
    },
    [setRooms]
  );

  const onRoomMessage = useCallback(
    ({ message, roomID }) => {
      setRooms((oldRooms: any) => {
        const targetRoom = { ...oldRooms[roomID] };
        targetRoom.messages.push(message);
        if (!room) targetRoom.hasNewMessages++;
        const newRooms = { ...oldRooms, [roomID]: targetRoom };
        return newRooms;
      });
    },
    [setRooms, room]
  );

  // 룸 상태에 대한 감지는 지속적으로
  useEffect(() => {
    socket.on("join room", ({ roomUsers, userID, userName, roomID }) => {
      onJoinRoom({ roomUsers, userID, userName, roomID });
    });

    socket.on("leave room", ({ roomUsers, userName, roomID }) => {
      onLeaveRoom({ roomUsers, userName, roomID });
    });

    socket.on("room message", ({ message, roomID }) => {
      onRoomMessage({ message, roomID });
    });

    return () => {
      socket.off("join room");
      socket.off("leave room");
      socket.off("room message");
    };
  }, [onJoinRoom, onLeaveRoom, onRoomMessage]);

  const onStorePrivateMessage = useCallback(
    (fromSelf, message) => {
      setChat((oldChats: any) => {
        const chat = { ...message, fromSelf };
        return [...oldChats, chat];
      });

      if (!room) return;

      setRooms((oldRooms: any) => {
        const newRooms = { ...oldRooms };
        newRooms[room].messages.push({ ...message, fromSelf });
        return newRooms;
      });
    },
    [setRooms, setChat, room]
  );

  const onCountingPrivateMessage = useCallback(
    message => {
      setUsers((oldUsers: any) => {
        const newUsers = { ...oldUsers };
        const targetUser = newUsers[message.from.userID];
        if (selectedUser?.userID !== targetUser.userID) {
          targetUser.messages.hasNewMessages++;
          targetUser.messages.recent = new Date();
        }
        return newUsers;
      });
    },
    [setUsers, selectedUser]
  );

  // 귓속말은 상시 감지
  useEffect(() => {
    socket.on("private message", message => {
      const fromSelf = message.from.userID === socket.userID ? true : false;
      onStorePrivateMessage(fromSelf, message);
      if (fromSelf) return;
      onCountingPrivateMessage(message);
    });

    return () => {
      socket.off("private message");
    };
  }, [onStorePrivateMessage, onCountingPrivateMessage]);

  // userID 할당 및 소킷 종료
  useEffect(() => {
    socket.on("session", userID => {
      socket.userID = userID;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    sendRoomMessage,
    sendPrivateMessage,
    leaveRoom,
    goLoby,
  };
}
