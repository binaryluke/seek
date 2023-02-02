import { Outlet, Link } from "react-router-dom";
import * as classes from "./App.module.css";

export const App = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/">Seek</Link> <span>| Luke Howard</span>
        </h1>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <p>Code test for Seek by Luke Howard</p>
      </footer>
    </>
  );
};
