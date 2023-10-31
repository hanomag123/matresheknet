import Swiper from "swiper";

export const initProductInfo = () => {
  const btnsContainer =
    document.querySelector<HTMLElement>(".product-info-btns");
  const btnsDash = btnsContainer?.querySelector<HTMLElement>(
    ".product-info-btns__dash",
  );
  const swiperContainer = document.querySelector<HTMLElement>(
    ".product-info__swiper",
  );

  if (btnsContainer && swiperContainer && btnsDash) {
    const swiper = new Swiper(swiperContainer, {
      autoHeight: true,
      speed: 800,
      spaceBetween: 0,
      allowTouchMove: false,
      breakpoints: {
        601: {
          spaceBetween: 50,
        },
      },
    });

    const btnsFragment = document.createDocumentFragment();

    swiper.slides.forEach((slide, index) => {
      const btnText =
        slide.querySelector(".dropdown-btn__text")?.innerHTML ||
        "Заголовок не задат";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "product-info-btns__btn";
      btn.innerHTML = btnText;

      btn.addEventListener("click", () => clickHandler(btn, index));
      btnsFragment.appendChild(btn);

      if (index === 0) {
        setTimeout(() => clickHandler(btn, index), 0);
      }
    });

    btnsContainer.appendChild(btnsFragment);

    function clickHandler(btn: HTMLElement, index: number) {
      if (btnsContainer && btnsDash) {
        const leftPerc =
          btn.offsetLeft / (btnsContainer.offsetWidth / 100) + "%";
        const widthPerc =
          btn.offsetWidth / (btnsContainer.offsetWidth / 100) + "%";

        swiper.slideTo(index);
        btnsDash.style.left = leftPerc;
        btnsDash.style.width = widthPerc;
      }
    }
  }
};
