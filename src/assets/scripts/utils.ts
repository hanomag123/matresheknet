import Inputmask from "inputmask";
import { DualHRangeBar } from "dual-range-bar";
import Swiper from "swiper";

export class ReviewsFormRateController {
  btns: NodeListOf<HTMLElement>;
  input: HTMLInputElement;

  constructor(btns: NodeListOf<HTMLButtonElement>, input: HTMLInputElement) {
    this.btns = btns;
    this.input = input;

    this.init();
  }

  init() {
    this.btns.forEach((item, index) => {
      item.addEventListener("mouseenter", this.setHover.bind(this, index));
      item.addEventListener("mouseleave", this.resetHover.bind(this));
      item.addEventListener("click", this.setRate.bind(this, index));
    });

    if (this.input.value && Number(this.input.value)) {
      this.setRate(Number(this.input.value) - 1);
    }
  }

  setHover(targetIndex: number) {
    this.btns.forEach((item, index) => {
      if (index <= targetIndex) {
        item.classList.add("_hover");
      }
    });
  }

  resetHover() {
    this.btns.forEach((item) => {
      item.classList.remove("_hover");
    });
  }

  setRate(targetIndex: number) {
    this.btns.forEach((item, index) => {
      if (index <= targetIndex) {
        item.classList.add("_active");
      } else {
        item.classList.remove("_active");
      }
    });
    this.input.value = (targetIndex + 1).toString();
  }
}

export class Dropdown {
  container: HTMLElement;
  dropBtn: HTMLButtonElement | null;
  isDropped: boolean;
  swiper: any;
  swiperAllowTouchMove: boolean;

  constructor(container: HTMLElement) {
    this.container = container;
    this.dropBtn = this.container.querySelector<HTMLButtonElement>(
      "[data-dropdown-btn]",
    );
    this.isDropped = false;

    this.swiper = this.container.closest(".swiper");
    this.swiperAllowTouchMove =
      this.swiper && this.swiper.swiper && this.swiper.swiper.allowTouchMove
        ? true
        : false;

    this.initDropdown();
  }

  initDropdown() {
    if (this.dropBtn) {
      this.dropBtn.addEventListener("click", this.clickHandler.bind(this));
    }

    document.addEventListener("click", (e) => {
      const target = e.target;
      const closest = (target as Element)?.closest(".dropdown") as HTMLElement;
      if (closest !== this.container && this.isDropped) {
        this.close();
      }
    });
  }

  clickHandler() {
    if (this.isDropped) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    setTimeout(() => {
      this.isDropped = true;
      this.container.classList.add("_dropped");

      if (this.swiper && this.swiper.swiper && this.swiperAllowTouchMove) {
        (this.swiper.swiper as Swiper).allowTouchMove = false;
      }
    }, 1);
  }

  close() {
    this.isDropped = false;
    this.container.classList.remove("_dropped");

    if (this.swiper && this.swiper.swiper && this.swiperAllowTouchMove) {
      (this.swiper.swiper as Swiper).allowTouchMove = true;
      (this.swiper.swiper as Swiper).updateSlides();
    }
  }
}

export class MultipleSelect extends Dropdown {
  inputList: NodeListOf<HTMLInputElement>;
  text: string;
  btnText: HTMLElement | null;
  cleanBtn: HTMLButtonElement | null;

  constructor(container: HTMLElement) {
    super(container);
    this.inputList =
      this.container.querySelectorAll<HTMLInputElement>(".checkbox__input");
    this.btnText = this.container.querySelector<HTMLElement>(
      ".dropdown-btn__text",
    );
    this.text = this.btnText?.textContent || "";
    this.cleanBtn = this.container.querySelector<HTMLButtonElement>(
      ".multiple-select__clean",
    );

    this.initMultipleSelect();
  }

  initMultipleSelect() {
    if (this.btnText && this.cleanBtn) {
      this.cleanBtn.addEventListener("click", this.cleanSelect.bind(this));

      this.inputList.forEach((input) => {
        input.addEventListener("change", this.selectHandler.bind(this));
      });

      this.selectHandler();
    }
  }

  selectHandler() {
    let checked = 0;
    this.inputList.forEach((input) => {
      if (input.checked) {
        checked++;
      }
    });

    if (checked > 0) {
      this.btnText && (this.btnText.textContent = this.text + ": " + checked);
      this.container.classList.add("_checked");
    } else {
      this.btnText && (this.btnText.textContent = this.text);
      this.container.classList.remove("_checked");
    }
  }

