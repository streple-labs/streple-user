import BulbIcon from "@/assets/svg/bulb";
import OverviewIcon from "@/assets/svg/overview";
import SettingsIcon from "@/assets/svg/setting";
import Candlestick from "@/component/icons/candle-stick";
import Users from "@/component/icons/user-group";

export const nav_items = [
  {
    name: "Home",
    icon: OverviewIcon,
    href: "/",
  },
  { name: "Trades", icon: Candlestick, href: "#" },
  {
    name: "Learn to Earn",
    icon: BulbIcon,
    href: "/learn-to-earn",
  },
  // {
  //   name: "Wallet",
  //   icon: GroupIcon,
  //   href: "#",
  // },
  {
    name: "Community",
    icon: Users,
    href: "#",
  },
  // {
  //   name: "Watchlist",
  //   icon: BulbIcon,
  //   href: "#",
  // },
  // {
  //   name: "Market",
  //   icon: BulbIcon,
  //   href: "#",
  // },
  {
    name: "Settings",
    icon: SettingsIcon,
    href: "#",
  },
];
