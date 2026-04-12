import mapboxgl from "mapbox-gl";
import { getLocation } from "../components/searchTools.mjs";
import { findNearbyParks } from "../components/searchTools.mjs";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export function createMap(containerId, lon, lat, name) {
  const map = new mapboxgl.Map({
    container: containerId,
    style: "mapbox://styles/mapbox/outdoors-v12",
    center: [lon, lat],
    zoom: 8,
  });

  // Add marker
  new mapboxgl.Marker()
    .setLngLat([lon, lat])
    .setPopup(new mapboxgl.Popup().setText(name))
    .addTo(map);

  return map;
}

/****************************************************************************************
 * Create Large maps for near_me page and favorites page
 ***************************************************************************************/
export async function createLargeMap(parksData, mapContainer) {
  const { lat, lon } = await getLocation();

  const largeMap = createMap(mapContainer, lon, lat, "Your Home");

  largeMap.once("idle", async () => {
    const bounds = new mapboxgl.LngLatBounds();

    parksData.forEach((park) => {
      if (park.latitude && park.longitude) {
        const lng = parseFloat(park.longitude);
        const lat = parseFloat(park.latitude);

        new mapboxgl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(largeMap);

        bounds.extend([lng, lat]); // 🔥 track marker
      }
    });

    bounds.extend([lon, lat]);

    largeMap.fitBounds(bounds, { padding: 50 });
  });
  return largeMap;
}

export async function renderMap() {
  const { lat, lon } = await getLocation();

  const mapEL = document.querySelector(".largeMap");
  if (lat && lon) {
    const nearest = await findNearbyParks(lat, lon);
    let parksData = [];
    nearest.forEach((park) => {
      parksData.push(park.park);
    });

    const largeMap = await createLargeMap(parksData, mapEL);
    return largeMap;
  }
}
