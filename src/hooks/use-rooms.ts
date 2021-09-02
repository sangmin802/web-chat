import { useState, useCallback } from "react";
import { IRooms } from "types/room";

export function useRooms() {
  const [rooms, setRooms] = useState<IRooms>({});

  // const setRooms = useCallback(
  //   (rooms: IRooms) => {
  //     setState({ ...rooms });
  //   },
  //   [setState]
  // );

  return { rooms, setRooms };
}
