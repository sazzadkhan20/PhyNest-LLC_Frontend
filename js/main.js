(() => {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  const year = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const onScroll = () => {
    if (!header) return;
    if (header.classList.contains("header-solid")) {
      header.classList.add("is-scrolled");
      return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    const spy = () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.id;
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const id = href.includes("#") ? href.split("#")[1] : "";
        link.classList.toggle("is-active", id === current);
      });
    };

    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item").forEach((other) => {
        other.classList.remove("is-open");
        const otherBtn = other.querySelector(".faq-question");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.style.maxHeight = "0px";
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight + 24}px`;
      }
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = /** @type {HTMLInputElement} */ (
        contactForm.querySelector("#name")
      ).value.trim();
      const email = /** @type {HTMLInputElement} */ (
        contactForm.querySelector("#email")
      ).value.trim();
      const phone = /** @type {HTMLInputElement} */ (
        contactForm.querySelector("#phone")
      ).value.trim();
      const message = /** @type {HTMLTextAreaElement} */ (
        contactForm.querySelector("#message")
      ).value.trim();

      if (!name || !email || !message) {
        contactForm.reportValidity();
        return;
      }

      const subject = encodeURIComponent(`Website inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:phynestllc@gmail.com?subject=${subject}&body=${body}`;

      if (formSuccess) {
        formSuccess.classList.add("is-visible");
      }
    });
  }
})();
