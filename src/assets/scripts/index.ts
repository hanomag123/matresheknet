import { navCatalogController } from "../../modules/NavCatalog/NavCatalog";
import { mainBannerScript } from "../../modules/MainBanner/MainBanner";
import Swiper from "swiper";
import {
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
  Thumbs,
  FreeMode,
  EffectFade,
  Grid,
} from "swiper/modules";
import { initProductItems } from "../../components/ProductItem/ProductItem";
import { initProductSliders } from "../../modules/ProductSlider/ProductSlider";
import { initMultipleSelects } from "../../components/MultipleSelect/MultipleSelect";
import { initRangeSliders } from "../../components/RangeSlider/RangeSlider";
import { initAdvSlider } from "../../modules/AdvSlider/AdvSlider";
import { initProductHead } from "../../modules/ProductHead/ProductHead";
import { Dropdown, Popup } from "./utils";
import { initProductInfo } from "../../modules/ProductInfo/ProductInfo";
import { Fancybox } from "@fancyapps/ui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initRewiews } from "../../modules/Reviews/Reviews";
import { initFileInputs } from "../../components/FileInput/FileInput";
import { initAboutSlider } from "../../modules/AboutSlider/AboutSlider";
import { initUpBtn } from "../../components/UpBtn/UpBtn";
import { initContactsSlider } from "../../modules/ContactsSlider/ContactsSlider";
import { initNavBar } from "../../modules/NavBar/NavBar";
import { initCartItems } from "../../components/CartItem/CartItem";
import { initOrderType } from "./pages/order";
import { initAboutLinks } from "./pages/about";
import { initHeader } from "../../modules/Header/Header";
import { initPopupCall } from "../../modules/PopupCall/PopupCall";
import { initPopupQuestion } from "../../modules/PopupQuestion/PopupQuestion";
import { formValidateInit } from "./fv";
import { initRegionPopup } from "../../modules/RegionPopup/RegionPopup";
import { initSelects } from "../../components/Select/Select";

gsap.registerPlugin(ScrollTrigger);

Swiper.use([
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
  Thumbs,
  FreeMode,
  EffectFade,
  Grid,
]);
Swiper.defaults.lazyPreloaderClass = "swiper-preloader";

Fancybox.bind("[data-fancybox]", {});

const dropDownBtns = document.querySelectorAll<HTMLElement>("[data-dropdown]");
dropDownBtns.forEach((container) => new Dropdown(container));

const initFilterSwiper = () => {
  const containers = document.querySelectorAll<HTMLElement>(".swiper.filter");

  containers.forEach((container) => {
    new Swiper(container, {
      slidesPerView: "auto",
      freeMode: true,
    });
  });
};
initFilterSwiper();

initHeader();

initPopupCall();
initPopupQuestion();
initRegionPopup();

const dropdownPopupContainer = document.querySelector<HTMLElement>(
  "[data-dropdown-popup]",
);
const dropdownPopup = dropdownPopupContainer
  ? new Popup(dropdownPopupContainer)
  : undefined;

mainBannerScript();

initProductSliders();

initProductItems();

initMultipleSelects(dropdownPopup);

initRangeSliders(dropdownPopup);

initSelects(dropdownPopup);

initAdvSlider();

initProductHead();

initProductInfo();

initRewiews();

initFileInputs();

initAboutSlider();

initAboutLinks();

initContactsSlider();

initCartItems();

initOrderType();

const navBarController = initNavBar();

initUpBtn();

formValidateInit(".validate");

const headerCatalogBtn = document.querySelector(".header__catalog");
if (headerCatalogBtn) {
  headerCatalogBtn.addEventListener("click", () =>
    navCatalogController.openMenu(),
  );
}

const submitHandlers = document.querySelectorAll<HTMLElement>(
  "[data-submit-handler]",
);
submitHandlers.forEach((item) => {
  const closestPopup = item.closest(".popup");

  item.addEventListener("submit", (e) => {
    e.preventDefault();

    if (closestPopup) {
      closestPopup.classList.add("_sended");
    }
    item.classList.add("_sended");
  });
});

{
  let id = 0;

  window.addEventListener("resize", () => {
    clearTimeout(id);
    id = setTimeout(afterResize, 500);
  });

  function afterResize() {
    ScrollTrigger.update();

    navBarController?.resizeHandler();
  }
}
