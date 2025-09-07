import {
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineTable,
  HiOutlineFolder,
  HiOutlineMail,
  HiOutlineSupport,
  HiOutlineCog,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { IconType } from "react-icons";

export interface MenuItem {
  name: string;
  icon?: IconType;
  href?: string;
  children?: SubMenuItem[];
}

export interface SubMenuItem {
  name: string;
  href: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}


export const menuItems: MenuCategory[] = [
  {
    category: "Main",
    items: [
      {
        name: "Overview",
        icon: RxDashboard,
        href: "/overview/dashboard",
      },
      {
        name: "Tickets",
        icon: HiOutlineUser,
        children: [
          {
            name: "Open Tickets",
            href: "/tickets/open",
          },
          {
            name: "Closed Tickets",
            href: "/tickets/closed",
          },
          {
            name: "Pending Tickets",
            href: "/tickets/pending",
          },
        ],
      },
      {
        name: "Documents",
        icon: HiOutlineDocumentText,
        href: "/documents",
      },
    ],
  },
  {
    category: "Management",
    items: [
      {
        name: "Clients",
        icon: HiOutlineUsers,
        href: "/management/clients",
      },
      {
        name: "Reports",
        icon: HiOutlineChartBar,
        href: "/management/reports",
      },
      {
        name: "Tickets",
        icon: HiOutlineTable,
        href: "/management/tickets",
      },
      {
        name: "Projects",
        icon: HiOutlineFolder,
        children: [
          {
            name: "Active Projects",
            href: "/projects/active",
          },
          {
            name: "Archived Projects",
            href: "/projects/archived",
          },
        ],
      },
    ],
  },
  {
    category: "Communication",
    items: [
      {
        name: "Messages",
        icon: HiOutlineMail,
        href: "/communication/messages",
      },
      {
        name: "Support",
        icon: HiOutlineSupport,
        children: [
          {
            name: "Live Chat",
            href: "/support/chat",
          },
          {
            name: "Tickets",
            href: "/support/tickets",
          },
        ],
      },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        name: "Preferences",
        icon: HiOutlineCog,
        href: "/settings/preferences",
      },
      {
        name: "Integrations",
        icon: HiOutlineGlobeAlt,
        href: "/settings/integrations",
      },
    ],
  },
];