import Swiper from "swiper";

export const initProductHead = () => {
  const mainSlideContainer = document.querySelector<HTMLElement>(
    ".product-head-slider__main",
  );
  const paginationSlideContainer = document.querySelector<HTMLElement>(
    ".product-head-slider__pagination",
  );

  if (mainSlideContainer && paginationSlideContainer) {
    const parent = paginationSlideContainer.parentElement;
    let next = null;
    let prev = null;
    if (parent) {
      next = parent.querySelector<HTMLElement>(
        ".swiper-btns__btn_next.product-head-btn",
      );
      prev = parent.querySelector<HTMLElement>(
        ".swiper-btns__btn_prev.product-head-btn",
      );
    }
    const pagination =
      mainSlideContainer.querySelector<HTMLElement>(".swiper-pagination");

    const pagSlider = new Swiper(paginationSlideContainer, {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      mousewheel: {
        sensitivity: 1,
      },
      navigation: {
        nextEl: next,
        prevEl: prev,
      },
    });

    const slides = paginationSlideContainer.querySelectorAll(".swiper-slide");

    const mainswiper = new Swiper(mainSlideContainer, {
      spaceBetween: 30,
      speed: 700,
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
      on: {
        slideChange: () => {
          const activeslide =
            paginationSlideContainer.querySelector<HTMLElement>(
              ".swiper-slide-thumb-active",
            );
          if (activeslide) {
            const coloritem = document.querySelector<HTMLInputElement>(
              `.product-wa__color-ithem input[data-file="${activeslide?.dataset?.file}"]`,
            );
            const nowchecked = document.querySelector<HTMLElement>(
              `.product-wa__color-ithem input[data-file="${activeslide?.dataset?.file}"]:checked`,
            );
            if (
              (coloritem && !nowchecked) ||
              (coloritem &&
                nowchecked &&
                coloritem.dataset.file !== nowchecked.dataset.file)
            ) {
              coloritem.click();
            }
          }
        },
      },
    });

    if (slides.length) {
      slides.forEach((slide) => {
        slide.addEventListener("click", function (this: HTMLElement) {
          slides.forEach((slide, i) => {
            slide.classList.remove("swiper-slide-thumb-active");
            if (slide === this) {
              pagSlider.slideTo(i, 700);
              mainswiper.slideTo(i, 700);
              slide.classList.add("swiper-slide-thumb-active");
              const coloritem = document.querySelector<HTMLInputElement>(
                `.product-wa__color-ithem input[data-file="${this?.dataset?.file}"]`,
              );
              const nowchecked = document.querySelector<HTMLElement>(
                `.product-wa__color-ithem input[data-file="${this?.dataset?.file}"]:checked`,
              );
              if (
                (coloritem && !nowchecked) ||
                (coloritem &&
                  nowchecked &&
                  coloritem.dataset.file !== nowchecked.dataset.file)
              ) {
                coloritem.click();
              }
            }
          });
        });
      });
    }

    const btns = document.querySelectorAll(".product-wa__color-ithem input");
    if (btns.length) {
      btns.forEach((el) => {
        el.addEventListener("change", function (this: HTMLElement) {
          if (this.dataset?.file) {
            const slide = paginationSlideContainer.querySelector<HTMLElement>(
              `[data-file="${this.dataset.file}"]`,
            );
            if (slide) {
              slide.click();
            }
          }
        });
      });
    }
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
