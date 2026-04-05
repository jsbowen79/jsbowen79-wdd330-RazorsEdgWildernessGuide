import { loadHeaderFooter, renderHighlight, createHighlightTemplate } from "./utils/utils.mjs"; 
import { handleError } from "./errors/errorHandler.mjs";
import 'mapbox-gl/dist/mapbox-gl.css'

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
    renderHighlight(createHighlightTemplate);
    
})



