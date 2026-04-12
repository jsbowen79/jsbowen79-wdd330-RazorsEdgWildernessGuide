import { populateFavoriteList } from "./components/favorites.mjs";
import { loadHeaderFooter } from "./utils/utils.mjs";
import {
  activateDeleteListeners,
  activateTableListeners,
} from "./utils/eventListeners.mjs";
import "mapbox-gl/dist/mapbox-gl.css";

async function loadModules() {
  await loadHeaderFooter();

  await populateFavoriteList();
  await activateTableListeners();
  await activateDeleteListeners();
}

loadModules().then(() => {
  //Load wayfinding
  const homeEL = document.getElementById("home");
  homeEL.classList.remove("active");
  const parksEL = document.getElementById("parks");
  parksEL.classList.remove("active");
  const nearEL = document.getElementById("near");
  nearEL.classList.remove("active");
  const favorites = document.getElementById("favoritesLink");
  favorites.classList.add("active");
});
