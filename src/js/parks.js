import {
  loadHeaderFooter,
  renderHighlight,
  createHeroHighlightTemplate,
} from "./utils/utils.mjs";
import { handleError } from "./errors/errorHandler.mjs";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  renderActivitySearch,
  renderStateSearch,
  renderRegionSearch,
} from "./components/searchTools.mjs";
import {
  addFavoriteEventListener,
  activateFilterListeners,
} from "./utils/eventListeners.mjs";
import "mapbox-gl/dist/mapbox-gl.css";

async function loadModules() {
  document.addEventListener("DOMContentLoaded", () => {
    //handle random errors
    window.addEventListener("error", (event) => {
      handleError(event.error);
    });
    window.addEventListener("unhandledrejection", (event) => {
      handleError(event.reason);
    });
    const nearMeEl = document.querySelector("#parksNearMe");

    nearMeEl.addEventListener("click", () => {
      window.location.href = "/src/pages/near_me/index.html";
    });
  });
  //load Home page.
  await loadHeaderFooter();
  await renderHighlight(createHeroHighlightTemplate);
  await renderStateSearch();
  await renderRegionSearch();
  await renderActivitySearch();
  await activateFilterListeners();
  await addFavoriteEventListener();
}
//Load wayfinding
loadModules().then(() => {
  const homeEL = document.getElementById("home");
  homeEL.classList.remove("active");
  const parksEL = document.getElementById("parks");
  parksEL.classList.add("active");
  const nearEL = document.getElementById("near");
  nearEL.classList.remove("active");
  const favorites = document.getElementById("favoritesLink");
  favorites.classList.remove("active");
});
