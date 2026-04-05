import { fetchNPS } from "../services/api.mjs"

export async function getHighlight() {
    const queryParameters = '/parks?limit=50'
    const parksArray = await fetchNPS(queryParameters);
    const parksData = parksArray.data; 
    const dayIndex = new Date().getDate(); 
    const highlightData = parksData[dayIndex % parksData.length]; 
    return highlightData; 
}


export async function getHeroHighlight() {
    const queryParameters = '/parks?limit=50'
    const parksArray = await fetchNPS(queryParameters);
    const parksData = parksArray.data; 
    const random = Math.floor(Math.random() * 50) + 1; 
    const highlightData = parksData[random]; 
    return highlightData; 
}

