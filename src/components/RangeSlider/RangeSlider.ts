import { Popup, RangeSlider } from "../../assets/scripts/utils";

const rangeSliderList = document.querySelectorAll<HTMLElement>(
  "[data-range-slider]",
);

export const initRangeSliders = (popup?: Popup) => {
  rangeSliderList.forEach((container) => new RangeSlider(container, popup));
};