  cleanSelect() {
    this.inputList.forEach((input) => {
      input.checked = false;
    });
    this.btnText && (this.btnText.textContent = this.text);
    this.container.classList.remove("_checked");
    this.close();
  }
}

export class RangeSlider extends Dropdown {
  range: DualHRangeBar | null;
  minInput: HTMLInputElement | null;
  maxInput: HTMLInputElement | null;
  minInit: number;
  maxInit: number;
  cleanBtn: HTMLButtonElement | null;
  minValue: number;
  maxValue: number;

  constructor(container: HTMLElement) {
    super(container);
    this.cleanBtn = this.container.querySelector<HTMLButtonElement>(
      ".multiple-select__clean",
    );
    this.range = null;
    this.minInput =
      this.container.querySelector<HTMLInputElement>("[data-min]");
    this.maxInput =
      this.container.querySelector<HTMLInputElement>("[data-max]");

    this.minValue = Number(this.minInput?.dataset.min) || 0;
    this.minInit = Number(this.minInput?.dataset.init) || this.minValue;
    this.maxValue = Number(this.maxInput?.dataset.max) || 100;
    this.maxInit = Number(this.maxInput?.dataset.init) || this.maxValue;

    if (this.minInput && this.maxInput) {
      this.minInput.addEventListener(
        "blur",
        this.inputValue.bind(this, this.minInput),
      );
      this.maxInput.addEventListener(
        "blur",
        this.inputValue.bind(this, this.maxInput),
      );
    }

    const rangeContainer = this.container.querySelector<HTMLDivElement>(
      ".range-slider__range",
    );

    if (rangeContainer) {
      this.range = new DualHRangeBar(rangeContainer, {
        lowerBound: this.minValue,
        upperBound: this.maxValue,
        lower: this.minInit,
        upper: this.maxInit,
        minSpan: 0,
        maxSpan: this.maxValue - this.minValue,
      });
      this.range.addEventListener("update", this.updateValue.bind(this));
      this.setDefaultRange();
    }

    if (this.cleanBtn) {
      this.cleanBtn.addEventListener("click", this.setDefaultRange.bind(this));
    }
  }

  updateValue() {
    if (this.range && this.minInput && this.maxInput) {
      this.minInput.value = Math.round(this.range.lower).toString();
      this.maxInput.value = Math.round(this.range.upper).toString();
      this.container.classList.add("_checked");
    }
  }

  setDefaultRange() {
    this.container.classList.remove("_checked");
    if (this.range && this.minInput && this.maxInput) {
      this.minInput.value = Math.round(this.minInit).toString();
      this.maxInput.value = Math.round(this.maxInit).toString();
    }
    this.updateRange();
    this.close();
  }

  updateRange() {
    if (this.range && this.minInput && this.maxInput) {
      if (Number(this.minInput.value) >= this.minValue) {
        this.range.lower = Number(this.minInput.value);
      } else {
        this.range.lower = this.minInit;
      }
      if (Number(this.maxInput.value) >= this.maxValue) {
        this.range.upper = Number(this.maxInput.value);
      } else {
        this.range.upper = this.maxInit;
      }
    }
  }

  inputValue(target: HTMLInputElement) {
    const value = Math.round(Number(target.value));

    if (this.range) {
      if (target === this.minInput) {
        if (value >= this.minValue) {
          if (value <= this.range.upper) {
            this.range.lower = value;
          } else {
            if (value <= this.maxValue) {
              this.range.lower = this.range.upper;
              this.range.upper = value;
            } else {
              this.range.lower = this.range.upper;
              this.range.upper = this.maxValue;
            }
            this.minInput.value = this.range.lower.toString();
            this.maxInput &&
              (this.maxInput.value = this.range.upper.toString());
          }
        } else {
          this.range.lower = this.minValue;
          this.minInput.value = this.minValue.toString();
        }
      } else if (target === this.maxInput) {
        if (value <= this.maxValue) {
          if (value >= this.range.lower) {
            this.range.upper = value;
          } else {
            if (value >= this.minValue) {
              this.range.upper = this.range.lower;
              this.range.lower = value;
            } else {
              this.range.upper = this.range.lower;
              this.range.lower = this.minValue;
            }
            this.maxInput.value = this.range.upper.toString();
            this.minInput &&
              (this.minInput.value = this.range.lower.toString());
          }
        } else {
          this.range.upper = this.maxValue;
          this.maxInput.value = this.maxValue.toString();
        }
      }
    }
  }
}

