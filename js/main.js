(function () {
  "use strict";

  /* ---------- контакты из contacts.js ---------- */
  var C = window.CONTACTS || {};
  function apply(selector, href, text) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (!href) { el.style.display = "none"; return; }
      el.setAttribute("href", href);
      if (text && el.hasAttribute("data-fill")) el.textContent = text;
    });
  }
  apply("[data-contact='telegram']", C.telegram);
  apply("[data-contact='whatsapp']", C.whatsapp);
  apply("[data-contact='max']", C.max);
  apply("[data-contact='email']", C.email ? "mailto:" + C.email : "", C.email);
  apply("[data-contact='phone']", C.phone ? "tel:" + C.phone.replace(/[^\d+]/g, "") : "", C.phone);

  /* ---------- мобильное меню ---------- */
  var header = document.querySelector(".header");
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- подсветка активного пункта меню ---------- */
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.classList.add("is-active");
  });

  /* ---------- лайтбокс для документов ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (!items.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML =
    '<button class="lightbox__btn lightbox__close" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z"/></svg></button>' +
    '<button class="lightbox__btn lightbox__prev" aria-label="Предыдущий"><svg viewBox="0 0 24 24"><path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg></button>' +
    '<img alt="">' +
    '<button class="lightbox__btn lightbox__next" aria-label="Следующий"><svg viewBox="0 0 24 24"><path d="M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z"/></svg></button>' +
    '<div class="lightbox__caption"></div>';
  document.body.appendChild(box);

  var img = box.querySelector("img");
  var cap = box.querySelector(".lightbox__caption");
  var idx = 0;

  function show(i) {
    idx = (i + items.length) % items.length;
    var el = items[idx];
    img.src = el.getAttribute("data-lightbox");
    img.alt = el.getAttribute("data-caption") || "";
    cap.textContent = el.getAttribute("data-caption") || "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  items.forEach(function (el, i) {
    el.addEventListener("click", function (e) { e.preventDefault(); show(i); });
  });
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();
