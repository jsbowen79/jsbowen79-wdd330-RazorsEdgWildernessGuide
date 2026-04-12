import {
  loadHeaderFooter,
  renderHighlight,
  createHighlightTemplate,
} from "./utils/utils.mjs";
import { handleError } from "./errors/errorHandler.mjs";
import "mapbox-gl/dist/mapbox-gl.css";
import { addFavoriteEventListener } from "./utils/eventListeners.mjs";

document.addEventListener("DOMContentLoaded", () => {
  //handle random errors
  window.addEventListener("error", (event) => {
    handleError(event.error);
  });
  window.addEventListener("unhandledrejection", (event) => {
    handleError(event.reason);
  });

  async function loadModules() {
    //load Home page.
    await loadHeaderFooter();
    await renderHighlight(createHighlightTemplate);
    await addFavoriteEventListener();
  }
  loadModules().then(() => {
    //Load wayfinding
    const homeEL = document.getElementById("home");
    console.log(homeEL);
    homeEL.classList.add("active");
    const parksEL = document.getElementById("parks");
    parksEL.classList.remove("active");
    const nearEL = document.getElementById("near");
    nearEL.classList.remove("active");
    const favorites = document.getElementById("favoritesLink");
    favorites.classList.remove("active");
  });
});
