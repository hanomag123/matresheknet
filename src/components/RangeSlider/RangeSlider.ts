import { RangeSlider } from "../../assets/scripts/utils";

const rangeSliderList = document.querySelectorAll<HTMLElement>(
  "[data-range-slider]",
);

export const initRangeSliders = () => {
  rangeSliderList.forEach((container) => new RangeSlider(container));
};
