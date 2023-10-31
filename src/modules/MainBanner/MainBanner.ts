import Swiper from "swiper";

export const mainBannerScript = () => {
  const mainSwiperContainer = document.querySelector<HTMLElement>(
    ".main-banner__swiper",
  );
  const pagination = document.querySelector<HTMLElement>(
    ".main-banner__swiper .swiper-pagination",
  );
  const prodSwiperContainer =
    document.querySelector<HTMLElement>(".main-banner-prod");

  if (mainSwiperContainer && pagination && prodSwiperContainer) {
    const mainSwiper = new Swiper(mainSwiperContainer, {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: ["-20%", 0, -100],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      },
      speed: 1000,
      pagination: {
        el: pagination,
        type: "bullets",
        clickable: true,
        bulletActiveClass: "_active",
        bulletClass: "swiper-pagination__bullet",
      },
      on: {
        slideChange: (swiper) => {
          prodSwiper.slideTo(swiper.activeIndex);
        },
      },
    });

    const prodSwiper = new Swiper(prodSwiperContainer, {
      allowTouchMove: false,
    });
  }
};
