(function () {
  const CITY_COORDS = {
    "Afula": [32.6091, 35.2892],
    "Ashdod": [31.8014, 34.6435],
    "Bat Hefer": [32.3330, 35.0120],
    "Bat Yam": [32.0132, 34.7480],
    "Beer Sheva": [31.2529, 34.7915],
    "Beit Shemesh": [31.7470, 34.9881],
    "Beitar Illit": [31.6970, 35.1150],
    "Bnei Brak": [32.0833, 34.8333],
    "Elad": [32.0520, 34.9510],
    "Even Yehuda": [32.2697, 34.8870],
    "Giv'atayim": [32.0722, 34.8106],
    "Haifa": [32.7940, 34.9896],
    "Harish": [32.4620, 35.0450],
    "Herzliya": [32.1663, 34.8433],
    "Hod Hasharon": [32.1593, 34.8932],
    "Holon": [32.0158, 34.7874],
    "Jerusalem": [31.7683, 35.2137],
    "Karmiel": [32.9171, 35.3050],
    "Kfar Saba": [32.1782, 34.9076],
    "Meron": [32.9860, 35.4410],
    "Modiin": [31.8980, 35.0104],
    "Modiin Illit": [31.9320, 35.0440],
    "Netanya": [32.3215, 34.8532],
    "Petah Tikva": [32.0871, 34.8878],
    "Ramla": [31.9292, 34.8656],
    "Ra'anana": [32.1848, 34.8713],
    "Ramat Gan": [32.0684, 34.8248],
    "Rishon LeZion": [31.9730, 34.7925],
    "Ruppin College": [32.3435, 34.9120],
    "Savyon": [32.0458, 34.8776],
    "Tel Aviv": [32.0853, 34.7818],
    "Tel Aviv-Yafo": [32.0853, 34.7818],
    "Tel Aviv University": [32.1133, 34.8044],
    "Tiberias": [32.7922, 35.5312]
  };

  const GENERIC_CITY_LABELS = new Set([
    "All over the country",
    "Needs city-level verification",
    "Multiple cities in Israel",
    "50+ cities"
  ]);

  let map;
  let markerLayer;
  let currentProviders = [];

  function lang() { return window.I18N?.getCurrentLang?.() || "en"; }

  function tr(key) { return window.I18N?.t?.(key, lang()) || key; }

  function cityName(city) {
    return lang() === "he" ? (window.CITY_TRANSLATIONS?.[city] || city) : city;
  }

  function providerNameList(providers) {
    return providers.map(provider => lang() === "he" && provider.hebrewName ? provider.hebrewName : provider.name).sort((a, b) => a.localeCompare(b)).join(", ");
  }

  function providerLinks(providers) {
    return providers
      .sort((a, b) => (lang() === "he" && a.hebrewName ? a.hebrewName : a.name).localeCompare(lang() === "he" && b.hebrewName ? b.hebrewName : b.name))
      .map(p => `<a href="${p.website}" target="_blank" rel="noopener" style="display:block;color:#1d6b4f;font-weight:700;text-decoration:none;margin-top:4px">${lang() === "he" && p.hebrewName ? p.hebrewName : p.name} ↗</a>`)
      .join("");
  }

  function buildCityCoverage(providers) {
    const coverage = new Map();
    providers.forEach(provider => {
      (provider.cities || []).forEach(city => {
        if (GENERIC_CITY_LABELS.has(city) || !CITY_COORDS[city]) return;
        if (!coverage.has(city)) {
          coverage.set(city, { city, coords: CITY_COORDS[city], providers: [] });
        }
        coverage.get(city).providers.push(provider);
      });
    });
    return Array.from(coverage.values()).sort((a, b) => a.city.localeCompare(b.city));
  }

  function renderCoverageList(coverage) {
    const list = document.getElementById("coverageList");
    if (!list) return;
    if (!coverage.length) {
      list.innerHTML = `<div class="coverage-city"><strong>${tr("noMappedCities")}</strong><span>${tr("noMappedText")}</span></div>`;
      return;
    }
    const top = coverage.slice(0, 8);
    list.innerHTML = top.map(item => `
      <div class="coverage-city">
        <strong>${cityName(item.city)}</strong>
        <span>${item.providers.length} ${item.providers.length === 1 ? tr("providerSingular") : tr("providerPlural")}: ${providerNameList(item.providers)}</span>
      </div>
    `).join("") + (coverage.length > top.length ? `<div class="coverage-city"><strong>+${coverage.length - top.length} ${tr("moreMappedCities")}</strong><span>${tr("fullFilteredView")}</span></div>` : "");
  }

  function initLeafletMap() {
    const element = document.getElementById("coverageMap");
    if (!element || !window.L) return false;
    map = window.L.map(element, { scrollWheelZoom: false }).setView([31.9, 34.95], 7);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    markerLayer = window.L.layerGroup().addTo(map);
    return true;
  }

  function renderMarkers(coverage) {
    if (!map || !markerLayer || !window.L) return;
    markerLayer.clearLayers();
    const bounds = [];
    coverage.forEach(item => {
      const [lat, lng] = item.coords;
      bounds.push([lat, lng]);
      const marker = window.L.circleMarker([lat, lng], {
        radius: Math.min(14, 7 + item.providers.length * 2),
        weight: 2,
        fillOpacity: 0.75
      });
      marker.bindPopup(`<strong>${cityName(item.city)}</strong><br>${item.providers.length} ${item.providers.length === 1 ? tr("providerSingular") : tr("providerPlural")}${providerLinks(item.providers)}`);
      marker.addTo(markerLayer);
    });
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [28, 28], maxZoom: 10 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 11);
    } else {
      map.setView([31.9, 34.95], 7);
    }
  }

  function renderCoverage(providers) {
    currentProviders = providers || window.PROVIDERS || [];
    const coverage = buildCityCoverage(currentProviders);
    renderCoverageList(coverage);
    renderMarkers(coverage);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLeafletMap();
    renderCoverage(window.PROVIDERS || []);
  });

  window.addEventListener("provider-filter-change", event => {
    renderCoverage(event.detail?.providers || []);
  });

  window.addEventListener("language-change", () => {
    renderCoverage(currentProviders.length ? currentProviders : (window.PROVIDERS || []));
  });

  window.CARSHARING_CITY_COORDS = CITY_COORDS;
})();
