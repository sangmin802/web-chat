import { useCallback, useState } from "react";

export function useLogin() {
  const [isLogin, setState] = useState(false);

  const setLogin = useCallback(
    bool => {
      setState(bool);
    },
    [setState]
  );

  return { isLogin, setLogin };
}
