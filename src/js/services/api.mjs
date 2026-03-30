const baseURL = 'https://developer.nps.gov/api/v1'

export async function getParks(query = ''){
    const key = import.meta.env.VITE_NPS_API_KEY; 

    const res = await fetch(`${baseURL}/parks?${query}&api_key=${key}`); 

    if (!res.ok) { throw new Error('API error') };

return res.json(); 
}