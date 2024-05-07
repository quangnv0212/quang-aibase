import {
  IconBuilding,
  IconDashboard,
  IconMessage,
  IconPerson,
  IconProfile,
  IconStar,
} from "@/components/icons";
import {
  TPropertyStatusData,
  TPropertyTypeData,
  TSidebarLink,
} from "@/types/general.types";
export const sidebarLinksAdmin: TSidebarLink[] = [
  {
    title: "Dashboard",
    icon: <IconDashboard />,
    path: "/",
  },
  {
    title: "Account",
    icon: <IconProfile />,
    path: "/account-management",
  },
  {
    title: "Model",
    icon: <IconProfile />,
    path: "/model-management",
  },
];
export const sidebarLinksTenant: TSidebarLink[] = [
  {
    title: "Dashboard",
    icon: <IconDashboard />,
    path: "/",
  },
  {
    title: "Property",
    icon: <IconBuilding />,
    path: "/properties",
  },
  {
    title: "Agent",
    icon: <IconPerson />,
    path: "/agent",
  },
];
export const sidebarLinksUser: TSidebarLink[] = [
  {
    title: "Dashboard",
    icon: <IconDashboard />,
    path: "/",
  },
  {
    title: "Property",
    icon: <IconBuilding />,
    path: "/properties",
  },
  {
    title: "Agent",
    icon: <IconPerson />,
    path: "/agent",
  },
];
export const propertyStatusData: TPropertyStatusData[] = [
  {
    value: "",
    label: "Any Status",
  },
  {
    value: "sale",
    label: "For Sale",
  },
  {
    value: "rent",
    label: "For Rent",
  },
];
export const propertyTypeData: TPropertyTypeData[] = [
  {
    value: "",
    label: "Any Type",
  },
  {
    value: "apartments",
    label: "Appartments",
  },
  {
    value: "houses",
    label: "House",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "garages",
    label: "Garages",
  },
  {
    value: "lots",
    label: "Lots",
  },
];
export const ITEMS_PER_PAGE = 2;
