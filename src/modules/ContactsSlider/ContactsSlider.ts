import Swiper from "swiper";

const contactsSlider = document.querySelector<HTMLElement>(".contacts-slider");

export const initContactsSlider = () => {
  if (contactsSlider) {
    const swiperContainer = contactsSlider.querySelector<HTMLElement>(
      ".contacts-slider__swiper",
    );
    const prevBtn = contactsSlider.querySelector<HTMLElement>(
      ".swiper-btns__btn_prev",
    );
    const nextBtn = contactsSlider.querySelector<HTMLElement>(
      ".swiper-btns__btn_next",
    );

    if (swiperContainer && prevBtn && nextBtn) {
      new Swiper(swiperContainer, {
        navigation: {
          prevEl: prevBtn,
          nextEl: nextBtn,
        },
        slidesPerView: "auto",
        freeMode: true,
      });
    }
  }
};
