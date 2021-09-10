import React, { useCallback, useRef } from "react";
import { Input, Button, Text } from "components";
import * as Styled from "./index.style";

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
    <Styled.Login>
      <Styled.Title>Web Chat</Styled.Title>
      <Styled.Form onSubmit={handleOnSubmit}>
        <Styled.Input>
          <Input
            ref={ref}
            type="text"
            autoComplete="off"
            placeholder="user name..."
          />
        </Styled.Input>
        <Styled.Button>
          <Button border="border">입장</Button>
        </Styled.Button>
      </Styled.Form>
    </Styled.Login>
  );
};

export default React.memo(Login);
