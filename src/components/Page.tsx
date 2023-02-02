import { PropsWithChildren } from "react";
import * as classes from "./Page.module.css";

interface PageProps {
  title: string;
  className?: string;
}

export const Page = (props: PropsWithChildren<PageProps>) => {
  const contentClassName = [
    classes.contentPane,
    props.className ? props.className : "",
  ].join(" ");

  return (
    <div className={classes.page}>
      <section className={classes.titlePane}>
        <h2>{props.title}</h2>
      </section>
      <section className={contentClassName}>{props.children}</section>
    </div>
  );
};
