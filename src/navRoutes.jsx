import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserGroupIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Customers } from "@/pages/dashboard";
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
      /*{
        icon: <UserCircleIcon {...icon} />,
        name: "Statements",
        path: "/profile",
        element: <Profile />,
      },*/
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Statements",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Customers",
        path: "/customers",
        element: <Customers />,
      },
      /*{
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },*/
    ],
  },
];

export default navRoutes;
