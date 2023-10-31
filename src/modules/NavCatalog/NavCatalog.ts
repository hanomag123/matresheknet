class NavCatalogController {
  container: HTMLElement;
  items: NodeListOf<HTMLElement>;
  isActive: boolean;
  bg: HTMLElement;
  closeBtn: HTMLElement;
  backBtn: HTMLElement;
  infoTitle: HTMLElement;

  constructor(
    container: HTMLElement,
    bg: HTMLElement,
    items: NodeListOf<HTMLElement>,
    closeBtn: HTMLElement,
    backBtn: HTMLElement,
    infoTitle: HTMLElement,
  ) {
    this.container = container;
    this.bg = bg;
    this.items = items;
    this.closeBtn = closeBtn;
    this.backBtn = backBtn;
    this.infoTitle = infoTitle;
    this.isActive = false;

    this.container.addEventListener("click", (e) => {
      e.stopPropagation();
      this.openMenu();
    });

    this.bg.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeMenu();
    });

    this.closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeMenu();
    });

    this.backBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.closeItems();
    });

    items.forEach((i) => {
      const itemTitle = i.getAttribute("data-title");
      const btn = i.querySelector<HTMLElement>("[data-nav-btn]");

      if (btn) {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.openItem(i, itemTitle);
        });
      }
    });
  }

  openMenu() {
    this.isActive = true;
    this.container.classList.add("_active");
  }

  closeMenu() {
    this.isActive = false;
    this.container.classList.remove("_active");
    this.closeItems();
  }

  openItem(target: HTMLElement, title: string | null) {
    this.items.forEach((i) => {
      if (i === target) {
        if (title) {
          this.infoTitle.textContent = title;
        }
        i.classList.add("_active");
        this.container.classList.add("_open-item");
      } else {
        i.classList.remove("_active");
      }
    });
  }

  closeItems() {
    this.items.forEach((i) => {
      i.classList.remove("_active");
    });
    this.container.classList.remove("_open-item");
  }
}

const menu =
  document.querySelector<HTMLElement>(".nav-catalog") ||
  document.createElement("div");
const menuBG =
  document.querySelector<HTMLElement>(".nav-catalog__bg") ||
  document.createElement("div");
const menuItems =
  document.querySelectorAll<HTMLElement>(".nav-catalog-item") ||
  document.createElement("div");
const closeBtn =
  document.querySelector<HTMLElement>(".nav-catalog__close") ||
  document.createElement("div");
const backBtn =
  document.querySelector<HTMLElement>(".nav-catalog__back") ||
  document.createElement("div");
const infoTitle =
  document.querySelector<HTMLElement>(".nav-catalog-info__title") ||
  document.createElement("div");

export const navCatalogController = new NavCatalogController(
  menu,
  menuBG,
  menuItems,
  closeBtn,
  backBtn,
  infoTitle,
);
