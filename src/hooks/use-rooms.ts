import { useState, useCallback } from "react";
import { IRooms } from "types/room";

export function useRooms() {
  const [rooms, setState] = useState<IRooms>({});

  const setRooms = useCallback(
    (rooms: IRooms) => {
      // rooms.sort((a, b) => {
      //   if (a.isJoined) return -1;
      //   return 0;
      // });
      // setState(rooms);
      setState(rooms);
    },
    [setState]
  );

  return { rooms, setRooms };
}
