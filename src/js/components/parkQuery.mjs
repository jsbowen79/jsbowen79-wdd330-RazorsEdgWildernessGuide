import { fetchNPS } from "../services/api.mjs";
import {
  createCardTemplate,
  renderWithTemplate,
  listActivities,
} from "../utils/utils.mjs";
import { createMap } from "../services/mapbox.mjs";

export async function getHighlight() {
  const queryParameters = "/parks?limit=50";
  const parksArray = await fetchNPS(queryParameters);
  const parksData = parksArray.data;
  const dayIndex = new Date().getDate();
  const highlightData = parksData[dayIndex % parksData.length];
  return highlightData;
}

export async function getHeroHighlight() {
  const queryParameters = "/parks?limit=50";
  const parksArray = await fetchNPS(queryParameters);
  const parksData = parksArray.data;
  const random = Math.floor(Math.random() * 50) + 1;
  const highlightData = parksData[random];
  return highlightData;
}

/****************************************************************************************
 * Render cards from filter results 6 at a time.
 ***************************************************************************************/
export function renderCards(data, begin = 0) {
  begin = Math.max(0, begin);
  begin = Math.min(begin, data.length);

  const start = begin;
  const end = Math.min(start + 6, data.length);
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  //Create and Render Cards
  for (let i = start; i < end; i++) {
    const lat = parseFloat(data[i].latitude);
    const lon = parseFloat(data[i].longitude);

    const cardEL = document.createElement("div");
    container.appendChild(cardEL);

    //Render card
    const { template, parkData } = createCardTemplate(data[i], lat, lon);
    renderWithTemplate(template, cardEL);
    const mapEL = cardEL.querySelector(".map");

    //Render Map
    const cardMap = createMap(mapEL, lon, lat, data[i].fullName);

    const listEL = cardEL.querySelector(".activitiesList");
    listActivities({ parkData: parkData, connector: ", ", element: listEL });
    cardMap.resize();
  }
  const navCont = document.querySelector(".navBtns");
  navCont.innerHTML = "";
  const nav = document.createElement("div");

  if (start > 0) {
    const prevEL = document.createElement("button");
    prevEL.textContent = "Prev";

    prevEL.addEventListener("click", () => {
      renderCards(data, start - 6);
    });

    nav.appendChild(prevEL);
  }

  if (end < data.length) {
    const nextEL = document.createElement("button");
    nextEL.textContent = "Next";

    nextEL.addEventListener("click", () => {
      renderCards(data, end);
    });
    nav.appendChild(nextEL);
  }

  navCont.appendChild(nav);
}
