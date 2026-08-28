(function() {
  /* ==========================================================================
     1. POMOCNÉ FUNKCE A SCROLLOVÁNÍ
  ========================================================================== */
  const select = (el, all = false) => {
    if (!el) return null;
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const onscroll = (el, listener) => {
    if (el) el.addEventListener('scroll', listener);
  };

  const scrollto = (el) => {
    const targetElement = select(el);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ==========================================================================
     3. INICIALIZACE ZBYTKU WEBU (VČETNĚ NAVIGACE A MENU)
  ========================================================================== */
  function initMain() {
    const selectNavbar = select('#navbar');
    if (selectNavbar) {
      const navbarScrolled = () => {
        if (window.scrollY > 100) {
          selectNavbar.classList.add('navbar-scrolled');
        } else {
          selectNavbar.classList.remove('navbar-scrolled');
        }
      };
      navbarScrolled();
      onscroll(window, navbarScrolled);
    }

    const navbarlinks = select('#navbar .scrollto', true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    navbarlinksActive();
    onscroll(window, navbarlinksActive);

    // Ovládání mobilního hamburger menu
    const menu = select(".menu");
    const hamburger = select(".hamburger");
    const menuIcon = select(".svg-menu");
    const closeIcon = select(".svg-menu-close");
    const allAnchorLinks = select('a[href^="#"]', true);

    function toggleMenu() {
      if (!menu || !menuIcon || !closeIcon || !hamburger) return;

      menu.classList.toggle("showMenu");
      const isMenuNowOpen = menu.classList.contains("showMenu");
      hamburger.setAttribute("aria-expanded", isMenuNowOpen);
      
      if (isMenuNowOpen) {
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
      } else {
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
      }
    }

    if (hamburger) {
      hamburger.addEventListener("click", toggleMenu);
    }

    allAnchorLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (menu && menu.classList.contains("showMenu")) {
          toggleMenu();
        }
        if (href && href.startsWith("#") && href !== "#") {
          e.preventDefault();
          scrollto(href);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMain);
  } else {
    initMain();
  }
})();
