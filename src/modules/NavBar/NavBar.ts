import { NavBarController } from "../../assets/scripts/utils";

const navBar = document.querySelector(".nav-bar");

export const initNavBar = (): NavBarController | undefined => {
  if (navBar) {
    const navItems = navBar.querySelectorAll<HTMLElement>(".nav-bar__link");
    const listContainer = navBar.querySelector<HTMLElement>(".nav-bar__list");
    const dropContainer = navBar.querySelector<HTMLElement>(
      ".nav-bar-drop__container",
    );

    if (listContainer && dropContainer) {
      return new NavBarController(navItems, listContainer, dropContainer);
    }
  }
};
