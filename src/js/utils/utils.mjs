import { getHighlight, getHeroHighlight } from "../components/parkQuery.mjs";

/****************************************************************************************
 * Load the header and footer into the DOM
 ***************************************************************************************/
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('header.html');
    const footerTemplate = await loadTemplate('footer.html'); 
    
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
    
    const template = `<figure>
    <h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
   
    <div class="imageContainer">
    <p class="load">Loading...</p>
    <div class="showSpinner" name="testSpin"></div>
    <img src="${parkData.images[0].url}" alt="${parkData.images[0].altText}" class="spinnerImg" style="display:none;">
    <figcaption>${parkData.images[0].caption}. <span>(Courtesy of ${parkData.images[0].credit}.)</span></figcaption>
    </div>
</figure>
<h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
<p>Description: ${parkData.description}</p>
<p>Available Activities: <span class="activitiesList"></span></p>
<p>Website : <a href="${parkData.url}" title="Go to ${parkData.fullName}'s website" target = blank>${parkData.url}</a></p>`
    
    return { template, parkData }

}

/****************************************************************************************
 * Create a template for Cards
 ***************************************************************************************/
export function createCardTemplate(parkData) {
    const template = `
   <div class="card">
   <figure>
   <h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
   
   <div class="imageContainer">
   <p class="load">Loading...</p>
   <div class="showSpinner" name="testSpin"></div>
   <img src="${parkData.images[0].url}" alt="${parkData.images[0].altText}" class="spinnerImg" style="display:none;">
   <figcaption>${parkData.images[0].caption}. <span>(Courtesy of ${parkData.images[0].credit}.)</span></figcaption>
    </div>
</figure>
<h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
<p>Description: ${parkData.description}</p>
<p>Available Activities: <span class="activitiesList"></span></p>
<p>Website : <a href="${parkData.url}" title="Go to ${parkData.fullName}'s website" target = blank>${parkData.url}</a></p>`;

    return { template, parkData };
}

/****************************************************************************************
 * Create template for highlight hero image on all other pages(changes each reload)
 ***************************************************************************************/
export async function createHeroHighlightTemplate() {
    const parkData = await getHeroHighlight(); 

    const template = `<figure>
    <h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
   
    <div class="imageContainer">
    <p class="load">Loading...</p>
    <div class="showSpinner" name="testSpin"></div>
    <img src="${parkData.images[0].url}" alt="${parkData.images[0].altText}" class="spinnerImg" style="display:none;">
    <figcaption>${parkData.images[0].caption}. <span>(Courtesy of ${parkData.images[0].credit}.)</span></figcaption>
    </div>
</figure>
<h2 data-lat="${parkData.latitude}" data-lon="${parkData.longitude}">${parkData.fullName}</h2>
<p>Description: ${parkData.description}</p>
<p>Available Activities: <span class="activitiesList"></span></p>
<p>Website : <a href="${parkData.url}" title="Go to ${parkData.fullName}'s website" target = blank>${parkData.url}</a></p>`
    
    
    return { template, parkData };

}

/****************************************************************************************
 * Display a list of activities available in each park.
 ***************************************************************************************/
export function listActivities(park, element=null) {
    const activitiesEL = element || document.querySelector('.activitiesList'); 
    const activities = park.activities.map(a => a.name);
    const activityText = activities.join(', ') + '.'; 
    activitiesEL.textContent = activityText; 
}
 
/****************************************************************************************
 * Adds spinners to images 
 ***************************************************************************************/
export function loadSpinners() {
    const imgELNodeList = document.querySelectorAll(".spinnerImg"); 
    imgELNodeList.forEach((node) => {
        const spinner = node.previousElementSibling; 
        const pEl = spinner.previousElementSibling; 
        node.onload = () => {
            spinner.style.display = "none"; 
            pEl.style.display = "none"; 
            node.style.display = "block"; 
        }
    })
} 

/****************************************************************************************
 * Renders the Highlight template on the page based on the template passed in 
 * (used for all pages as different templates are passed in based on the page)
 ***************************************************************************************/
export async function renderHighlight(createTemplateFn) {
    const { template, parkData } = await createTemplateFn();
    renderWithTemplate(template, document.querySelector('.highlight')); 
    listActivities(parkData); 
    loadSpinners(); 
}

