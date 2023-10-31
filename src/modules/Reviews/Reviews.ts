import gsap from "gsap";
import { ReviewsFormRateController } from "../../assets/scripts/utils";

export const initRewiews = () => {
  initRatePin();
  initRateForm();
};

function initRatePin() {
  const reviewsRate = document.querySelector<HTMLElement>(".reviews-rate");
  const reviewsRateContainer = document.querySelector<HTMLElement>(
    ".reviews-rate__container",
  );
  const reviewsRatePin =
    document.querySelector<HTMLElement>(".reviews-rate__pin");

  if (reviewsRate && reviewsRatePin && reviewsRateContainer) {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 601px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reviewsRate,
          start: "top top",
          end: `${
            100 -
            reviewsRateContainer.offsetHeight / (reviewsRate.offsetHeight / 100)
          }% top`,
          scrub: true,
        },
      });
      tl.to(reviewsRatePin, {
        flex: 1,
        ease: "none",
      });

      return () => {
        // optional
        // custom cleanup code here (runs when it STOPS matching)
      };
    });

    // window.addEventListener("resize", () => {
    //   if (tl.scrollTrigger) {
    //     tl.scrollTrigger.update();
    //   }
    // });
  }
}

function initRateForm() {
  const reviewsFomt = document.querySelector<HTMLFormElement>(".reviews-form");
  const reviewsFormRateBtns = document.querySelectorAll<HTMLButtonElement>(
    ".reviews-form-rate__btn",
  );
  const reviewsFormRateInput = document.querySelector<HTMLInputElement>(
    ".reviews-form-rate__input",
  );

  if (reviewsFormRateBtns && reviewsFormRateInput) {
    new ReviewsFormRateController(reviewsFormRateBtns, reviewsFormRateInput);
  }
}
