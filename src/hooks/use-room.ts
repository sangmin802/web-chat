import { useCallback, useState } from "react";

export function useRoom() {
  const [room, setState] = useState<null | string>(null);

  const setRoom = useCallback(
    (roomID: null | string) => {
      setState(roomID);
    },
    [setState]
  );

  return { room, setRoom };
}
