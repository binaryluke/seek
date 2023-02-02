import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";
import { CustomerItem, getCustomers } from "../server/mockServer";
import * as classes from "./LoginRoute.module.css";

export const LoginRoute = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);

  useEffect(() => {
    //TODO: handle if unmounted before resolve
    getCustomers().then(setCustomers);
  }, []);

  return (
    <Page className={classes.loginRoute} title="Customer Login">
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId}>
            <Link to={`/checkout?customerId=${customer.customerId}`}>
              <p>{customer.customerName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};
