/* =====================================================================
   APP.JS - MOTOR DINÂMICO DE ALTA CONVERSÃO
   Renderiza a loja completa a partir de window.STORE_CONFIG
   ===================================================================== */

(function () {
  "use strict";

  const S = window.STORE_CONFIG;
  if (!S) {
    console.error("STORE_CONFIG não encontrado em js/config.js");
    return;
  }

  // --- Helpers Rápidos ---
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const brl = (cents) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const setAll = (sel, val, prop = "textContent") => $$(sel).forEach((el) => (el[prop] = val));

  // Ícone SVG inline padrão
  const icon = (name) => `<svg class="icon"><use href="#i-${name}"/></svg>`;

  // Selo Azul de Verificado
  const VERIFIED_BADGE = `<svg class="verified-title-badge" viewBox="0 0 24 24" aria-label="Produto Verificado" title="Produto Oficial Verificado"><path fill="#1763cf" d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"/><path fill="#ffffff" d="M10.54 16.2 6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>`;

  // --- Estado Global da Página ---
  let selectedOfferId = S.defaultOfferId || S.offers[0].id;
  let selectedVariants = {};
  let currentImageIndex = 0;
  let orderBumpActive = false;

  // Inicializar primeira variante de cada grupo
  if (S.variants && S.variants.length > 0) {
    S.variants.forEach((vg) => {
      const def = vg.options.find((o) => o.selected) || vg.options[0];
      selectedVariants[vg.group] = def.label;
    });
  }

  // Obter oferta selecionada
  const getSelectedOffer = () => S.offers.find((o) => o.id === selectedOfferId) || S.offers[0];

  /* -------------------------------------------------------------
     1. INICIALIZAÇÃO DE TEXTOS E DADOS BÁSICOS
     ------------------------------------------------------------- */
  function initBasicTexts() {
    // Topbar & Campanha
    setAll("[data-topbar-text]", S.campaign.topbarText);
    setAll("[data-campaign-label]", S.campaign.label);
    setAll("[data-discount-badge]", S.campaign.discountBadge);

    // Marca
        // Marca & Logotipo Oficial
    const logoContainers = $$(".brand-logo");
    logoContainers.forEach((el) => {
      if (S.brand.logoImage) {
        el.innerHTML = `<img src="${S.brand.logoImage}" alt="${esc(S.brand.name)}" class="brand-logo-img" style="height: 48px; width: auto; object-fit: contain; border-radius: 8px;"> <span>${esc(S.brand.name)}</span>`;
      } else {
        el.innerHTML = `<span data-brand-name>${esc(S.brand.name)}</span>`;
      }
    });

    const drawerLogo = $(".drawer-header b");
    if (drawerLogo && S.brand.logoImage) {
      drawerLogo.innerHTML = `<img src="${S.brand.logoImage}" alt="${esc(S.brand.name)}" style="height: 36px; width: auto; vertical-align: middle; margin-right: 8px; border-radius: 6px;"> ${esc(S.brand.name)}`;
    }

    setAll("[data-brand-name]", S.brand.name);
    setAll("[data-brand-slogan]", S.brand.slogan);
    setAll("[data-brand-address]", S.brand.address);
    setAll("[data-brand-cnpj]", S.brand.cnpj);
    setAll("[data-brand-email]", S.brand.email);
    setAll("[data-brand-hours]", S.brand.hours);
    setAll("[data-brand-about]", S.brand.about);
    setAll("[data-current-year]", new Date().getFullYear());

    // Produto
    const titleEl = $("[data-product-title]");
    if (titleEl) {
      titleEl.innerHTML = `${esc(S.product.title)} ${VERIFIED_BADGE}`;
    }
    setAll("[data-product-short-title]", S.product.shortTitle);
    setAll("[data-product-category]", S.product.category);
    setAll("[data-rating]", S.product.rating);
    setAll("[data-rating-count]", S.product.ratingCount);
    setAll("[data-clients-count]", S.product.clientsCount);
    setAll("[data-warranty]", S.product.warranty);

    // WhatsApp Float Link
    const waBtn = $("[data-whatsapp-btn]");
    if (waBtn && S.brand.whatsapp) {
      const waUrl = `https://wa.me/${S.brand.whatsapp}?text=${encodeURIComponent(S.brand.whatsappMessage || "Olá!")}`;
      waBtn.href = waUrl;
    }
  }

  /* -------------------------------------------------------------
     2. GALERIA DE IMAGENS E LIGHTBOX
     ------------------------------------------------------------- */
  function initGallery() {
    const mainImg = $("[data-gallery-main-img]");
    const thumbsTrack = $("[data-gallery-thumbs]");
    if (!mainImg || !S.product.images || S.product.images.length === 0) return;

    // Atualiza imagem principal
    const updateMain = (index) => {
      currentImageIndex = index;
      const imgData = S.product.images[index];
      mainImg.src = imgData.src;
      mainImg.alt = imgData.alt || S.product.title;

      $$(".gallery-thumb").forEach((th, i) => {
        th.classList.toggle("active", i === index);
      });
    };

    // Monta miniaturas
    thumbsTrack.innerHTML = S.product.images
      .map(
        (img, i) => `
        <button type="button" class="gallery-thumb ${i === 0 ? "active" : ""}" data-thumb-index="${i}" aria-label="Ver foto ${i + 1}">
          <img src="${img.thumb || img.src}" alt="${esc(img.alt || "")}" loading="lazy">
        </button>
      `
      )
      .join("");

    thumbsTrack.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-thumb-index]");
      if (btn) {
        updateMain(parseInt(btn.dataset.thumbIndex, 10));
      }
    });

    updateMain(0);

    // Lightbox ao clicar na imagem principal
    const lightbox = $("[data-lightbox]");
    if (lightbox) {
      const lbImg = lightbox.querySelector("img");
      const lbCounter = lightbox.querySelector("[data-lb-counter]");

      const openLightbox = (index) => {
        currentImageIndex = index;
        lbImg.src = S.product.images[index].src;
        if (lbCounter) lbCounter.textContent = `${index + 1} / ${S.product.images.length}`;
        lightbox.hidden = false;
        document.body.classList.add("modal-open");
      };

      const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.classList.remove("modal-open");
      };

      mainImg.parentElement.addEventListener("click", () => openLightbox(currentImageIndex));

      $("[data-close-lightbox]")?.addEventListener("click", closeLightbox);
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      $("[data-lb-prev]")?.addEventListener("click", () => {
        const prev = (currentImageIndex - 1 + S.product.images.length) % S.product.images.length;
        openLightbox(prev);
      });

      $("[data-lb-next]")?.addEventListener("click", () => {
        const next = (currentImageIndex + 1) % S.product.images.length;
        openLightbox(next);
      });

      document.addEventListener("keydown", (e) => {
        if (!lightbox.hidden && e.key === "Escape") closeLightbox();
      });
    }
  }

  /* -------------------------------------------------------------
     3. RENDERIZAÇÃO DE KITS / OFERTAS
     ------------------------------------------------------------- */
  function initOffers() {
    const container = $("[data-offers-container]");
    if (!container || !S.offers) return;

    container.innerHTML = S.offers
      .map((o) => {
        const isActive = o.id === selectedOfferId;
        return `
        <div class="offer-card ${isActive ? "active" : ""}" data-offer-id="${o.id}">
          ${o.badge ? `<span class="offer-badge">${esc(o.badge)}</span>` : ""}
          <div class="offer-radio" aria-hidden="true"></div>
          <img src="${o.image}" alt="${esc(o.label)}" class="offer-img">
          <div class="offer-details">
            <b class="offer-title">${esc(o.label)}</b>
            <span class="offer-sub">${esc(o.sub || "")}</span>
            <span class="offer-features">${icon("check")} ${esc(o.features || "")}</span>
          </div>
          <div class="offer-price-col">
            <span class="offer-price-now">${brl(o.price)}</span>
            <span class="offer-price-old">De ${brl(o.compareAt)}</span>
          </div>
        </div>
      `;
      })
      .join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest("[data-offer-id]");
      if (card) {
        selectedOfferId = card.dataset.offerId;
        $$(".offer-card").forEach((c) => c.classList.toggle("active", c === card));
        updatePriceDisplay();
        updateStickyBar();
      }
    });

    updatePriceDisplay();
  }

  /* -------------------------------------------------------------
     4. ATUALIZAÇÃO DO BLOCO DE PREÇO E PARCELAMENTO
     ------------------------------------------------------------- */
  function updatePriceDisplay() {
    const offer = getSelectedOffer();
    if (!offer) return;

    setAll("[data-price-compare]", `De ${brl(offer.compareAt)} por`);
    setAll("[data-price-now]", brl(offer.price));
    setAll("[data-price-save]", brl(offer.save));

    // Percentual de desconto
    const offPct = Math.round(((offer.compareAt - offer.price) / offer.compareAt) * 100);
    setAll("[data-price-off]", `-${offPct}% OFF`);

    // Parcelamento
    const noInterest = S.installments?.noInterest || 3;
    const maxInst = S.installments?.max || 12;
    const instValue = Math.round(offer.price / noInterest);

    setAll("[data-inst-n]", noInterest);
    setAll("[data-inst-val]", brl(instValue));
    setAll("[data-inst-max]", maxInst);
  }

  /* -------------------------------------------------------------
     5. SELETOR DE VARIAÇÕES (CORES, TAMANHOS, MODELOS)
     ------------------------------------------------------------- */
  function initVariants() {
    const container = $("[data-variants-container]");
    if (!container || !S.variants || S.variants.length === 0) return;

    container.innerHTML = S.variants
      .map((group) => {
        return `
        <div class="variant-group">
          <div class="variant-group-title">
            <b>${esc(group.group)}</b>: <span data-var-selected="${esc(group.group)}">${esc(selectedVariants[group.group] || "")}</span>
          </div>
          <div class="variant-chips" data-group-name="${esc(group.group)}">
            ${group.options
              .map((opt) => {
                const isSelected = selectedVariants[group.group] === opt.label;
                const colorDot = group.type === "color" && opt.colorCode ? `<span class="variant-color-dot" style="background-color: ${opt.colorCode}"></span>` : "";
                return `
                <button type="button" class="variant-chip ${isSelected ? "active" : ""}" data-variant-val="${esc(opt.label)}">
                  ${colorDot}
                  <span>${esc(opt.label)}</span>
                </button>
              `;
              })
              .join("")}
          </div>
        </div>
      `;
      })
      .join("");

    container.addEventListener("click", (e) => {
      const chip = e.target.closest(".variant-chip");
      if (!chip) return;
      const chipsWrap = chip.closest("[data-group-name]");
      const groupName = chipsWrap.dataset.groupName;
      const val = chip.dataset.variantVal;

      selectedVariants[groupName] = val;

      chipsWrap.querySelectorAll(".variant-chip").forEach((c) => c.classList.toggle("active", c === chip));
      const lbl = container.querySelector(`[data-var-selected="${groupName}"]`);
      if (lbl) lbl.textContent = val;
    });
  }

  /* -------------------------------------------------------------
     6. CHECKOUT E PRESERVAÇÃO DE PARÂMETROS UTM
     ------------------------------------------------------------- */
  const buildCheckoutUrl = (offer, includeOrderBump = false) => {
    let url = offer.checkoutUrl || "#";
    if (url === "#") return "#";

    try {
      const u = new URL(url);
      // Repassa todos os parâmetros atuais da URL (UTMs, src, etc.)
      new URLSearchParams(window.location.search).forEach((v, k) => {
        if (!u.searchParams.has(k)) u.searchParams.append(k, v);
      });

      // Anexa variações escolhidas
      Object.entries(selectedVariants).forEach(([k, v]) => {
        u.searchParams.append(`var_${k.toLowerCase()}`, v);
      });

      // Anexa Order Bump se selecionado
      if (includeOrderBump && S.orderBump?.enabled && S.orderBump.checkoutParam) {
        const [k, v] = S.orderBump.checkoutParam.split("=");
        if (k) u.searchParams.append(k, v || "1");
      }

      return u.toString();
    } catch {
      return url;
    }
  };

  /* -------------------------------------------------------------
     7. MODAL DE CONFIRMAÇÃO COM ORDER BUMP (UPSELL)
     ------------------------------------------------------------- */
  function initOrderModal() {
    const modal = $("[data-order-modal]");
    const buyBtns = $$("[data-buy-btn]");
    if (!modal) return;

    const modalOfferTitle = modal.querySelector("[data-modal-offer-title]");
    const modalOfferImg = modal.querySelector("[data-modal-offer-img]");
    const modalVariantsText = modal.querySelector("[data-modal-variants]");
    const modalTotalNow = modal.querySelector("[data-modal-total-now]");
    const modalTotalCompare = modal.querySelector("[data-modal-total-compare]");
    const bumpCheckbox = modal.querySelector("[data-order-bump-checkbox]");
    const finishBtn = modal.querySelector("[data-finish-checkout-btn]");

    const updateModalTotal = () => {
      const offer = getSelectedOffer();
      let totalNow = offer.price;
      let totalCompare = offer.compareAt;

      if (orderBumpActive && S.orderBump?.enabled) {
        totalNow += S.orderBump.price;
        totalCompare += S.orderBump.compareAt;
      }

      if (modalTotalNow) modalTotalNow.textContent = brl(totalNow);
      if (modalTotalCompare) modalTotalCompare.textContent = brl(totalCompare);
      if (finishBtn) finishBtn.href = buildCheckoutUrl(offer, orderBumpActive);
    };

    const openOrderModal = () => {
      const offer = getSelectedOffer();
      if (modalOfferTitle) modalOfferTitle.textContent = offer.label;
      if (modalOfferImg) modalOfferImg.src = offer.image;

      // Resumo das variações
      const varsSummary = Object.entries(selectedVariants)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ");
      if (modalVariantsText) modalVariantsText.textContent = varsSummary || "Padrão Oficial";

      orderBumpActive = false;
      if (bumpCheckbox) bumpCheckbox.checked = false;

      updateModalTotal();

      modal.hidden = false;
      document.body.classList.add("modal-open");
    };

    const closeOrderModal = () => {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    };

    buyBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // Se order bump habilitado, abre o modal de confirmação.
        // Se preferir ir direto, basta mudar para: window.location.href = buildCheckoutUrl(getSelectedOffer());
        if (S.orderBump?.enabled) {
          openOrderModal();
        } else {
          window.location.href = buildCheckoutUrl(getSelectedOffer());
        }
      });
    });

    if (bumpCheckbox) {
      bumpCheckbox.addEventListener("change", (e) => {
        orderBumpActive = e.target.checked;
        updateModalTotal();
      });
    }

    modal.querySelectorAll("[data-close-modal]").forEach((b) => {
      b.addEventListener("click", closeOrderModal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) closeOrderModal();
    });

    // Ordem bump info
    const bumpWrap = modal.querySelector("[data-order-bump-wrap]");
    if (bumpWrap && S.orderBump?.enabled) {
      modal.querySelector("[data-bump-title]").textContent = S.orderBump.title;
      modal.querySelector("[data-bump-desc]").textContent = S.orderBump.description;
      modal.querySelector("[data-bump-price]").textContent = `+ ${brl(S.orderBump.price)}`;
    } else if (bumpWrap) {
      bumpWrap.hidden = true;
    }
  }

  /* -------------------------------------------------------------
     8. SIMULADOR DE CEP VIA API PÚBLICA (VIACEP)
     ------------------------------------------------------------- */
  function initCep() {
    const form = $("[data-cep-form]");
    const input = $("[data-cep-input]");
    const out = $("[data-cep-out]");
    if (!form || !input || !out) return;

    // Máscara 00000-000
    input.addEventListener("input", () => {
      let v = input.value.replace(/\D/g, "").slice(0, 8);
      if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
      input.value = v;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const raw = input.value.replace(/\D/g, "");
      if (raw.length !== 8) {
        out.className = "cep-out";
        out.innerHTML = `<span style="color: #dc2626;">Digite um CEP válido com 8 dígitos.</span>`;
        return;
      }

      out.className = "cep-out";
      out.textContent = "Consultando Correios...";

      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (data.erro) {
          out.innerHTML = `<span style="color: #dc2626;">CEP não encontrado. Verifique e tente novamente.</span>`;
          return;
        }

        out.className = "cep-out success";
        out.innerHTML = `
          ${icon("truck")}
          <span><b>Frete Grátis</b> para ${data.localidade} - ${data.uf} (Prazo: <b>5 a 9 dias úteis</b>)</span>
        `;
      } catch {
        out.className = "cep-out success";
        out.innerHTML = `${icon("truck")} <span><b>Frete Grátis</b> para sua região (Prazo: <b>5 a 9 dias úteis</b>)</span>`;
      }
    });
  }

  /* -------------------------------------------------------------
     9. DESTAQUES, COMPARATIVO, BENEFÍCIOS, SPECS E FAQ
     ------------------------------------------------------------- */
  function initDynamicSections() {
    // Bullets de destaque na BuyBox
    const checksList = $("[data-highlights-list]");
    if (checksList && S.highlights) {
      checksList.innerHTML = S.highlights
        .map((h) => `<li>${icon("check")} <span>${esc(h)}</span></li>`)
        .join("");
    }

    // Tabela Comparativa (Nosso vs Outros)
    const compTable = $("[data-comparison-table]");
    if (compTable && S.comparison?.rows) {
      compTable.innerHTML = `
        <thead>
          <tr>
            <th>${esc(S.comparison.columns[0])}</th>
            <th class="highlight">${esc(S.comparison.columns[1])}</th>
            <th>${esc(S.comparison.columns[2])}</th>
          </tr>
        </thead>
        <tbody>
          ${S.comparison.rows
            .map(
              (r) => `
            <tr>
              <td><b>${esc(r.feature)}</b></td>
              <td class="highlight">
                <span class="check-item ok">${icon("check")} ${esc(r.our)}</span>
              </td>
              <td>
                <span class="check-item bad">${icon("x")} ${esc(r.others)}</span>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      `;
    }

    // Benefícios em Cards
    const benGrid = $("[data-benefits-grid]");
    if (benGrid && S.benefits) {
      benGrid.innerHTML = S.benefits
        .map(
          (b) => `
        <div class="benefit-card">
          <div class="benefit-icon-box">${icon(b.icon || "shield")}</div>
          <h3 class="benefit-title">${esc(b.title)}</h3>
          <p class="benefit-text">${esc(b.text)}</p>
        </div>
      `
        )
        .join("");
    }

    // Especificações Técnicas
    const specsTable = $("[data-specs-table]");
    if (specsTable && S.specs) {
      specsTable.innerHTML = S.specs
        .map(
          ([k, v]) => `
        <tr>
          <td>${esc(k)}</td>
          <td>${esc(v)}</td>
        </tr>
      `
        )
        .join("");
    }

    // O que vem na caixa
    const boxList = $("[data-box-list]");
    if (boxList && S.whatsInTheBox) {
      boxList.innerHTML = S.whatsInTheBox
        .map((item) => `<li>${icon("box")} <span>${esc(item)}</span></li>`)
        .join("");
    }

    // FAQ Accordion
    const faqList = $("[data-faq-list]");
    if (faqList && S.faq) {
      faqList.innerHTML = S.faq
        .map(
          ([q, a], i) => `
        <div class="faq-item ${i === 0 ? "active" : ""}">
          <button type="button" class="faq-question">
            <span>${esc(q)}</span>
            <span class="faq-chevron">${icon("chevron")}</span>
          </button>
          <div class="faq-answer" style="${i === 0 ? "max-height: 250px" : ""}">
            <div class="faq-answer-inner">${esc(a)}</div>
          </div>
        </div>
      `
        )
        .join("");

      faqList.addEventListener("click", (e) => {
        const btn = e.target.closest(".faq-question");
        if (!btn) return;
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("active");
        const ans = item.querySelector(".faq-answer");

        $$(".faq-item").forEach((it) => {
          it.classList.remove("active");
          it.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("active");
          ans.style.maxHeight = ans.scrollHeight + "px";
        }
      });
    }

    // Avaliações dos Clientes
    const reviewsGrid = $("[data-reviews-grid]");
    if (reviewsGrid && S.reviews) {
      reviewsGrid.innerHTML = S.reviews
        .map(
          (r) => `
        <div class="review-card">
          <div class="review-header">
            <img src="${r.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}" alt="${esc(r.name)}" class="review-avatar">
            <div class="review-meta">
              <div class="review-author">
                ${esc(r.name)}
                ${r.verified ? `<span class="review-verified">${icon("check")} Compra Verificada</span>` : ""}
              </div>
              <span class="review-location">${esc(r.city)} • ${esc(r.date)}</span>
            </div>
            <div class="review-stars">${"★".repeat(r.stars || 5)}</div>
          </div>
          <p class="review-text">${esc(r.text)}</p>
          ${r.photo ? `<img src="${r.photo}" alt="Foto do produto enviado por ${esc(r.name)}" class="review-photo" loading="lazy">` : ""}
        </div>
      `
        )
        .join("");
    }
  }

  /* -------------------------------------------------------------
     10. PROVA SOCIAL AO VIVO E CONTADOR DINÂMICO
     ------------------------------------------------------------- */
  function initLiveSocialProof() {
    // 1. Contador flutuante de pessoas vendo agora
    const liveCountEl = $("[data-live-count]");
    if (liveCountEl) {
      let count = Math.floor(Math.random() * 15) + 21; // 21 a 35 pessoas
      liveCountEl.textContent = count;
      setInterval(() => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 a +2
        count = Math.max(16, Math.min(48, count + delta));
        liveCountEl.textContent = count;
      }, 7000);
    }

    // 2. Toast de Vendas Recentes
    const toast = $("[data-sale-toast]");
    if (toast && S.salesNotifications && S.salesNotifications.length > 0) {
      let idx = 0;
      const showToast = () => {
        const item = S.salesNotifications[idx];
        toast.querySelector("[data-toast-text]").innerHTML = `<b>${esc(item.name)}</b> de ${esc(item.city)} comprou <b>${esc(item.product)}</b>`;
        toast.querySelector("[data-toast-time]").textContent = item.time;
        toast.classList.add("active");

        setTimeout(() => {
          toast.classList.remove("active");
          idx = (idx + 1) % S.salesNotifications.length;
          setTimeout(showToast, Math.floor(Math.random() * 12000) + 14000);
        }, 5000);
      };

      setTimeout(showToast, 6000);
    }
  }

  /* -------------------------------------------------------------
     11. CONTAGEM REGRESSIVA (COUNTDOWN TIMER)
     ------------------------------------------------------------- */
  function initCountdown() {
    const endStr = S.campaign?.offerEndsAt;
    const hEl = $("[data-cd-hours]");
    const mEl = $("[data-cd-mins]");
    const sEl = $("[data-cd-secs]");
    if (!hEl || !mEl || !sEl) return;

    let targetDate = endStr ? new Date(endStr).getTime() : Date.now() + 1000 * 60 * 60 * 14;

    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      hEl.textContent = pad(hours);
      mEl.textContent = pad(mins);
      sEl.textContent = pad(secs);
    };

    tick();
    setInterval(tick, 1000);
  }

  /* -------------------------------------------------------------
     12. BARRA FIXA MOBILE (STICKY BUY BAR)
     ------------------------------------------------------------- */
  function updateStickyBar() {
    const bar = $("[data-sticky-buy]");
    if (!bar) return;
    const offer = getSelectedOffer();
    const img = bar.querySelector("[data-sticky-img]");
    const title = bar.querySelector("[data-sticky-title]");
    const price = bar.querySelector("[data-sticky-price]");

    if (img) img.src = offer.image;
    if (title) title.textContent = offer.label;
    if (price) price.textContent = brl(offer.price);
  }

  function initStickyBar() {
    const bar = $("[data-sticky-buy]");
    const buybox = $("[data-buybox]");
    if (!bar || !buybox) return;

    updateStickyBar();

    const onScroll = () => {
      const rect = buybox.getBoundingClientRect();
      const isPast = rect.bottom < 120;
      bar.classList.toggle("visible", isPast);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------------------------------------------------------------
     13. MENU MOBILE DRAWER & MODAL DE COMPRA SEGURA
     ------------------------------------------------------------- */
  function initModalsAndDrawer() {
    // Drawer
    const drawerBtn = $("[data-drawer-toggle]");
    const drawerClose = $("[data-drawer-close]");
    const backdrop = $("[data-drawer-backdrop]");

    const toggleDrawer = (open) => {
      document.body.classList.toggle("drawer-open", open);
    };

    drawerBtn?.addEventListener("click", () => toggleDrawer(true));
    drawerClose?.addEventListener("click", () => toggleDrawer(false));
    backdrop?.addEventListener("click", () => toggleDrawer(false));

    // Modal Compra Segura
    const secModal = $("[data-security-modal]");
    const secTriggers = $$("[data-open-security-modal]");

    secTriggers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        secModal.hidden = false;
        document.body.classList.add("modal-open");
      });
    });

    secModal?.querySelectorAll("[data-close-modal]").forEach((b) => {
      b.addEventListener("click", () => {
        secModal.hidden = true;
        document.body.classList.remove("modal-open");
      });
    });

    secModal?.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        secModal.hidden = true;
        document.body.classList.remove("modal-open");
      }
    });
  }

  // --- BOOTSTRAP AO CARREGAR DOM ---
  document.addEventListener("DOMContentLoaded", () => {
    initBasicTexts();
    initGallery();
    initOffers();
    initVariants();
    initOrderModal();
    initCep();
    initDynamicSections();
    initLiveSocialProof();
    initCountdown();
    initStickyBar();
    initModalsAndDrawer();
  });
})();
