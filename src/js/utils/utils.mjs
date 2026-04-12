import { getHighlight, getHeroHighlight } from "../components/parkQuery.mjs";
/****************************************************************************************
 * Load the header and footer into the DOM
 ***************************************************************************************/
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("header.html");
  const footerTemplate = await loadTemplate("footer.html");

  const headerEL = document.querySelector("#header");
  const footerEL = document.querySelector("#footer");

  renderWithTemplate(headerTemplate, headerEL);
  renderWithTemplate(footerTemplate, footerEL);
}

/****************************************************************************************
 * Load a template into a selected element
 ***************************************************************************************/
export function renderWithTemplate(template, element) {
  element.innerHTML = template;
  loadSpinners();
}

/****************************************************************************************
 * Load header and footer partials for rendering
 ***************************************************************************************/
async function loadTemplate(filename) {
  const res = await fetch(`/partials/${filename}`);
  return await res.text();
}

/****************************************************************************************
 * Create template for a highlight on the home page (Remains the same based on day)
 ***************************************************************************************/
export async function createHighlightTemplate() {
  const parkData = await getHighlight();

  const template = `
  <div class="highlightImage">
    <figure>
        <h2 class="highlightTitle" data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">
          ${parkData.fullName}
        </h2>

        <div class="imageContainer">
            <p class="load">Loading...</p>
            <div class="showSpinner"></div>
            <img src="${parkData.images?.[0].url || ""}" 
                alt="${parkData.images?.[0].altText || ""}"
                class="spinnerImg">
            <figcaption>
              ${parkData.images?.[0].caption || ""} 
              <span>(Courtesy of ${parkData.images?.[0].credit || ""}.)</span>
            </figcaption>
        </div>
    </figure>
    <p>
      Website: 
      <a href="${parkData.url}" 
        title="Go to ${parkData.fullName}'s website" 
        target="_blank">
        ${parkData.url}
      </a>
    </p>
    
    <button 
      class="favoriteButton" 
      id="${parkData.parkCode}">
      Add to Favorites
    </button>
</div>

<div class="highlightDescription">
  <p>Description:<br> ${parkData.description}</p>
  <p class="activities">
    Available Activities:<br> 
    <span class="activitiesList"></span>
  </p>

</div>`;

  return { template, parkData };
}

/****************************************************************************************
 * Create a template for Cards
 ***************************************************************************************/
export function createCardTemplate(parkData, lat = null, lon = null) {
  let template = `
   <div class="highlight">
   <h2 class="highlightDivider highlightTitle" data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
   <figure>
   
   <div class="imageContainer">
   <p class="load">Loading...</p>
   <div class="showSpinner"></div>
   <img src="${parkData.images[0].url}" alt="${parkData.images[0].altText}" class="spinnerImg" style="display:none;">
   <figcaption>${parkData.images[0].caption}. <span>(Courtesy of ${parkData.images[0].credit}.)</span></figcaption>
   </div>
   </figure>
   <p>Website : <a href="${parkData.url}" title="Go to ${parkData.fullName}'s website" target = blank>${parkData.url}</a></p>
   <button class="favoriteButton" id="${parkData.parkCode}">Add to Favorites</button>
   </div>
   <div class="map"></div>
   `;
  if (lat && lon) {
    template += `<a class="directions" href="https://www.google.com/maps?q=${lat},${lon}" target="_blank">
   Get Directions
 </a>`;
  }
  template += `
<p>Description:<br>${parkData.description}</p>
<p class="activities">Available Activities:<br><span class="activitiesList"></span></p>`;

  return { template, parkData };
}

/****************************************************************************************
 * Create template for highlight hero image on all other pages(changes each reload)
 ***************************************************************************************/
export async function createHeroHighlightTemplate() {
  const parkData = await getHeroHighlight();

  const template = `
  <div class="highlightImage">
    <figure>
      <h2 class="highlightTitle" data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
    
      <div class="imageContainer">
      <p class="load">Loading...</p>
      <div class="showSpinner"></div>
      <img src="${parkData.images[0].url}" alt="${parkData.images[0].altText}" class="spinnerImg" style="display:none;">
      <figcaption>${parkData.images[0].caption}. <span>(Courtesy of ${parkData.images[0].credit}.)</span></figcaption>
      </div>
    </figure>
    <p>Website : <a href="${parkData.url}" title="Go to ${parkData.fullName}'s website" target="_blank">${parkData.url}</a></p>
    <button class="favoriteButton" id="${parkData.parkCode}">Add to Favorites</button>
  </div>
  <div class="highlightDescription">
  <p>Description: ${parkData.description}</p>
  <p class="activities">Available Activities:<br><span class="activitiesList"></span></p>
  </div>
`;

  return { template, parkData };
}

/****************************************************************************************
 * Display a list of activities available in each park.
 ***************************************************************************************/
export function listActivities({ parkData, connector, element = null }) {
  const activitiesEL = element || document.querySelector(".activitiesList");

  const activities = parkData.activities.map((a) => a.name);

  const activityText = activities.join(connector);
  activitiesEL.innerHTML += activityText;
}

/****************************************************************************************
 * Adds spinners
 ***************************************************************************************/
export function loadSpinners() {
  const spinTime = 1500;
  const startTime = Date.now();

  const imgELNodeList = document.querySelectorAll(".spinnerImg");
  imgELNodeList.forEach((node) => {
    const spinner = node.previousElementSibling;
    const pEl = spinner.previousElementSibling;
    node.onload = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, spinTime - elapsed);
      setTimeout(() => {
        spinner.style.display = "none";
        pEl.style.display = "none";
        node.style.display = "block";
      }, remainingTime);
    };
  });
}

/****************************************************************************************
 * Renders the Highlight template on the page based on the template passed in
 * (used for all pages as different templates are passed in based on the page)
 ***************************************************************************************/
export async function renderHighlight(createTemplateFn) {
  const { template, parkData } = await createTemplateFn();
  renderWithTemplate(template, document.querySelector(".highlight"));
  console.log(parkData);
  listActivities({ parkData: parkData, connector: "<br>" });
  loadSpinners();
}

/****************************************************************************************
 * Create a template for list of Nearby Parks
 ***************************************************************************************/

export async function createNearMeListTemplate(nearest) {
  let template = `
  <div id="listNear">
  <table>
  <thead>
  <tr>
  <th>Park Name</th>
  <th>Distance</th>
  </tr>
  </thead>
  <tbody>`;

  nearest.forEach((park) => {
    const name = park.park.fullName;
    const distance = `${park.distance.toFixed(1)} miles`;
    template += `<tr>
    <td class="nearButton" id="${park.park.parkCode}">${name}</td>
    <td>${distance}</td>
    </tr>`;
  });
  template += "</tbody></table>";

  return template;
}
