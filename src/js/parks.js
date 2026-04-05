import {
    loadHeaderFooter, renderHighlight, createHeroHighlightTemplate
    ,listActivities
 } from "./utils/utils.mjs"; 
import { handleError } from "./errors/errorHandler.mjs";
import 'mapbox-gl/dist/mapbox-gl.css'
import { fetchNPS } from "./services/api.mjs";
import {
    renderActivitySearch, renderStateSearch, renderRegionSearch, activateFilterListeners
} from "./components/searchTools.mjs";


document.addEventListener("DOMContentLoaded", () => {
    
    //handle random errors
    window.addEventListener('error', (event) => {
        handleError(event.error);
    });
    window.addEventListener('unhandledrejection', (event) => {
        handleError(event.reason);
    }); 

//load Home page. 
    loadHeaderFooter(); 
    renderHighlight(createHeroHighlightTemplate);
    renderStateSearch(); 
    renderRegionSearch(); 
    renderActivitySearch(); 
    activateFilterListeners(); 
})
