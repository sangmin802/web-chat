import { useCallback, useState } from "react";
import { IUser } from "types/user";

export function useSelectUser() {
  const [selectedUser, setState] = useState<null | IUser>(null);

  const setSelectedUser = useCallback(
    (user: null | IUser) => {
      setState(user);
    },
    [setState]
  );

  return { selectedUser, setSelectedUser };
}