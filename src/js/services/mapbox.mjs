import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; 

export function createMap(containerId, center = [-111.879, 40.758], zoom = 8) {
    return new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center,
        zoom,

    });
}