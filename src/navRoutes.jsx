import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon,
  BellIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Customers, PaymentArrangements, PaymentReminders } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const navRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Customers",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "PaymentArrangements",
        path: "/payment-arrangements",
        element: <PaymentArrangements />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "PaymentReminders",
        path: "/payment-reminders",
        element: <PaymentReminders />,
      },
    ],
  },
];

export default navRoutes;
