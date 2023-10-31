import { Popup } from "../../assets/scripts/utils";

const popupContainer = document.querySelector<HTMLElement>(
  "[data-question-popup]",
);
const popupBtns = document.querySelectorAll<HTMLElement>("[data-question-btn]");

export const initPopupQuestion = () => {
  if (popupContainer) {
    const popup = new Popup(popupContainer);

    popupBtns.forEach((btn) => {
      btn.addEventListener("click", () => popup.open());
    });
  }
};
