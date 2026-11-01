const navs = document.querySelectorAll(".portal_page .portal_nav");

navs.forEach((nav, index) => {
  const page = nav.closest(".portal_page");
  const bar = document.createElement("div");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  nav.id = `portal-navigation-${index + 1}`;
  page.classList.add("mobile-nav-ready");
  nav.classList.remove("is-open");

  bar.className = "mobile_nav_bar";

  const logo = nav.querySelector("img");
  if (logo) {
    const logoCopy = logo.cloneNode();
    logoCopy.alt = "";
    logoCopy.className = "mobile_nav_logo";
    bar.appendChild(logoCopy);
  }

  button.type = "button";
  button.className = "portal_nav_toggle";
  button.setAttribute("aria-controls", nav.id);
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Show navigation");

  icon.className = "mobile_nav_icon";
  icon.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 3; i++) {
    icon.appendChild(document.createElement("span"));
  }

  button.appendChild(icon);
  bar.appendChild(button);
  page.insertBefore(bar, nav);

  function closeMenu() {
    nav.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Show navigation");
  }

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", isOpen);
    button.setAttribute("aria-label", isOpen ? "Hide navigation" : "Show navigation");
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      button.focus();
    }
  });

  window.matchMedia("(max-width: 700px)").addEventListener("change", (event) => {
    if (!event.matches) {
      closeMenu();
    }
  });
});
