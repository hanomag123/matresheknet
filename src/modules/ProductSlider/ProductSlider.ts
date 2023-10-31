import Swiper from "swiper";

const productSliders = document.querySelectorAll(".product-slider");

export const initProductSliders = () => {
  productSliders.forEach((container) => {
    const swiperContainer = container.querySelector<HTMLElement>(
      ".product-slider__swiper",
    );
    const prevBtn = container.querySelector<HTMLElement>(
      ".swiper-btns__btn_prev",
    );
    const nextBtn = container.querySelector<HTMLElement>(
      ".swiper-btns__btn_next",
    );

    if (swiperContainer && prevBtn && nextBtn) {
      new Swiper(swiperContainer, {
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
        slidesPerView: 2,
        allowTouchMove: false,
        breakpoints: {
          1201: {
            slidesPerView: 5,
          },
          601: {
            slidesPerView: 3,
          },
        },
      });
    }
  });
};
