(function () {
  var text = {
    en: {
      title_home: "Saltana — Real People. Real Voices.",
      title_privacy: "Privacy Policy — Saltana",
      title_terms: "Terms of Use — Saltana",
      title_support: "Support — Saltana",
      nav_home: "Home",
      nav_privacy: "Privacy",
      nav_terms: "Terms",
      nav_support: "Support",
      hero_title: "Real People.<br><em>Real Voices.</em>",
      hero_sub: "Meaningful Conversations.<br>Anytime, Anywhere.",
      alt_logo: "Saltana",
      alt_phone: "Saltana voice room on a phone",
      alt_apple: "Download on the App Store",
      alt_play: "Get it on Google Play"
    },
    ar: {
      title_home: "سلطانة — أشخاص حقيقيون. أصوات حقيقية.",
      title_privacy: "سياسة الخصوصية — سلطانة",
      title_terms: "شروط الاستخدام — سلطانة",
      title_support: "الدعم — سلطانة",
      nav_home: "الرئيسية",
      nav_privacy: "الخصوصية",
      nav_terms: "الشروط",
      nav_support: "الدعم",
      hero_title: "أشخاص حقيقيون.<br><em>أصوات حقيقية.</em>",
      hero_sub: "محادثات لها معنى.<br>في أي وقت، ومن أي مكان.",
      alt_logo: "سلطانة",
      alt_phone: "غرفة صوت سلطانة على الهاتف",
      alt_apple: "التنزيل من App Store",
      alt_play: "احصل عليه من Google Play"
    }
  };

  function current() {
    return localStorage.getItem("saltana-lang") === "ar" ? "ar" : "en";
  }

  function apply(lang) {
    var pack = text[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    var titleKey = document.body.getAttribute("data-title");
    if (titleKey && pack[titleKey]) document.title = pack[titleKey];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = pack[el.getAttribute("data-i18n")];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var value = pack[el.getAttribute("data-i18n-html")];
      if (value != null) el.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var value = pack[el.getAttribute("data-i18n-alt")];
      if (value != null) el.alt = value;
    });
    document.querySelectorAll("[data-panel]").forEach(function (el) {
      el.hidden = el.getAttribute("data-panel") !== lang;
    });
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-set-lang") === lang ? "true" : "false");
    });
    var page = document.body.getAttribute("data-page");
    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.getAttribute("data-nav") === page) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-set-lang]");
    if (!btn) return;
    var lang = btn.getAttribute("data-set-lang");
    localStorage.setItem("saltana-lang", lang);
    apply(lang);
  });

  apply(current());
})();
