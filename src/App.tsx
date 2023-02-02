import { Outlet, Link, useMatch } from "react-router-dom";
import { useCustomer } from "./providers/AuthProvider";
import * as classes from "./App.module.css";

export const App = () => {
  const { customerName } = useCustomer();
  const isCheckoutRoute = useMatch("/checkout");

  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to="/">Seek</Link> <span>| Luke Howard</span>
        </h1>
        {isCheckoutRoute && <p>Welcome back, {customerName}</p>}
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <p>Code test for Seek by Luke Howard</p>
        <p>
          <a href="https://github.com/binaryluke/seek">View code on Github</a>
        </p>
      </footer>
    </>
  );
};
