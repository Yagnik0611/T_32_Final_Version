import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  
  {
    color: "pink",
    icon: UserIcon,
    title: "Today's Users",
    value: "51",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Total  Booking",
    value: "30",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Parks",
    value: "5",
    footer: {
      color: "text-green-500",
      value: "+1%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
