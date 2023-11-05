import { Select, type Popup } from "../../assets/scripts/utils";

const selectList = document.querySelectorAll<HTMLElement>("[data-select]");

export const initSelects = (popup?: Popup) => {
  selectList.forEach((i) => new Select(i, popup));
};
