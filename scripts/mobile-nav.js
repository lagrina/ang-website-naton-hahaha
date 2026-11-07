const navs = document.querySelectorAll(".portal_page .portal_nav");

navs.forEach((nav, i) => {
  const page = nav.closest(".portal_page");
  const bar = document.createElement("div");
  const btn = document.createElement("button");
  const icon = document.createElement("span");
  const logo = nav.querySelector("img");

  nav.id = "portal-navigation-" + (i + 1);
  page.classList.add("mobile-nav-ready");
  nav.classList.remove("is-open");
  bar.className = "mobile_nav_bar";

  if (logo) {
    const copy = logo.cloneNode();
    copy.alt = "";
    copy.className = "mobile_nav_logo";
    bar.appendChild(copy);
  }

  btn.type = "button";
  btn.className = "portal_nav_toggle";
  btn.setAttribute("aria-controls", nav.id);
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Show navigation");

  icon.className = "mobile_nav_icon";
  icon.setAttribute("aria-hidden", "true");

  for (let x = 0; x < 3; x++) {
    icon.appendChild(document.createElement("span"));
  }

  btn.appendChild(icon);
  bar.appendChild(btn);
  page.insertBefore(bar, nav);

  const closeMenu = () => {
    nav.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Show navigation");
  };

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Hide navigation" : "Show navigation");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      btn.focus();
    }
  });

  window.matchMedia("(max-width: 700px)").addEventListener("change", (e) => {
    if (!e.matches) closeMenu();
  });
});
