import { useCallback, useRef } from "react";
interface Props {
  connectSocekt(T: string): void;
}
const Login = ({ connectSocekt }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const onSubmitHandler = useCallback(
    e => {
      e.preventDefault();
      const userName = ref?.current?.value;
      if (userName) connectSocekt(userName);
    },
    [connectSocekt, ref]
  );
  return (
    <>
      <h2>활동명 정하기</h2>
      <form onSubmit={onSubmitHandler}>
        <input ref={ref} type="text" placeholder="user name..." />
        <button>사용하기</button>
      </form>
    </>
  );
};

export default Login;
