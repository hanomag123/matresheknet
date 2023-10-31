import Swiper from "swiper";

export const initAdvSlider = () => {
  const swiperContainer = document.querySelector<HTMLElement>(
    ".adv-slider__swiper",
  );

  if (swiperContainer) {
    const prevBtn = swiperContainer.querySelector<HTMLElement>(
      ".adv-slider__btn_prev",
    );
    const nextBtn = swiperContainer.querySelector<HTMLElement>(
      ".adv-slider__btn_next",
    );

    new Swiper(swiperContainer, {
      slidesPerView: "auto",
      freeMode: true,
      navigation: {
        prevEl: prevBtn,
        nextEl: nextBtn,
      },
    });
  }
};
