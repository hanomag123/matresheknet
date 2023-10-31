import Swiper from "swiper";

export const initAboutSlider = () => {
  const container = document.querySelector(".about-slider");

  if (container) {
    const swiperContainer = container.querySelector<HTMLElement>(
      ".about-slider__swiper",
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
        slidesPerView: "auto",
        breakpoints: {
          1201: {
            slidesPerView: 5,
          },
          601: {
            slidesPerView: 4,
          },
        },
      });
    }
  }
};
