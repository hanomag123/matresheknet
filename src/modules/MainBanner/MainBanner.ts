// import Swiper from "swiper";
// import {Controller} from "swiper/modules";
// export const mainBannerScript = () => {
//   const mainSwiperContainer = document.querySelector<HTMLElement>(
//     ".main-banner__swiper",
//   );
//   const pagination = document.querySelector<HTMLElement>(
//     ".main-banner__swiper .swiper-pagination",
//   );
//   const prodSwiperContainer =
//     document.querySelector<HTMLElement>(".main-banner-prod");

//   const wrapper = document.querySelector<HTMLElement>('.main-banner');

//   if (mainSwiperContainer && pagination && prodSwiperContainer && wrapper) {
//     const innerSwipers = wrapper.querySelectorAll('.main-innerSwiper') as NodeListOf<HTMLElement>;
//     let innerSwiper:Swiper[] = []
//     if (innerSwipers.length) {
//       innerSwipers.forEach((sw) => {
//         const numberOfSlides = sw.querySelectorAll('.swiper-slide') as NodeList;
//         innerSwiper.push(new Swiper(sw, {
//           spaceBetween: 0,
//           speed: 500,
//           grabCursor: true,
//           slidesPerView: 'auto',
//           loop: numberOfSlides.length > 1,
//           loopedSlides: numberOfSlides.length || 0,
//           autoplay: {
//             delay: 3000,
//             disableOnInteraction: false,
//           }
//         }))
//       })
//     }

//     const prodSwiper = new Swiper(prodSwiperContainer, {
//       spaceBetween: 0,
//     });

//     const mainSwiper = new Swiper(mainSwiperContainer, {
//       modules: [Controller],
//       effect: "creative",
//       creativeEffect: {
//         prev: {
//           translate: ["-20%", 0, -100],
//         },
//         next: {
//           translate: ["100%", 0, 0],
//         },
//       },
//       speed: 1000,
//       pagination: {
//         el: pagination,
//         type: "bullets",
//         clickable: true,
//         bulletActiveClass: "_active",
//         bulletClass: "swiper-pagination__bullet",
//       },
//       autoplay: {
//         delay: 10000,
//         disableOnInteraction: false,
//       },
//       on: {
//         slideChange: function () {
//           if (innerSwiper?.length) {
//             innerSwiper.forEach(el => {
//               el.slideToLoop(0)
//             })
//           }
//         }
//       }
      
//     });
//     prodSwiper.disable()

    
//     mainSwiper.controller.control = prodSwiper;
//   }
// };
