const providers = window.PROVIDERS || [];
const tableBody = document.querySelector("#comparisonTable tbody");
const lang = () => window.I18N?.getCurrentLang?.() || "en";
const tr = (key) => window.I18N?.t?.(key, lang()) || key;

function yesNo(value) {
  return value ? tr("yes") : tr("no");
}

function list(items) {
  return (items || []).join(", ");
}

function logo(provider) {
  if (!provider.logoUrl) return "";
  return `<img class="table-logo" src="${provider.logoUrl}" alt="${provider.name} logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none'">`;
}

function localizedCities(provider) {
  return lang() === "he" && provider.cityNamesHe?.length ? provider.cityNamesHe : provider.cities;
}
function localizedPricing(provider) {
  return lang() === "he" && provider.pricingModelsHe?.length ? provider.pricingModelsHe : provider.pricingModels;
}
function localizedBestFor(provider) {
  return lang() === "he" && provider.bestForHe?.length ? provider.bestForHe : provider.bestFor;
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
function localizedTourist(provider) {
  return tr(provider.touristFriendly || "unknown");
}

function renderTable() {
  if (!tableBody) return;
  tableBody.innerHTML = providers.map(provider => `
    <tr>
      <td>
        <div class="table-provider">
          ${logo(provider)}
          <div><strong>${provider.name}</strong><br><span class="small-note" dir="rtl">${provider.hebrewName || ""}</span></div>
        </div>
      </td>
      <td>${list(localizedCities(provider))}</td>
      <td>${localizedService(provider)}</td>
      <td>${localizedReturn(provider)}</td>
      <td>${list(localizedPricing(provider))}</td>
      <td>${yesNo(provider.appBased)}</td>
      <td>${localizedTourist(provider)}</td>
      <td>${list(localizedBestFor(provider))}</td>
      <td>${localizedLastChecked(provider)}</td>
      <td>${localizedDataStatus(provider)}</td>
      <td><a class="table-link" href="${provider.website}" target="_blank" rel="noopener">${tr("openProvider")}</a></td>
    </tr>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderTable);
window.addEventListener("language-change", renderTable);
