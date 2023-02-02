/* This code in this provider is just a mock, as the focus of the code test is not on authentication.
 * I have chosen to put provide the mock inside an Auth provider with a useUser hook as that pattern/interface is common.
 * From here a real app would implement their auth flows using http only cookies/jwt tokens etc without breaking
 * the interface */

import { createContext, PropsWithChildren, useContext } from "react";
import { useSearchParams } from "react-router-dom";

// Obviously can't access the db direct in real app, just for mock data, see comment at top of file
import { database } from "../server/mockDatabase";

interface AuthContext {
  customerId: number;
  customerName: string;
}

const AuthContext = createContext<AuthContext>({
  customerId: 0,
  customerName: "Default",
});

export const AuthProvider = (props: PropsWithChildren<{}>) => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");
  const changeCustomer = (customerId: number) => {
    searchParams.set("customerId", String(customerId));
  };
  // Just mocking so any customer id we don't recnogise just use the default user
  const user =
    database.customers.find((customer) => customer.id === Number(customerId)) ||
    database.customers[0];
  const value = {
    customerId: user.id,
    customerName: user.name,
    changeCustomer,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useCustomer = () => {
  return useContext(AuthContext);
};
