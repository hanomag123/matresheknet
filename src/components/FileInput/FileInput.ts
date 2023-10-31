import { FileInput } from "../../assets/scripts/utils";

const fileInputs = document.querySelectorAll<HTMLElement>(".file-input");

export const initFileInputs = () => {
  fileInputs.forEach((container) => {
    const input =
      container.querySelector<HTMLInputElement>(".file-input__input");
    const btn = container.querySelector<HTMLButtonElement>(".file-input__btn");
    const fileName = container.querySelector<HTMLElement>(".file-input__file");

    if (input && btn && fileName) {
      new FileInput(container, input, btn, fileName);
    }
  });
};
