import { useCallback, useState } from "react";
import { IUsers } from "types/user";

export function useUsers() {
  const [users, setState] = useState<IUsers>({});

  const setUsers = useCallback(
    (users: IUsers) => {
      setState(users);
    },
    [setState]
  );

  return { users, setUsers };
}
