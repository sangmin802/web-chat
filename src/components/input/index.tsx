import { forwardRef, InputHTMLAttributes } from "react";
import * as Styled from "./index.style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => (
  <Styled.Input ref={ref} {...props} />
));

export default Input;
