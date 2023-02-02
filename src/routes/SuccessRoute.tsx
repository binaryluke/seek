import { Link } from "react-router-dom";
import { Page } from "../components/Page";

export const SuccessRoute = () => <Page title="Success">
  <Link to="/">Start Over</Link>
</Page>;
