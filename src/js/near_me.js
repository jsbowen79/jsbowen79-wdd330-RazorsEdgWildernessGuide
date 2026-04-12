import {
  loadHeaderFooter,
  createNearMeListTemplate,
  renderWithTemplate,
  loadSpinners,
} from "./utils/utils.mjs";
import { handleError } from "./errors/errorHandler.mjs";
import { getLocation, findNearbyParks } from "./components/searchTools.mjs";
import { renderMap } from "./services/mapbox.mjs";
import {
  activateTableListeners,
  addFavoriteEventListener,
} from "./utils/eventListeners.mjs";
import "mapbox-gl/dist/mapbox-gl.css";

document.addEventListener("DOMContentLoaded", () => {
  async function main() {
    loadHeaderFooter();
    //handle random errors
    window.addEventListener("error", (event) => {
      handleError(event.error);
    });
    window.addEventListener("unhandledrejection", (event) => {
      handleError(event.reason);
    });

    async function renderPage() {
      const { lat, lon } = await getLocation();
      if (lat && lon) {
        const tableDiv = document.querySelector(".nearList");
        const nearest = await findNearbyParks(lat, lon);
        const template = await createNearMeListTemplate(nearest);
        let parksData = [];
        nearest.forEach((park) => {
          parksData.push(park.park);
        });
        renderWithTemplate(template, tableDiv);
        loadSpinners();
        addFavoriteEventListener();
      }
    }

    await renderPage();

    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);

    const largeMap = await renderMap();
    activateTableListeners(largeMap);

    requestAnimationFrame(() => {
      largeMap.resize();
    });
  }

  main().then(() => {
    //Load wayfinding
    const homeEL = document.getElementById("home");
    homeEL.classList.remove("active");
    const parksEL = document.getElementById("parks");
    parksEL.classList.remove("active");
    const nearEL = document.getElementById("near");
    nearEL.classList.add("active");
    const favorites = document.getElementById("favoritesLink");
    favorites.classList.remove("active");
  });
});
