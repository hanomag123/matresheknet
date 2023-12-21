import Swiper from "swiper";


export const initProductItems = () => {
  const items = document.querySelectorAll<HTMLElement>(".product-item");

  items.forEach((item) => initProductItem(item));
};

function initProductItem(item: HTMLElement) {
  const swiperContainer = item.querySelector<HTMLElement>(
    ".product-item__images",
  );
  
  const pagination = item.querySelector<HTMLElement>(".swiper-pagination");
  const imgPaginationContainer = item.querySelector<HTMLElement>(
    ".product-item__pagination",
  );

  if (swiperContainer) {
    if (item.classList.contains("large") && imgPaginationContainer) {
      const paginationSwiper = new Swiper(imgPaginationContainer, {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 8,
        watchSlidesProgress: true,
      });

      new Swiper(swiperContainer, {
        pagination: {
          el: pagination,
          type: "bullets",
          bulletActiveClass: "_active",
          bulletClass: "swiper-pagination__bullet",
        },
        spaceBetween: 30,
        thumbs: {
          swiper: paginationSwiper,
        },
      });
    } else {
      new Swiper(swiperContainer, {
        pagination: {
          el: pagination,
          type: "bullets",
          bulletActiveClass: "_active",
          bulletClass: "swiper-pagination__bullet",
          clickable: true,
        },
        spaceBetween: 30,
      });
    }
  }
}

(window as any).initProductItem = initProductItem;
