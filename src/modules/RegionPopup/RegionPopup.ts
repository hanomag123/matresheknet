import { Popup } from "../../assets/scripts/utils";

const popupContainer = document.querySelector<HTMLElement>(
  "[data-region-popup]",
);
const popupBtns = document.querySelectorAll<HTMLElement>("[data-region-btn]");

export const initRegionPopup = () => {
  if (popupContainer) {
    const popup = new Popup(popupContainer);

    popupBtns.forEach((btn) => {
      btn.addEventListener("click", () => popup.open());
    });
  }
};
