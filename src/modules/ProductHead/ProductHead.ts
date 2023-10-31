import Swiper from "swiper";

export const initProductHead = () => {
  const mainSlideContainer = document.querySelector<HTMLElement>(
    ".product-head-slider__main",
  );
  const paginationSlideContainer = document.querySelector<HTMLElement>(
    ".product-head-slider__pagination",
  );

  if (mainSlideContainer && paginationSlideContainer) {
    const pagination =
      mainSlideContainer.querySelector<HTMLElement>(".swiper-pagination");

    const pagSlider = new Swiper(paginationSlideContainer, {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 10,
      breakpoints: {
        1201: {
          spaceBetween: 24,
        },
      },
    });

    new Swiper(mainSlideContainer, {
      spaceBetween: 30,
      thumbs: {
        swiper: pagSlider,
      },
      pagination: {
        el: pagination,
        type: "bullets",
        clickable: true,
        bulletActiveClass: "_active",
        bulletClass: "swiper-pagination__bullet",
      },
    });
  }

  const specContainer = document.querySelector(".product-head-spec");
  if (specContainer) {
    const table = specContainer.querySelector<HTMLElement>(
      ".product-head-spec__table",
    );
    const rows = table ? table.querySelectorAll("tr").length : 0;

    const btn = specContainer.querySelector<HTMLButtonElement>(
      ".product-head-spec__btn",
    );
    if (table && btn && rows > 5) {
      btn.addEventListener("click", () => {
        if (table.classList.contains("_active")) {
          table.classList.remove("_active");
          btn.classList.remove("_active");
        } else {
          table.classList.add("_active");
          btn.classList.add("_active");
        }
      });
    } else if (rows <= 5) {
      btn?.classList.add("_hidden");
    }
  }
};
