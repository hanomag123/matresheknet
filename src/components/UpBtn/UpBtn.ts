import gsap from "gsap";

const upBtn = document.querySelector(".up-btn");
const upBtnDash = document.querySelector(".up-btn__dash");

export const initUpBtn = () => {
  if (upBtn && upBtnDash) {
    const tl = gsap.timeline({
      scrollTrigger: {
        scrub: true,
        start: `${window.innerHeight}px bottom`,
        end: "bottom bottom",
        onEnter: () => {
          upBtn.classList.add("_show");
        },
        onLeaveBack: () => {
          upBtn.classList.remove("_show");
        },
      },
    });

    tl.to(upBtnDash, {
      strokeDashoffset: 0,
      ease: "none",
    });

    upBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }
};
