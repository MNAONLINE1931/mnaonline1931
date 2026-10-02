(function () {
  "use strict";

  const S = window.SHOP || {};
  const CAT_HI = window.CATEGORIES_HI || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => r.querySelectorAll(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const digits = (v) => String(v || "").replace(/\D/g, "");
  const waLink = (text) => "https://wa.me/" + digits(S.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : "");
  const place = S.mapQuery || [S.name, (S.address || "").replace(/\n/g, ", ")].filter(Boolean).join(", ");
  const WA_ICON = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';

  /* =========================================================
     Language: English by default, Hindi on request
     ========================================================= */
  const UI = {
    en: {
      title: "Devotional books and puja items, Kota",
      navCatalog: "Catalog", navVisit: "Visit", call: "Call",
      since: "Serving devotees since {y}", sinceFoot: "Since {y}.",
      browse: "Browse catalog", whatsappUs: "WhatsApp us", whatsapp: "WhatsApp",
      catalogTitle: "Catalog",
      catalogNote: "Prices can change with the season. Confirm on WhatsApp before you visit.",
      searchLabel: "Search products", searchPh: "Search diya, idol, agarbatti...",
      all: "All", count1: "1 product", countN: "{n} products", inCat: "{count} in {cat}",
      noMatch: 'No products match "{q}". Try another word, or ask the shop on WhatsApp.',
      emptyCat: "No products in this category yet.",
      loadError: "The catalog could not be loaded. Call or WhatsApp the shop for prices.",
      ask: "Ask", askAria: "Ask about {name} on WhatsApp", viewAria: "View details of {name}",
      outOfStock: "Out of stock", askPrice: "Ask for price", askOnWhatsapp: "Ask on WhatsApp",
      visitTitle: "Visit the shop",
      visitNote: "See the full range in person, including idols and brass not listed here.",
      address: "Address", hours: "Hours", phone: "Phone", directions: "Get directions",
      waFloat: "Chat with the shop on WhatsApp", close: "Close",
      msgGeneral: "Namaste, I have a question about your shop.",
      msgOrder: "Namaste, I would like to order: {name}",
      msgRestock: "Namaste, when will this be back in stock: {name}",
      marquee: ["Religious books", "Idols", "Laddu Gopal dresses", "Brass", "Puja samagri", "Agarbatti"],
    },
    hi: {
      title: "धार्मिक पुस्तकें और पूजा सामग्री, कोटा",
      navCatalog: "उत्पाद", navVisit: "पता", call: "कॉल करें",
      since: "{y} से भक्तों की सेवा में", sinceFoot: "{y} से।",
      browse: "उत्पाद देखें", whatsappUs: "व्हाट्सऐप करें", whatsapp: "व्हाट्सऐप",
      catalogTitle: "हमारे उत्पाद",
      catalogNote: "मौसम के अनुसार दाम बदल सकते हैं। आने से पहले व्हाट्सऐप पर पूछ लें।",
      searchLabel: "उत्पाद खोजें", searchPh: "दीया, मूर्ति, अगरबत्ती खोजें...",
      all: "सभी", count1: "1 उत्पाद", countN: "{n} उत्पाद", inCat: "{cat} में {count}",
      noMatch: '"{q}" से कोई उत्पाद नहीं मिला। कोई दूसरा शब्द आज़माएँ या व्हाट्सऐप पर पूछें।',
      emptyCat: "इस श्रेणी में अभी कोई उत्पाद नहीं है।",
      loadError: "कैटलॉग लोड नहीं हो सका। दाम के लिए दुकान पर कॉल या व्हाट्सऐप करें।",
      ask: "पूछें", askAria: "{name} के बारे में व्हाट्सऐप पर पूछें", viewAria: "{name} का विवरण देखें",
      outOfStock: "स्टॉक में नहीं", askPrice: "दाम पूछें", askOnWhatsapp: "व्हाट्सऐप पर पूछें",
      visitTitle: "दुकान पर आएँ",
      visitNote: "पूरी रेंज दुकान पर देखें, जिसमें यहाँ न दिखाई गई मूर्तियाँ और पीतल का सामान भी है।",
      address: "पता", hours: "समय", phone: "फ़ोन", directions: "रास्ता देखें",
      waFloat: "दुकान से व्हाट्सऐप पर बात करें", close: "बंद करें",
      msgGeneral: "नमस्ते, मुझे आपकी दुकान के बारे में जानकारी चाहिए।",
      msgOrder: "नमस्ते, मुझे यह चाहिए: {name}",
      msgRestock: "नमस्ते, यह दोबारा कब उपलब्ध होगा: {name}",
      marquee: ["धार्मिक पुस्तकें", "मूर्तियाँ", "लड्डू गोपाल पोशाक", "पीतल", "पूजा सामग्री", "अगरबत्ती"],
    },
  };

  let lang = document.documentElement.lang === "hi" ? "hi" : "en";
  const t = (key, vars) => {
    const s = UI[lang][key] ?? UI.en[key];
    return vars ? s.replace(/\{(\w+)\}/g, (_, v) => vars[v]) : s;
  };
  const shopText = (key) => (lang === "hi" && S[key + "_hi"]) || S[key] || "";
  const pick = (p, key) => (lang === "hi" && p[key + "_hi"]) || p[key] || "";
  const catLabel = (c) => (lang === "hi" && CAT_HI[c]) || c;

  /* ---------- Business details for Google search results ---------- */
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "Store",
    name: S.name, alternateName: "Mohan News Agency", url: location.origin, telephone: S.phone, description: S.tagline,
    address: { "@type": "PostalAddress", streetAddress: "Rampura Bazar, Rampura", addressLocality: "Kota",
      addressRegion: "Rajasthan", postalCode: "324006", addressCountry: "IN" },
    openingHours: "Mo-Su 05:00-20:00", hasMap: S.mapsLink,
  });
  document.head.appendChild(ld);

  /* ---------- Links that never change with language ---------- */
  $("#year").textContent = new Date().getFullYear();
  if (!S.since) $("#sincePill").remove();
  $$("[data-link]").forEach((el) => {
    const kind = el.dataset.link;
    if (kind === "tel") {
      if (!S.phone) return (el.closest("[data-optional]") || el).remove();
      el.href = "tel:" + String(S.phone).replace(/[^\d+]/g, "");
    } else if (kind === "whatsapp") {
      if (!S.whatsapp) return el.remove();
    } else if (kind === "directions") {
      el.href = S.mapsLink || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place);
    }
  });
  $("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(place) + "&output=embed";

  /* ---------- Everything that changes with language ---------- */
  function applyText() {
    document.documentElement.lang = lang;
    document.title = S.name + " | " + t("title");
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-shop]").forEach((el) => { const v = shopText(el.dataset.shop); if (v) el.textContent = v; });
    if (S.since) {
      $("#since").textContent = t("since", { y: S.since });
      $("#sinceFoot").textContent = t("sinceFoot", { y: S.since });
    }
    $$('[data-link="whatsapp"]').forEach((el) => (el.href = waLink(t("msgGeneral"))));
    const box = $("#lang");
    box.dataset.active = lang;
    $$("button", box).forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
  }

  /* ---------- Nav glass + floating button on scroll ---------- */
  const nav = $("#nav"), waFloat = $(".wa-float");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 24);
    if (waFloat) waFloat.classList.toggle("show", scrollY > innerHeight * 0.5);
  };
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mandala ---------- */
  (function buildMandala(el) {
    const layer = (cls, n, shape, extra) => {
      let s = "";
      for (let i = 0; i < n; i++) s += '<g transform="rotate(' + (i * 360 / n).toFixed(2) + ' 200 200)">' + shape + "</g>";
      return '<div class="layer ' + cls + '"><svg viewBox="0 0 400 400">' + (extra || "") + s + "</svg></div>";
    };
    el.innerHTML =
      layer("l1", 36, '<circle cx="200" cy="14" r="3.2"/>', '<circle class="ln" cx="200" cy="200" r="176"/>') +
      layer("l2", 24, '<path d="M200 36 Q215 68 200 100 Q185 68 200 36Z"/>', '<circle class="ln" cx="200" cy="200" r="106"/>') +
      layer("l3", 12, '<ellipse cx="200" cy="138" rx="17" ry="40"/>') +
      layer("l4", 8, '<path d="M200 146 Q224 174 200 200 Q176 174 200 146Z"/>', '<circle class="ln" cx="200" cy="200" r="60"/>');
  })($("#mandala"));

  /* ---------- Scroll reveal ---------- */
  const io = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  const reveal = (el) => (io ? io.observe(el) : el.classList.add("in"));
  $$(".reveal").forEach(reveal);

  /* ---------- Marquee ---------- */
  function buildMarquee() {
    const cats = [...new Set(state.all.map((p) => p.category))].map(catLabel);
    const words = cats.length ? cats : t("marquee");
    let items = [];
    while (items.length < 10) items = items.concat(words);
    const half = items.map((w) => "<span>" + esc(w) + "</span><i>✦</i>").join("");
    $("#marquee").innerHTML = '<div class="marquee-half">' + half + '</div><div class="marquee-half">' + half + "</div>";
  }

  /* ---------- Catalog ---------- */
  const grid = $("#grid"), chips = $("#chips"), status = $("#status"), search = $("#q");
  const state = { all: [], cat: "All", q: "" };
  const tints = ["#FFE3CC", "#FFF0B8", "#FFD9DE", "#DDF3E4", "#EADFF7", "#DCEBFA"];
  const catTint = {};

  function imageUrl(v) {
    if (!v) return "";
    if (/^https?:\/\//i.test(v)) return v;
    return "images/" + String(v).replace(/^\/?(images\/)?/, "");
  }

  function toProducts(list) {
    const str = (v) => (v == null ? "" : String(v).trim());
    return list
      .filter((p) => p && p.name)
      .map((p, id) => ({
        id,
        name: str(p.name), name_hi: str(p.name_hi),
        category: str(p.category) || "Other",
        price: str(p.price), price_hi: str(p.price_hi),
        description: str(p.description), description_hi: str(p.description_hi),
        image: imageUrl(p.image),
        inStock: p.inStock !== false,
      }));
  }

  function priceHTML(p) {
    const raw = p.price.replace(/^(₹|rs\.?)\s*/i, "").replace(/,/g, "");
    if (raw && !isNaN(Number(raw))) return '<span class="price">₹' + Number(raw).toLocaleString("en-IN") + "</span>";
    return '<span class="price price-text">' + esc(pick(p, "price") || t("askPrice")) + "</span>";
  }

  const phHTML = (name) => '<div class="ph"><span>' + esc(String(name || "?").charAt(0)) + "</span></div>";
  const mediaHTML = (p) => p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(pick(p, "name")) + '" loading="lazy">' : phHTML(p.name);

  function card(p, i, initial) {
    const name = pick(p, "name"), desc = pick(p, "description");
    const ask = p.inStock && S.whatsapp
      ? '<a class="ask" href="' + esc(waLink(t("msgOrder", { name: p.name + (p.name_hi ? " (" + p.name_hi + ")" : "") }))) +
        '" target="_blank" rel="noopener" aria-label="' + esc(t("askAria", { name })) + '">' + WA_ICON + "<span>" + esc(t("ask")) + "</span></a>"
      : "";
    return '<li class="card reveal' + (initial ? "" : " in") + (p.inStock ? "" : " out") + '" data-id="' + p.id + '"' +
      ' style="--tint:' + catTint[p.category] + ";--d:" + (i % 4) * 80 + "ms;view-transition-name:c" + p.id + '">' +
        '<div class="card-media">' + mediaHTML(p) +
          '<span class="tag">' + esc(catLabel(p.category)) + "</span>" +
          (p.inStock ? "" : '<span class="oos">' + esc(t("outOfStock")) + "</span>") +
        "</div>" +
        '<div class="card-body">' +
          '<h3 class="card-name">' + esc(name) + "</h3>" +
          (desc ? '<p class="card-desc">' + esc(desc) + "</p>" : "") +
          '<div class="card-foot">' + priceHTML(p) + ask + "</div>" +
        "</div>" +
        '<button type="button" class="card-hit" aria-label="' + esc(t("viewAria", { name })) + '"></button>' +
      "</li>";
  }

  function render(initial) {
    const q = state.q.toLowerCase();
    const list = state.all.filter((p) =>
      (state.cat === "All" || p.category === state.cat) &&
      (!q || [p.name, p.name_hi, p.category, CAT_HI[p.category], p.description, p.description_hi]
        .join(" ").toLowerCase().includes(q)));
    grid.innerHTML = list.map((p, i) => card(p, i, initial)).join("");
    if (initial) $$(".card", grid).forEach(reveal);

    if (!list.length) {
      status.textContent = q ? t("noMatch", { q: state.q }) : t("emptyCat");
    } else {
      const count = list.length === 1 ? t("count1") : t("countN", { n: list.length });
      status.textContent = state.cat === "All" ? count : t("inCat", { count, cat: catLabel(state.cat) });
    }
  }

  // Smooth morph for filtering and language change (instant where unsupported)
  const transition = (fn) => (document.startViewTransition && !reduceMotion ? document.startViewTransition(fn) : fn());

  /* Category chips with a sliding highlight */
  function buildChips() {
    const cats = ["All", ...new Set(state.all.map((p) => p.category))];
    cats.slice(1).forEach((c, i) => (catTint[c] = tints[i % tints.length]));
    chips.innerHTML = '<span class="chip-ind" aria-hidden="true"></span>' + cats.map((c) =>
      '<button type="button" class="chip" aria-pressed="' + (c === state.cat) + '" data-cat="' + esc(c) + '">' +
      esc(c === "All" ? t("all") : catLabel(c)) + "</button>"
    ).join("");
    moveIndicator(false);
  }

  function moveIndicator(animate) {
    const ind = $(".chip-ind", chips), btn = $('.chip[aria-pressed="true"]', chips);
    if (!ind || !btn) return;
    if (!animate) ind.style.transition = "none";
    ind.style.width = btn.offsetWidth + "px";
    ind.style.transform = "translateX(" + btn.offsetLeft + "px)";
    if (!animate) { void ind.offsetWidth; ind.style.transition = ""; }
  }
  addEventListener("resize", () => moveIndicator(false));
  if (document.fonts) document.fonts.ready.then(() => moveIndicator(false));

  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn || btn.dataset.cat === state.cat) return;
    state.cat = btn.dataset.cat;
    $$(".chip", chips).forEach((b) => b.setAttribute("aria-pressed", b === btn));
    moveIndicator(true);
    btn.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
    transition(() => render(false));
  });

  let typing;
  search.addEventListener("input", () => {
    clearTimeout(typing);
    typing = setTimeout(() => { state.q = search.value.trim(); transition(() => render(false)); }, 180);
  });

  /* ---------- Quick view ---------- */
  const qv = $("#qv");
  let qvProduct = null;
  function fillQuickView(p) {
    const media = $("#qvMedia");
    media.style.setProperty("--tint", catTint[p.category]);
    media.innerHTML = mediaHTML(p);
    $("#qvCat").textContent = catLabel(p.category);
    $("#qvTitle").textContent = pick(p, "name");
    $("#qvDesc").textContent = pick(p, "description");
    $("#qvPrice").innerHTML = priceHTML(p) + (p.inStock ? "" : '<span class="oos-inline">' + esc(t("outOfStock")) + "</span>");
    const ask = $("#qvAsk");
    ask.hidden = !S.whatsapp;
    const label = p.name + (p.name_hi ? " (" + p.name_hi + ")" : "");
    ask.href = waLink(t(p.inStock ? "msgOrder" : "msgRestock", { name: label }));
  }
  function openQuickView(p) {
    qvProduct = p;
    fillQuickView(p);
    qv.showModal();
    document.documentElement.classList.add("lock");
    void qv.offsetWidth;
    qv.classList.add("show");
  }
  function closeQuickView() {
    qvProduct = null;
    qv.classList.remove("show");
    document.documentElement.classList.remove("lock");
    setTimeout(() => qv.close(), reduceMotion ? 0 : 300);
  }
  qv.addEventListener("cancel", (e) => { e.preventDefault(); closeQuickView(); });
  qv.addEventListener("click", (e) => { if (e.target === qv || e.target.closest(".qv-close")) closeQuickView(); });
  grid.addEventListener("click", (e) => {
    const hit = e.target.closest(".card-hit");
    if (hit) openQuickView(state.all[+hit.closest(".card").dataset.id]);
  });

  // Broken photo link: show the letter placeholder instead
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.closest(".card-media, .qv-media")) img.outerHTML = phHTML(img.alt);
  }, true);

  /* ---------- Language switch ---------- */
  $("#lang").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (!btn || btn.dataset.lang === lang) return;
    lang = btn.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (err) { /* private mode */ }
    transition(() => {
      applyText();
      buildChips();
      render(false);
      buildMarquee();
      if (qvProduct) fillQuickView(qvProduct);
    });
  });

  /* ---------- Start ---------- */
  applyText();
  if (Array.isArray(window.PRODUCTS)) {
    state.all = toProducts(window.PRODUCTS);
    buildChips();
    render(true);
  } else {
    console.error("products.js did not load. Check it for a missing comma, quote or bracket.");
    status.textContent = t("loadError");
  }
  buildMarquee();
})();
