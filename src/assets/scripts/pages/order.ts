import Swiper from "swiper";

const orderType = document.querySelector(".order-type");
const orderForm = document.querySelector<HTMLFormElement>(".order__wrapper");
const orderSuccess = document.querySelector<HTMLElement>(".order-success");

const orderProducts = document.querySelector<HTMLElement>(".order-products");

export const initOrderType = () => {
  if (orderType) {
    const orderTypeBtns =
      orderType.querySelector<HTMLElement>(".order-type__btns");
    const orderTypeSwiper = orderType.querySelector<HTMLElement>(
      ".order-type__swiper",
    );

    if (orderTypeBtns && orderTypeSwiper) {
      const slides =
        orderTypeSwiper.querySelectorAll<HTMLElement>(".swiper-slide");

      new Swiper(orderTypeSwiper, {
        speed: 0,
        allowTouchMove: false,
        autoHeight: true,
        pagination: {
          type: "bullets",
          el: orderTypeBtns,
          clickable: true,
          bulletClass: "default-btn",
          bulletActiveClass: "active",
          renderBullet: function (index, className) {
            const name: string = slides[index].dataset.type || "data-type";
            return `
            <button type="button" class="default-btn sm border order-type__btn ${className}">
              ${name}
            </button>
          `;
          },
        },
      });
    }
  }

  if (orderForm && orderSuccess) {
    if (orderForm.hasAttribute("data-submit-handler")) {
      orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        orderForm.classList.add("_hidden");
        orderSuccess.classList.add("_show");
      });
    }
  }

  if (orderProducts) {
    new Swiper(orderProducts, {
      slidesPerView: "auto",
      freeMode: true,
    });
  }
};
