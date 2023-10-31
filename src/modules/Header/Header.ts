import { menu } from "../Menu/Menu";

const menuBtn = document.querySelector<HTMLElement>(".header__menu-btn");
const search = document.querySelector<HTMLFormElement>("[data-search]");

export const initHeader = () => {
  if (menuBtn) {
    menuBtn.addEventListener("click", () => menu.open());
  }

  if (search) {
    const input = search.querySelector<HTMLInputElement>(
      ".header-search__input",
    );

    // search.addEventListener("submit", (e) => {
    //   e.preventDefault();
    //   search.classList.add("_active");
    // });

    if (input) {
      input.addEventListener("focus", () => {
        search.classList.add("_active");
      });

      input.addEventListener("blur", () => {
        search.classList.remove("_active");
      });
    }
  }
};
