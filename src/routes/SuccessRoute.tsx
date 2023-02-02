import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";
import { emptyAllCarts } from "../server/mockServer";

export const SuccessRoute = () => {
  useEffect(() => {
    emptyAllCarts();
  }, []);

  return (
    <Page title="Success">
      <Link to="/">Start Over</Link>
    </Page>
  );
};
