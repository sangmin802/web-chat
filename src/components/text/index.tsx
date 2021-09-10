import { HTMLAttributes } from "react";
import * as Styled from "./index.style";

interface TextProps extends HTMLAttributes<HTMLDivElement> {
  type?: string;
}

function Text({ children, type, ...props }: TextProps) {
  return (
    <Styled.Text type={type} {...props}>
      {children}
    </Styled.Text>
  );
}

export default Text;
