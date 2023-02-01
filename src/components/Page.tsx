import { PropsWithChildren } from "react";
import * as classes from "./Page.module.css";

interface PageProps {
  title: string;
}

export const Page = (props: PropsWithChildren<PageProps>) => (
  <>
    <section className={classes.titlePane}>
      <h2>{props.title}</h2>
    </section>
    <section>{props.children}</section>
  </>
);
