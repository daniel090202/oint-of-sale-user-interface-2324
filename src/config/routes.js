const routes = {
  home: "/",
  transaction: {
    home: "/transaction",
    confirm: "/transaction/confirm",
  },
  customer: {
    history: "/history/customerID",
    order: "/customerID/orderID",
  },
  management: {
    home: "/management",
    report: "/management/report",
    accounts: "/management/accounts",
    products: "/management/products",
    customers: "/management/customers",
  },
  profile: {
    home: "/profile",
    me: "/profile/me",
    distribution: "/profile/distribution",
    keeping: "/profile/keeping",
    settings: "/profile/settings",
  },
  register: "/register",
  schedule: "/schedule",
  signIn: "/signin",
  details: {
    accounts: "/account/accountID",
    products: "/product/barcode",
    customers: "/customer/customerID",
  },
};

export default routes;
