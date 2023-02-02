import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Page";
import { CustomerItem, getCustomers } from "../server/mockServer";

export const LoginRoute = () => {
  const [customers, setCustomers] = useState<CustomerItem[]>([]);

  useEffect(() => {
    //TODO: handle if unmounted before resolve
    getCustomers().then(setCustomers);
  }, []);

  return (
    <Page title="Customer Login">
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId}>
            <p>
              <Link to={`/checkout?customerId=${customer.customerId}`}>
                {customer.customerName}
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </Page>
  );
};
