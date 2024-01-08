import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Successful SMSs",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
  {
    color: "blue",
    icon: UsersIcon,
    title: "Failed SMSs",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
  {
    color: "blue",
    icon: UserPlusIcon,
    title: "Sussessful Emails",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
  {
    color: "blue",
    icon: ChartBarIcon,
    title: "Failed Emails",
    value: "0",
    footer: {
      color: "text-green-500",
      value: "",
      label: "",
    },
  },
];

export default statisticsCardsData;
