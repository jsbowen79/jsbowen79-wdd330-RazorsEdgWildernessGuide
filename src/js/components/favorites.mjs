import { fetchNPS } from "../services/api.mjs";
import { renderWithTemplate } from "../utils/utils.mjs";

//Retrieve saved items from localStorage
export function getLocalStorage(key) {
  const response = localStorage.getItem(key);
  if (response) {
    return JSON.parse(response);
  } else return [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//Populate list of favorite Parks
export async function getFavoriteList() {
  const favoriteArray = getLocalStorage("favorites");
  const parksString = favoriteArray.join(",");

  if (parksString) {
    const queryParameter = `/parks?parkCode=${parksString}`;
    const response = await fetchNPS(queryParameter);
    const parksData = response.data;
    return parksData;
  }
  return [];
}

export async function populateFavoriteList() {
  console.log("in populate favorites");
  const parksData = await getFavoriteList();
  const listEL = document.querySelector("#favorite");
  if (parksData) {
    const template = await createFavoritesListTemplate(parksData);
    renderWithTemplate(template, listEL);
  } else {
    listEL.textContent =
      "You haven't chosen any favorites.  Please mark your favorite parks!";
  }
}

export async function createFavoritesListTemplate(parksData) {
  let template;
  if (parksData.length > 0) {
    template = `
    <div id="listNear">
    <table id="favoriteTable">
    <thead>
    <tr>
    <th>Park Name</th>
    <th>Location</th>
    <th>Delete</th>
    </tr>
    </thead>
    <tbody>`;

    parksData.forEach((park) => {
      const name = park.fullName;
      template += `<tr>
      <td class="nearButton" id="${park.parkCode}">${name}</td>
      <td>${park.addresses[0].city}, ${park.addresses[0].stateCode}</td>
      <td class="delete" id="${park.parkCode}">❌</td>
      </tr>`;
    });
    template += "</tbody></table>";
  } else {
    template =
      "You haven't saved any favorites.  Please save your favorite National Parks to see them here.";
  }
  return template;
}