export class FileInput {
  container: HTMLElement;
  input: HTMLInputElement;
  btn: HTMLButtonElement;
  fileName: HTMLElement;
  isLoaded: boolean;
  isError: boolean;

  constructor(
    container: HTMLElement,
    input: HTMLInputElement,
    btn: HTMLButtonElement,
    fileName: HTMLElement,
  ) {
    this.container = container;
    this.input = input;
    this.btn = btn;
    this.fileName = fileName;
    this.isLoaded = false;
    this.isError = false;

    this.init();
  }

  init() {
    this.input.addEventListener("input", this.onLoad.bind(this));
    this.btn.addEventListener("click", this.clear.bind(this));
  }

  onLoad() {
    if (this.input.files && this.input.files[0]) {
      this.fileName.textContent = this.input.files[0].name;
      this.container.classList.add("_loaded");
    }
  }

  clear() {
    this.container.classList.remove("_loaded");
    this.input.value = "";
    this.fileName.textContent = "";
  }
}

export class NavBarController {
  items: NodeListOf<HTMLElement>;
  listContainer: HTMLElement;
  dropContainer: HTMLElement;

  constructor(
    items: NodeListOf<HTMLElement>,
    listContainer: HTMLElement,
    dropContainer: HTMLElement,
  ) {
    this.items = items;
    this.listContainer = listContainer;
    this.dropContainer = dropContainer;

    this.resizeHandler();
  }

  resizeHandler() {
    this.reset();

    const fragment = document.createDocumentFragment();

    [...this.items].reverse().forEach((item) => {
      if (item.offsetTop > this.items[0].offsetTop) {
        fragment.appendChild(item);
      }
    });

    this.dropContainer.appendChild(fragment);
  }

  reset() {
    const fragment = document.createDocumentFragment();

    this.dropContainer.childNodes.forEach((item) => {
      fragment.appendChild(item);
    });

    this.listContainer.appendChild(fragment);
  }
}

export class CartItem {
  container: HTMLElement;
  minusBtn: HTMLElement;
  plusBtn: HTMLElement;
  countContainer: HTMLElement;
  counter: number;
  valueInput: HTMLInputElement;
  changeEvent: Event;

  constructor(
    container: HTMLElement,
    minusBtn: HTMLElement,
    plusBtn: HTMLElement,
    countContainer: HTMLElement,
    valueInput: HTMLInputElement,
  ) {
    this.container = container;
    this.minusBtn = minusBtn;
    this.plusBtn = plusBtn;
    this.countContainer = countContainer;
    this.valueInput = valueInput;
    this.counter = 1;

    this.changeEvent = new Event("change");

    this.init();
  }

  init() {
    this.minusBtn.addEventListener("click", () => {
      this.increase();
      this.updateValue();
    });

    this.plusBtn.addEventListener("click", () => {
      this.decrease();
      this.updateValue();
    });

    this.updateValue();
  }

  increase() {
    if (this.counter > 1) {
      this.counter--;
    }
  }

  decrease() {
    this.counter++;
  }

  updateValue() {
    this.valueInput.value = this.counter.toString();
    this.countContainer.innerText = this.counter.toString();
    this.valueInput.dispatchEvent(this.changeEvent);
  }
}

export class Menu {
  container: HTMLElement | null;
  closeBtn: HTMLElement | null;

  constructor(container: HTMLElement | null) {
    this.container = container;

    if (this.container) {
      this.closeBtn = this.container.querySelector<HTMLElement>(".menu__btn");
    } else {
      this.closeBtn = null;
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", this.close.bind(this));
    }
  }

  open() {
    if (this.container) this.container.classList.add("_active");
  }

  close() {
    if (this.container) this.container.classList.remove("_active");
  }
}

export const initFilterSwiper = () => {
  const containers = document.querySelectorAll<HTMLElement>(".swiper.filter");

  containers.forEach((container) => {
    new Swiper(container, {
      slidesPerView: "auto",
      freeMode: true,
    });
  });
};

export class Popup {
  container: HTMLElement;
  closeBtns: NodeListOf<HTMLElement>;
  touchStart: number;
  touchPos: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.closeBtns =
      this.container.querySelectorAll<HTMLElement>("[data-close-btn]");

    this.touchStart = 0;
    this.touchPos = 0;

    this.closeBtns.forEach((btn) => {
      btn.addEventListener("click", this.close.bind(this));
    });
  }

  open() {
    document.body.classList.add("_hidden");
    this.container.classList.add("_active");
  }

  close() {
    document.body.classList.remove("_hidden");
    this.container.classList.remove("_active");
  }
}
