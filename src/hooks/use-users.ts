import { useCallback, useState } from "react";
import { IUser } from "types/user";

export function useUsers() {
  const [users, setState] = useState<null | IUser[]>(null);

  const setUsers = useCallback(
    (users: IUser[]) => {
      setState(users);
    },
    [setState]
  );

  const setUser = useCallback(
    (user: IUser) => {
      setState([...(users as IUser[]), user]);
    },
    [users, setState]
  );

  const removeUser = useCallback(
    (userID: string) => {
      const filterdUser = users?.filter(user => user.userID !== userID);
      setState(filterdUser as IUser[]);
    },
    [users, setState]
  );

  return { users, setUsers, setUser, removeUser };
}
