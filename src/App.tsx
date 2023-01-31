import * as classes from './App.module.css';

export const App = () => {
  return <>
    <header className={classes.header}>
      <h1>Seek <span>| Luke Howard</span></h1>
    </header>
    <main className={classes.main}>
      <section className={classes.pageTitlePane}>
        <h2>Checkout</h2>
      </section>
    </main>
    <footer className={classes.footer}>
      <p>Code test for Seek by Luke Howard</p>
    </footer>
  </>;
};

