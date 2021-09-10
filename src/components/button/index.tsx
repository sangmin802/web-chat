import { ButtonHTMLAttributes } from "react";
import * as Styled from "./index.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  border?: string;
}

function Button({ border = "borderless", children, ...props }: ButtonProps) {
  return (
    <Styled.Button border={border} {...props}>
      {children}
    </Styled.Button>
  );
}

export default Button;
