import { MenuItemStyles } from "react-pro-sidebar";

export const themes = {
  light: {
    sidebar: {
      backgroundColor: "#ffffff",
      color: "#607489",
    },
    menu: {
      menuContent: "#ffffff",
      icon: "rgb(157,163,172)",
      hover: {
        backgroundColor: "rgba(244, 145, 0, 0.2)",
        color: "#44596e",
      },
    },
  },
};

export const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: "13px",
    fontWeight: 400,
  },
  icon: ({ active }) => ({
    color: active ? "rgb(244, 145, 0)" : themes.light.menu.icon,
  }),
  SubMenuExpandIcon: {
    color: "#b6b7b9",
  },
  subMenuContent: ({ level }) => ({
    backgroundColor:
      level === 0 ? themes.light.menu.menuContent : "transparent",
  }),
  button: {
    "&:hover": {
      backgroundColor: themes.light.menu.hover.backgroundColor,
      color: themes.light.menu.hover.color,
    },
  },
  label: ({ open, active }) => ({
    fontWeight: open || active ? 600 : undefined,
  }),
};
