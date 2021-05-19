import { useCallback, useState } from "react";
import { IRoom } from "types/room";

export function useRoom() {
  const [room, setState] = useState<null | IRoom>(null);

  const setRoom = useCallback(
    (val: null | IRoom) => {
      setState(val);
    },
    [setState]
  );

  return { room, setRoom };
}
