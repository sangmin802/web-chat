import { useState, useCallback } from "react";
import { IRoom } from "types/room";

export function useRooms() {
  const [rooms, setState] = useState<IRoom[]>([]);

  const setRooms = useCallback(
    (rooms: IRoom[]) => {
      rooms.sort((a, b) => {
        if (a.isJoin) return -1;
        return 0;
      });
      setState(rooms);
    },
    [setState]
  );

  return { rooms, setRooms };
}
