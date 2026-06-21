const providers = window.PROVIDERS || [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const lang = () => window.I18N?.getCurrentLang?.() || "en";
const tr = (key) => window.I18N?.t?.(key, lang()) || key;

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function localizedCities(provider) {
  if (lang() === "he" && provider.cityNamesHe?.length) return provider.cityNamesHe;
  return provider.cities || [];
}

function translateCity(city) {
  if (lang() !== "he") return city;
  return window.CITY_TRANSLATIONS?.[city] || city;
}

function localizedPricing(provider) {
  return lang() === "he" && provider.pricingModelsHe?.length ? provider.pricingModelsHe : provider.pricingModels;
}

function localizedPricingSummary(provider) {
  return lang() === "he" && provider.pricingSummaryHe ? provider.pricingSummaryHe : provider.pricingSummary;
}

function localizedBestFor(provider) {
  return lang() === "he" && provider.bestForHe?.length ? provider.bestForHe : provider.bestFor;
}

function localizedDescription(provider) {
  return lang() === "he" && provider.descriptionHe ? provider.descriptionHe : provider.description;
}

function localizedService(provider) {
  return lang() === "he" && provider.serviceTypeLabelHe ? provider.serviceTypeLabelHe : provider.serviceTypeLabel;
}

function localizedReturn(provider) {
  return lang() === "he" && provider.returnModelHe ? provider.returnModelHe : provider.returnModel;
}

function localizedDataStatus(provider) {
  return lang() === "he" && provider.dataStatusHe ? provider.dataStatusHe : (provider.dataStatus || tr("needsVerification"));
}

function localizedLastChecked(provider) {
  return lang() === "he" && provider.lastCheckedHe ? provider.lastCheckedHe : (provider.lastChecked || tr("unknown"));
}

function labelList(items, limit = 6) {
  if (!items || items.length === 0) return tr("unknown");
  if (items.length <= limit) return items.join(", ");
  return `${items.slice(0, limit).join(", ")} +${items.length - limit} ${lang() === "he" ? "נוספים" : "more"}`;
}

function pill(text, extra = "") {
  return `<span class="badge ${extra}">${text}</span>`;
}

function logo(provider) {
  if (!provider.logoUrl) return "";
  return `<img class="provider-logo" src="${provider.logoUrl}" alt="${provider.name} logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'">`;
}

function confidenceText(provider) {
  return `${tr(provider.confidence || "unknown")} ${tr("confidence")}`;
}

function touristText(value) {
  return tr(value || "unknown");
}

function sourceLinks(provider) {
  if (!provider.sources?.length) return `<span>${tr("needsVerification")}</span>`;
  return provider.sources.map(source => {
    const label = lang() === "he" && source.labelHe ? source.labelHe : source.label;
    const status = source.status === "official" ? tr("officialSource") : source.status === "dated" ? tr("datedSource") : tr("secondarySource");
    return `<a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer">${label} <small>(${status})</small> ↗</a>`;
  }).join("");
}


const SERVICE_ICONS = {
  round_trip_carsharing: "🔄",
  free_floating_area_carsharing: "📍",
  self_service_short_term_access: "📱",
  brand_short_term_access: "🏷️",
  peer_to_peer_carsharing: "👤",
  corporate_campus_sharing: "🏢"
};

function serviceIcon(category) {
  return SERVICE_ICONS[category] || "🚗";
}

function providerCard(provider) {
  const confidenceClass = provider.confidence === "high" ? "high" : provider.confidence === "medium" ? "medium" : "";
  const touristClass = provider.touristFriendly === "yes" ? "high" : provider.touristFriendly === "unknown" ? "medium" : "";
  return `
    <article class="provider-card" data-provider-id="${provider.id}">
      <div class="card-top">
        <div class="provider-heading">
          ${logo(provider)}
          <div>
            <h3>${provider.name}</h3>
            ${provider.hebrewName ? `<div class="hebrew" dir="rtl">${provider.hebrewName}</div>` : ""}
          </div>
        </div>
        ${pill(confidenceText(provider), confidenceClass)}
      </div>
      <p>${localizedDescription(provider)}</p>
      <div class="badges">
        ${pill(`${serviceIcon(provider.category)} ${localizedService(provider)}`)}
        ${provider.appBased ? pill(tr("appBased"), "high") : pill(tr("noApp"))}
        ${provider.hasEV ? pill("⚡ " + tr("evAvailable"), "ev") : ""}
        ${pill(`${tr("tourist")}: ${touristText(provider.touristFriendly)}`, touristClass)}
      </div>
      <div class="meta-list">
        <div class="meta-item"><strong>${tr("citiesAreas")}</strong><span>${labelList(localizedCities(provider))}</span></div>
        <div class="meta-item"><strong>${tr("pricingStructure")}</strong><span>${labelList(localizedPricing(provider))}</span></div>
        <div class="meta-item price-snapshot"><strong>${tr("priceSnapshot")}</strong><span>${localizedPricingSummary(provider) || tr("needsVerification")}</span></div>
        <div class="meta-item"><strong>${tr("returnModel")}</strong><span>${localizedReturn(provider)}</span></div>
        <div class="meta-item"><strong>${tr("bestFor")}</strong><span>${labelList(localizedBestFor(provider))}</span></div>
        <div class="meta-item"><strong>${tr("dataStatus")}</strong><span>${localizedDataStatus(provider)}</span></div>
        <div class="meta-item source-list"><strong>${tr("sources")}</strong>${sourceLinks(provider)}</div>
      </div>
      <div class="card-footer">
        <span class="small-note">${tr("lastChecked")}: ${localizedLastChecked(provider)}</span>
        <a href="${provider.website}" target="_blank" rel="noopener">${tr("visitProvider")}</a>
      </div>
    </article>
  `;
}

function populateSelect(id, options, placeholder = "All", translator = (value) => value) {
  const select = document.getElementById(id);
  if (!select) return;
  const current = select.value || "all";
  select.innerHTML = `<option value="all">${placeholder}</option>` + options.map(value => `<option value="${value}">${translator(value)}</option>`).join("");
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function initFilters() {
  const cities = uniqueSorted(providers.flatMap(p => p.cities));
  const useCases = uniqueSorted(providers.flatMap(p => p.bestFor));
  const pricing = uniqueSorted(providers.flatMap(p => p.pricingModels));
  const labels = window.CATEGORY_LABELS?.[lang()] || window.CATEGORY_LABELS?.en || {};
  const categories = Object.entries(labels).filter(([key]) => providers.some(p => p.category === key));

  populateSelect("cityFilter", cities, tr("allCities"), translateCity);
  populateSelect("useCaseFilter", useCases, tr("allTripTypes"), value => {
    const found = providers.find(provider => provider.bestFor.includes(value));
    const index = found?.bestFor.indexOf(value);
    return lang() === "he" && found?.bestForHe?.[index] ? found.bestForHe[index] : value;
  });
  populateSelect("pricingFilter", pricing, tr("allPricingModels"), value => {
    const found = providers.find(provider => provider.pricingModels.includes(value));
    const index = found?.pricingModels.indexOf(value);
    return lang() === "he" && found?.pricingModelsHe?.[index] ? found.pricingModelsHe[index] : value;
  });
  const categorySelect = document.getElementById("serviceFilter");
  if (categorySelect) {
    const current = categorySelect.value || "all";
    categorySelect.innerHTML = `<option value="all">${tr("allServiceModels")}</option>` + categories.map(([key, label]) => `<option value="${key}">${label}</option>`).join("");
    if ([...categorySelect.options].some(option => option.value === current)) categorySelect.value = current;
  }

  const appFilter = $("#appFilter");
  if (appFilter) {
    const current = appFilter.value || "all";
    appFilter.innerHTML = `<option value="all">${tr("all")}</option><option value="true">${tr("yes")}</option><option value="false">${tr("no")}</option>`;
    appFilter.value = current;
  }
  const touristFilter = $("#touristFilter");
  if (touristFilter) {
    const current = touristFilter.value || "all";
    touristFilter.innerHTML = `<option value="all">${tr("all")}</option><option value="yes">${tr("yes")}</option><option value="no">${tr("no")}</option><option value="unknown">${tr("unknown")}</option>`;
    touristFilter.value = current;
  }
}

function getFilterState() {
  return {
    city: $("#cityFilter")?.value || "all",
    useCase: $("#useCaseFilter")?.value || "all",
    pricing: $("#pricingFilter")?.value || "all",
    service: $("#serviceFilter")?.value || "all",
    app: $("#appFilter")?.value || "all",
    tourist: $("#touristFilter")?.value || "all"
  };
}

function matches(provider, filters) {
  if (filters.city !== "all" && !provider.cities.some(city => {
    const c = normalize(city);
    const f = normalize(filters.city);
    return c === f || c.includes(f) || f.includes(c);
  })) return false;
  if (filters.useCase !== "all" && !provider.bestFor.some(use => normalize(use) === normalize(filters.useCase))) return false;
  if (filters.pricing !== "all" && !provider.pricingModels.some(price => normalize(price) === normalize(filters.pricing))) return false;
  if (filters.service !== "all" && provider.category !== filters.service) return false;
  if (filters.app !== "all" && String(provider.appBased) !== filters.app) return false;
  if (filters.tourist !== "all" && provider.touristFriendly !== filters.tourist) return false;
  return true;
}

function renderProviders() {
  const grid = $("#providerGrid");
  const count = $("#resultCount");
  if (!grid) return;
  const filters = getFilterState();
  const filtered = providers.filter(provider => matches(provider, filters));
  if (count) count.textContent = `${filtered.length} ${filtered.length === 1 ? tr("providerSingular") : tr("providerPlural")}`;
  grid.innerHTML = filtered.length ? filtered.map(providerCard).join("") : `<div class="empty">${tr("emptyResults")}</div>`;
  window.dispatchEvent(new CustomEvent("provider-filter-change", { detail: { providers: filtered } }));
  pushFilterState();
}

function setActiveQuickChoice(activeButton) {
  $$(".choice-button").forEach(btn => btn.classList.toggle("active", btn === activeButton));
}

function applyQuickChoice(event) {
  const button = event.target.closest("[data-filter-city], [data-filter-usecase]");
  if (!button) return;
  const city = button.getAttribute("data-filter-city");
  const useCase = button.getAttribute("data-filter-usecase");
  if (city && $("#cityFilter")) $("#cityFilter").value = city;
  if (useCase && $("#useCaseFilter")) $("#useCaseFilter").value = useCase;
  setActiveQuickChoice(button);
  document.getElementById("providers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  renderProviders();
}

function pushFilterState() {
  const params = new URLSearchParams();
  const f = getFilterState();
  Object.entries(f).forEach(([key, val]) => { if (val !== "all") params.set(key, val); });
  const lang = window.I18N?.getCurrentLang?.() || "en";
  if (lang !== "en") params.set("lang", lang);
  const url = params.toString() ? `?${params}` : location.pathname;
  history.replaceState(null, "", url);
}

function loadFilterStateFromURL() {
  const params = new URLSearchParams(location.search);
  const map = { city: "cityFilter", useCase: "useCaseFilter", pricing: "pricingFilter", service: "serviceFilter", app: "appFilter", tourist: "touristFilter" };
  Object.entries(map).forEach(([key, id]) => {
    const val = params.get(key);
    if (val) {
      const el = document.getElementById(id);
      if (el) el.value = val;
    }
  });
  const urlLang = params.get("lang");
  if (urlLang && window.I18N) window.I18N.setCurrentLang(urlLang);
}

function refreshHomeLanguage() {
  initFilters();
  renderProviders();
  $("#resetFilters") && ($("#resetFilters").textContent = tr("resetFilters"));
}

function initHome() {
  initFilters();
  loadFilterStateFromURL();
  renderProviders();
  $$("select").forEach(select => select.addEventListener("change", renderProviders));
  document.body.addEventListener("click", applyQuickChoice);
  $("#resetFilters")?.addEventListener("click", () => {
    $$("select").forEach(select => select.value = "all");
    setActiveQuickChoice(null);
    renderProviders();
  });
  window.addEventListener("language-change", refreshHomeLanguage);
}

document.addEventListener("DOMContentLoaded", initHome);
