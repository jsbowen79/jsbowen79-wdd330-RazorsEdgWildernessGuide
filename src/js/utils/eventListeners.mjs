import { fetchNPS } from "../services/api.mjs";
import { createMap } from "../services/mapbox.mjs";
import {
  createCardTemplate,
  listActivities,
  renderWithTemplate,
} from "./utils.mjs";
import {
  getLocalStorage,
  populateFavoriteList,
  setLocalStorage,
} from "../components/favorites.mjs";
import { renderCards } from "../components/parkQuery.mjs";
import { applyFilters } from "../components/searchTools.mjs";

/****************************************************************************************
 * Create Listeners for table buttons on Near Me and Favorites page tables
 ***************************************************************************************/
export async function activateTableListeners(largeMap) {
  const listenerParent = document.querySelector("#listNear");
  let parkData;
  listenerParent.addEventListener("click", async (e) => {
    const button = e.target.closest(".nearButton");
    if (!button) return;

    const parameters = `/parks?parkCode=${button.id}`;
    const detailElement = document.querySelector("#cardsContainer");
    detailElement.classList.remove("hide");
    const response = await fetchNPS(parameters);
    parkData = response.data[0];
    const template = await createCardTemplate(
      parkData,
      parkData.lat,
      parkData.lon,
    );

    renderWithTemplate(template.template, detailElement);
    const activitiesEL = document.querySelector(".activities");
    listActivities({
      parkData: parkData,
      connector: ", ",
      element: activitiesEL,
    });

    const mapEL = detailElement.querySelector(".map");
    const favoriteMap = createMap(
      mapEL,
      parkData.longitude,
      parkData.latitude,
      parkData.fullName,
    );

    requestAnimationFrame(() => {
      largeMap.resize();
      favoriteMap.resize();
    });
  });
}

/****************************************************************************************
 * Create Listeners for Delete buttons on Favorites page tables
 ***************************************************************************************/
export function activateDeleteListeners() {
  const deleteParent = document.querySelector(".nearList");

  deleteParent.addEventListener("click", (e) => {
    const button = e.target.closest(".delete");
    if (!button) return;

    const favoritesArray = getLocalStorage("favorites") || [];
    const newArray = favoritesArray.filter((id) => id != button.id);
    setLocalStorage("favorites", newArray);
    populateFavoriteList();
    showMessage("The park has been removed from Favorites.")
  });
}

/****************************************************************************************
 * Create Listeners for Favorite  buttons on Favorites page tables
 ***************************************************************************************/
export function addFavoriteEventListener() {
  const bodyEL = document.querySelector("body");
  bodyEL.addEventListener("click", (e) => {
    const button = e.target.closest(".favoriteButton");
    if (!button) return;
    let storedItems = getLocalStorage("favorites");

    storedItems.push(button.id);
    setLocalStorage("favorites", storedItems);
    showMessage("Successfully added to Favorites")
  });
}

/****************************************************************************************
 * Activate listeners for filters
 ***************************************************************************************/
export function activateFilterListeners() {
  const stateSelect = document.querySelector("#stateSearch");
  const regionSelect = document.querySelector("#regionSearch");
  const activitySelect = document.querySelector("#activitySearch");

  async function handleFilters() {
    const state = stateSelect.value;
    const region = regionSelect.value;
    const activity = activitySelect.value;

    const response = (await fetchNPS(`/parks?limit=500`)).data;

    const filteredData = applyFilters(response, {
      state,
      region,
      activity,
    });

    if (filteredData.length > 0) {
      renderCards(filteredData);
      showMessage("Your filter has been applied")
    } else {
      const cardEL = document.querySelector("#cardsContainer");
      cardEL.textContent =
        "Sorry, your search returned no results.  Please try again!";
    }
  }

  // Attach SAME handler to all
  stateSelect.addEventListener("change", handleFilters);
  regionSelect.addEventListener("change", handleFilters);
  activitySelect.addEventListener("change", handleFilters);
}

/****************************************************************************************
 * Activate listeners for filters
 ***************************************************************************************/

export function showMessage(message) {
  const popUp = document.createElement("div");
  popUp.className = "toast";
  popUp.textContent = message;

  document.body.appendChild(popUp);

  // trigger animation
  requestAnimationFrame(() => {
    popUp.classList.add("show");
  });

  // remove after 3 seconds
  setTimeout(() => {
    popUp.classList.remove("show");
    setTimeout(() => popUp.remove(), 300);
  }, 3000);
}
