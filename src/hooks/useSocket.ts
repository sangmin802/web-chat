import { useReducer, useCallback, Reducer, useEffect } from "react";
import { socket } from "socket/index";
import * as Action from "socket/action";
import { socketReducer, initialState } from "socket/reducer";
import { ReducerAction } from "socket/action";

export function useSocket(
  setLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [state, setState] = useReducer<
    Reducer<typeof initialState, ReducerAction>
  >(socketReducer, initialState);
  const { joinedRoomID } = state;

  const handleGoLoby = useCallback(() => {
    setLoading(true);
    socket.emit("go loby");
  }, [setLoading]);

  const handleToggleJoinedUser = useCallback(userID => {
    if (userID === socket.userID) return;
    setState({ type: Action.TOGGLE_JOINED_USER, userID });
  }, []);

  const handleSendRoomMessage = useCallback(({ content, roomID }) => {
    socket.emit("room message", { content, roomID });
  }, []);

  const handleSendPrivateMessage = useCallback(content => {
    socket.emit("private message", content);
  }, []);

  const handleSendPublicMessage = useCallback(content => {
    socket.emit("public message", content);
  }, []);

  const handleCreateRoom = useCallback(() => {
    socket.emit("create room");
  }, []);

  const handleJoinRoom = useCallback(roomID => {
    socket.emit("join room", roomID);
  }, []);

  const handleEnterRoom = useCallback(roomID => {
    setState({ type: Action.ENTER_ROOM, roomID });
  }, []);

  const handleLeaveRoom = useCallback(roomID => {
    socket.emit("leave room", roomID);
  }, []);

  const handleConnectSocket = useCallback(
    userName => {
      setLogin(true);
      setLoading(true);
      socket.auth = { userName };
      socket.connect();
    },
    [setLogin, setLoading]
  );

  useEffect(() => {
    socket.on("session", userID => {
      socket.userID = userID;
    });

    socket.on("users rooms", ({ users, rooms }) => {
      setLoading(false);
      setState({ type: Action.SET_USERS_ROOMS, users, rooms });
    });

    socket.on("join room", ({ roomUsers, userID, userName, roomID }) => {
      setState({ type: Action.JOIN_ROOM, roomUsers, userID, userName, roomID });
    });

    socket.on(
      "leave room",
      ({ roomUsers, userID, userName, roomID, users, rooms }) => {
        setLoading(false);
        setState({
          type: Action.LEAVE_ROOM,
          roomUsers,
          userID,
          userName,
          roomID,
          users,
          rooms,
        });
      }
    );

    socket.on("room message", ({ message, roomID }) => {
      setState({ type: Action.ROOM_MESSAGE, message, roomID });
    });

    socket.on("private message", message => {
      setState({ type: Action.PRIVATE_MESSAGE, message });
    });

    return () => {
      socket.disconnect();
    };
  }, [setLoading]);

  useEffect(() => {
    if (!joinedRoomID) {
      socket.on("room created", room => {
        setState({ type: Action.CREATE_ROOM, room });
      });

      socket.on("delete room", roomID => {
        setState({ type: Action.DELETE_ROOM, roomID });
      });

      socket.on("public message", message => {
        setState({ type: Action.PUBLIC_MESSAGE, message });
      });

      socket.on("user connected", user => {
        setState({ type: Action.USER_CONNECTED, user });
      });

      socket.on("user disconnected", ({ userID, userName }) => {
        setState({ type: Action.USER_DISCONNECTED, userID, userName });
      });
    }

    return () => {
      socket.off("room created");
      socket.off("delete room");
      socket.off("public message");
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [joinedRoomID]);

  return {
    state,
    handleGoLoby,
    handleEnterRoom,
    handleToggleJoinedUser,
    handleSendRoomMessage,
    handleSendPrivateMessage,
    handleSendPublicMessage,
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    handleConnectSocket,
  };
}
