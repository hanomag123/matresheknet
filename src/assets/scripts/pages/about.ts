import Swiper from "swiper";

const aboutLinksContainer =
  document.querySelector<HTMLElement>(".about__links");

export const initAboutLinks = () => {
  if (aboutLinksContainer) {
    new Swiper(aboutLinksContainer, {
      slidesPerView: "auto",
      freeMode: true,
    });
  }
};
