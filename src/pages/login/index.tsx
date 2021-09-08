import React, { useCallback, useRef } from "react";
import styled from "styled-components";

interface Props {
  connectSocket(T: string): void;
}

const Login = ({ connectSocket }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleOnSubmit = useCallback(
    e => {
      e.preventDefault();
      const userName = ref?.current?.value;
      if (userName) connectSocket(userName);
    },
    [connectSocket, ref]
  );

  return (
    <SLogin>
      <h2>Web Chat</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          ref={ref}
          type="text"
          autoComplete="off"
          placeholder="user name..."
        />
        <button>입장</button>
      </form>
    </SLogin>
  );
};

const SLogin = styled.section`
  width: 300px;
  position: relative;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);

  h2 {
    text-align: center;
  }
  form {
    border-bottom: 1px solid #222;
    input {
      display: inline-block;
      width: 80%;
      border: 0;
      outline: none;
      padding: 0.1rem 0.3rem;
    }
    button {
      display: inline-block;
      width: 20%;
      padding: 0.1rem 0.3rem;
      border: 0;
      background: #222;
      border-radius: 3px 3px 0 0;
      color: #eee;
    }
  }
`;

export default React.memo(Login);
