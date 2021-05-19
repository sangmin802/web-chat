import { useCallback, useState } from "react";
import { IUser } from "types/user";

export function useUsers() {
  const [users, setState] = useState<null | IUser[]>(null);

  const setUsers = useCallback(
    (users: IUser[]) => {
      users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.messages.recent > b.messages.recent) return -1;
        return 0;
      });
      setState(users);
    },
    [setState]
  );

  return { users, setUsers };
}
