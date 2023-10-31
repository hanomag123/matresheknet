import { Popup } from "../../assets/scripts/utils";

const popupContainer = document.querySelector<HTMLElement>("[data-call-popup]");
const popupBtns = document.querySelectorAll<HTMLElement>("[data-call-btn]");

export const initPopupCall = () => {
  if (popupContainer) {
    const popup = new Popup(popupContainer);

    popupBtns.forEach((btn) => {
      btn.addEventListener("click", () => popup.open());
    });
  }
};
