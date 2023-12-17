import Home from "../pages/Home";
import Me from "../pages/Profile/Me";
import Report from "../pages/Report";
import SignIn from "../pages/SignIn";
import Profile from "../pages/Profile";
import Transaction from "../pages/Transaction";
import Confirm from "../pages/Transaction/Confirm";
import Distribution from "../pages/Profile/Distribution";

import { Details } from "../layouts/components";

import Management, { Accounts, Products, Customers } from "../pages/Management";

import History from "../pages/Management/Customers/History";
import Order from "../pages/Management/Customers/Order";

import Settings from "../components/Settings";

import Register from "../layouts/components/Register";

import { SideBarLayout } from "../layouts";

import config from "../config";

import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sideBarRoutes = {
  management: [
    {
      admin: false,
      active: true,
      title: "Analytics",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      to: config.routes.management.report,
    },
    {
      admin: true,
      active: true,
      title: "Humans",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      to: config.routes.management.accounts,
    },
    {
      admin: false,
      active: true,
      title: "Products",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      to: config.routes.management.products,
    },
    {
      admin: false,
      active: true,
      title: "Customers",
      icon: <FontAwesomeIcon icon={faChartSimple} />,
      to: config.routes.management.customers,
    },
  ],
  profile: [
    {
      admin: false,
      active: false,
      title: "Profile",
      to: config.routes.profile.me,
    },
    {
      admin: false,
      active: true,
      title: "Tasks",
      to: config.routes.profile.distribution,
    },
    {
      admin: false,
      active: true,
      title: "Settings",
      to: config.routes.profile.settings,
    },
  ],
};
// Public routes allow everyone to access.
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.signIn, component: SignIn },
];

// Private routes requires authentication.
const privateRoutes = [
  {
    component: Management,
    layout: SideBarLayout,
    data: sideBarRoutes.management,
    path: config.routes.management.home,
  },
  {
    component: Accounts,
    layout: SideBarLayout,
    data: sideBarRoutes.management,
    path: config.routes.management.accounts,
  },
  {
    component: Products,
    layout: SideBarLayout,
    data: sideBarRoutes.management,
    path: config.routes.management.products,
  },
  {
    component: Customers,
    layout: SideBarLayout,
    data: sideBarRoutes.management,
    path: config.routes.management.customers,
  },
  { path: config.routes.customer.order, component: Order },
  { path: config.routes.customer.history, component: History },
  {
    path: config.routes.management.report,
    component: Report,
    layout: SideBarLayout,
    data: sideBarRoutes.management,
  },
  { path: config.routes.transaction.confirm, component: Confirm },
  { path: config.routes.transaction.home, component: Transaction },
  {
    path: config.routes.profile.home,
    component: Profile,
    layout: SideBarLayout,
    data: sideBarRoutes.profile,
  },
  {
    path: config.routes.profile.me,
    component: Me,
    layout: SideBarLayout,
    data: sideBarRoutes.profile,
  },
  {
    path: config.routes.profile.distribution,
    component: Distribution,
    layout: SideBarLayout,
    data: sideBarRoutes.profile,
  },
  {
    path: config.routes.profile.settings,
    component: Settings,
    layout: SideBarLayout,
    data: sideBarRoutes.profile,
  },
  { path: config.routes.register, component: Register },
  { path: config.routes.details.accounts, component: Details },
  { path: config.routes.details.products, component: Details },
];

export { publicRoutes, privateRoutes };
