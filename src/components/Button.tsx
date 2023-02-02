import { ComponentPropsWithoutRef } from "react";
import * as classes from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}
export const Button = (props: ButtonProps) => {
  const className = [classes.btn, props.className ? props.className : ""].join(
    " "
  );

  return (
    <button {...props} className={className}>
      {props.children}
    </button>
  );
};
