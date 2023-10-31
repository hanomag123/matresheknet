import { CartItem } from "../../assets/scripts/utils";

const cartItems = document.querySelectorAll<HTMLElement>(".cart-item");

export const initCartItems = () => {
  cartItems.forEach((container) => {
    const minusBtn = container.querySelector<HTMLElement>("[data-minus]");
    const plusBtn = container.querySelector<HTMLElement>("[data-plus]");
    const countContainer = container.querySelector<HTMLElement>(
      ".cart-item-counter__count",
    );
    const priceContainer = container.querySelector<HTMLElement>(
      ".cart-item-price__current",
    );
    const valueInput = container.querySelector<HTMLInputElement>(
      ".cart-item-counter__input",
    );

    if (minusBtn && plusBtn && countContainer && priceContainer && valueInput) {
      new CartItem(container, minusBtn, plusBtn, countContainer, valueInput);
    }
  });
};
