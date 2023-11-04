import { MultipleSelect, Popup } from "../../assets/scripts/utils";

const multipleSelectList = document.querySelectorAll<HTMLElement>(
  "[data-multiple-select]",
);

export const initMultipleSelects = (popup?: Popup) => {
  multipleSelectList.forEach(
    (container) => new MultipleSelect(container, popup),
  );
};
