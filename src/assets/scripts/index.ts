import { navCatalogController } from "../../modules/NavCatalog/NavCatalog";
// import { mainBannerScript } from "../../modules/MainBanner/MainBanner";
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
  Manipulation,
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
  Manipulation,
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

// mainBannerScript();

if (window?.jQuery) {
  $(document).on('mse2_load', function() {
    initProductSliders();
    initProductItems();
    const preloaders = document.querySelectorAll('.swiper-preloader')
    if (preloaders.length) {
      preloaders.forEach(el => el.remove())
    }
  });

$( ".ui-slider" ).on( 
  "slidechange", 
  function( event, ui ) {
    if (event.originalEvent) {
      const el = event.target
      const parent = el.closest('.range-slider')
      if (parent) {
        parent.classList.add('_checked')
      }
    }
  } 
);

const rangeSliderList = document.querySelectorAll(
  "[data-range-slider]",
);

if (rangeSliderList.length) {
  rangeSliderList.forEach(el => {
    el.addEventListener('clear', function () {
      var options = $(el).find('.ui-slider').slider( 'option' );
      $(el).find('.ui-slider').slider('values',[ options.min, options.max ]);
      $(el).find('.mse2_number_inputs input').each(function () {
        const data = $(this).data('original-value')
        $(this).val(data)
        $(this).trigger('change')
      })
    })

    $(el).find('.mse2_number_inputs input').each(function () {
      const data = $(this).data('original-value')
      if (Number(data) !== Number($(this).val())) {
        el.classList.add('_checked')
      }
    })
  })
}


}

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
