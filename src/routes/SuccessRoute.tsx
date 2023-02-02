import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { emptyAllCarts } from "../server/mockServer";
import * as classes from "./SuccessRoute.module.css";

export const SuccessRoute = () => {
  useEffect(() => {
    emptyAllCarts();
  }, []);

  return (
    <Page className={classes.successRoute} title="Success">
      <Link to="/">
        <Button>Start Over</Button>
      </Link>
    </Page>
  );
};
