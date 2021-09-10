import { useCallback } from "react";
import { Text } from "components";
import * as Styled from "./index.style";

interface IUser {
  userID: string;
  userName: string;
  messages: {
    hasNewMessages: number;
  };
}

interface UserProps<T> {
  user: T;
  togglePrivateMessage(T: string): void;
  joinedUser: T | null;
}

function User<T extends Partial<IUser>>({
  user,
  togglePrivateMessage,
  joinedUser,
}: UserProps<T>) {
  const onClickHandler = useCallback(() => {
    if (!user.userID) return;
    togglePrivateMessage(user.userID);
  }, [togglePrivateMessage, user]);

  return (
    <Styled.User
      isPrivate={user.userID === joinedUser?.userID}
      onClick={onClickHandler}
    >
      <Text>{user.userName}</Text>
      {user.messages && user.messages.hasNewMessages !== 0 && (
        <Styled.HasNewMessages>
          <Text type="white">{user.messages.hasNewMessages}</Text>
        </Styled.HasNewMessages>
      )}
    </Styled.User>
  );
}

export default User;
