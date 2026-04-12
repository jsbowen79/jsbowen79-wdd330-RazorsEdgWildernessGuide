import { fetchNPS } from "../services/api.mjs";

/****************************************************************************************
 * Create Template for State Search box
 ***************************************************************************************/
function stateOptions() {
  const stateOptionsTemplate = `    
    <option value="">All States</option>
    <option  value="AK">Alaska</option>
    <option  value="AL">Alabama</option>
    <option  value="AR">Arkansas</option>
    <option  value="AS">American Samoa</option>
    <option  value="AZ">Arizona</option>
    <option  value="CA">California</option>
    <option  value="CO">Colorado</option>
    <option  value="CT">Connecticut</option>
    <option  value="DC">District of Columbia</option>
    <option  value="DE">Delaware</option>
    <option  value="FL">Florida</option>
    <option  value="GA">Georgia</option>
    <option  value="GU">Guam</option>
    <option  value="HI">Hawaii</option>
    <option  value="IA">Iowa</option>
    <option  value="ID">Idaho</option>
    <option  value="IL">Illinois</option>
    <option  value="IN">Indiana</option>
    <option  value="KS">Kansas</option>
    <option  value="KY">Kentucky</option>
    <option  value="LA">Louisiana</option>
    <option  value="MA">Massachusetts</option>
    <option  value="MD">Maryland</option>
    <option  value="ME">Maine</option>
    <option  value="MI">Michigan</option>
    <option  value="MN">Minnesota</option>
    <option  value="MO">Missouri</option>
    <option  value="MP">Northern Mariana Islands</option>
    <option  value="MS">Mississippi</option>
    <option  value="MT">Montana</option>
    <option  value="NC">North Carolina</option>
    <option  value="ND">North Dakota</option>
    <option  value="NE">Nebraska</option>
    <option  value="NH">New Hampshire</option>
    <option  value="NJ">New Jersey</option>
    <option  value="NM">New Mexico</option>
    <option  value="NV">Nevada</option>
    <option  value="NY">New York</option>
    <option  value="OH">Ohio</option>
    <option  value="OK">Oklahoma</option>
    <option  value="OR">Oregon</option>
    <option  value="PA">Pennsylvania</option>
    <option  value="PR">Puerto Rico</option>
    <option  value="RI">Rhode Island</option>
    <option  value="SC">South Carolina</option>
    <option  value="SD">South Dakota</option>
    <option  value="TN">Tennessee</option>
    <option  value="TX">Texas</option>
    <option  value="UT">Utah</option>
    <option  value="VA">Virginia</option>
    <option  value="VI">U.S. Virgin Islands</option>
    <option  value="VT">Vermont</option>
    <option  value="WA">Washington</option>
    <option  value="WI">Wisconsin</option>
    <option  value="WV">West Virginia</option>
    <option  value="WY">Wyoming</option>`;
  return stateOptionsTemplate;
}

/****************************************************************************************
 * Create Template for Region Search box
 ***************************************************************************************/
function regionsTemplate() {
  const regionsTemplate = `
    <option value="">All Regions</option>
    <option value="WA,OR,CA,NV,ID,MT,WY,UT,CO,AK,HI">West</option>
    <option value="AZ,NM,TX,OK">Southwest</option>
    <option value="ND,SD,NE,KS,MN,IA,MO,WI,IL,IN,MI,OH">Midwest</option>
    <option value="AR,LA,MS,AL,TN,KY,WV,VA,NC,SC,GA,FL">Southeast</option>
    <option value="ME,NH,VT,MA,RI,CT,NY,NJ,PA,DE,MD,DC">Northeast</option>
    <option value="PR,VI,GU,AS,MP">US Territories</option>
    `;
  return regionsTemplate;
}

/****************************************************************************************
 * Create Template for Activities Search box
 ***************************************************************************************/
function activitiesTemplate() {
  const template = `
    <option value="">All Activities</option>
    <option value="ATV Off-Roading">ATV Off-Roading</option>
    <option value="Arts and Crafts">Arts and Crafts</option>
    <option value="Arts and Culture">Arts and Culture</option>
    <option value="Astronomy">Astronomy</option>
    <option value="Auto Off-Roading">Auto Off-Roading</option>
    <option value="Auto and ATV">Auto and ATV</option>
    <option value="Backcountry Camping">Backcountry Camping</option>
    <option value="Backcountry Hiking">Backcountry Hiking</option>
    <option value="Biking">Biking</option>
    <option value="Birdwatching">Birdwatching</option>
    <option value="Boat Tour">Boat Tour</option>
    <option value="Boating">Boating</option>
    <option value="Bookstore and Park Store">Bookstore and Park Store</option>
    <option value="Bus/Shuttle Guided Tour">Bus/Shuttle Guided Tour</option>
    <option value="Camping">Camping</option><option value="Canoe or Kayak Camping">Canoe or Kayak Camping</option>
    <option value="Canoeing">Canoeing</option>
    <option value="Canyoneering">Canyoneering</option>
    <option value="Car or Front Country Camping">Car or Front Country Camping</option>
    <option value="Caving">Caving</option>
    <option value="Citizen Science">Citizen Science</option>
    <option value="Climbing">Climbing</option>
    <option value="Compass and GPS">Compass and GPS</option>
    <option value="Craft Demonstrations">Craft Demonstrations</option>
    <option value="Cross-Country Skiing">Cross-Country Skiing</option>
    <option value="Cultural Demonstrations">Cultural Demonstrations</option>
    <option value="Dining">Dining</option>
    <option value="Dog Sledding">Dog Sledding</option>
    <option value="Downhill Skiing">Downhill Skiing</option>
    <option value="First Person Interpretation">First Person Interpretation</option>
    <option value="Fishing">Fishing</option>
    <option value="Fixed Wing Flying">Fixed Wing Flying</option>
    <option value="Fly Fishing">Fly Fishing</option>
    <option value="Flying">Flying</option>
    <option value="Food">Food</option>
    <option value="Freshwater Fishing">Freshwater Fishing</option>
    <option value="Freshwater Swimming">Freshwater Swimming</option>
    <option value="Front-Country Hiking">Front-Country Hiking</option>
    <option value="Gathering and Foraging">Gathering and Foraging</option>
    <option value="Geocaching">Geocaching</option>
    <option value="Gift Shop and Souvenirs">Gift Shop and Souvenirs</option>
    <option value="Golf">Golf</option>
    <option value="Group Camping">Group Camping</option>
    <option value="Guided Tours">Guided Tours</option>
    <option value="Hands-On">Hands-On</option>
    <option value="Helicopter Flying">Helicopter Flying</option>
    <option value="Hiking">Hiking</option>
    <option value="Historic Weapons Demonstration">Historic Weapons Demonstration</option>
    <option value="Horse Camping (see also Horse/Stock Use)">Horse Camping (see also Horse/Stock Use)</option>
    <option value="Horse Camping (see also camping)">Horse Camping (see also camping)</option>
    <option value="Horse Trekking">Horse Trekking</option>
    <option value="Horseback Riding">Horseback Riding</option>
    <option value="Hunting">Hunting</option>
    <option value="Hunting and Gathering">Hunting and Gathering</option>
    <option value="Ice Climbing">Ice Climbing</option>
    <option value="Ice Skating">Ice Skating</option>
    <option value="Jet Skiing">Jet Skiing</option>
    <option value="Junior Ranger Program">Junior Ranger Program</option>
    <option value="Kayaking">Kayaking</option>
    <option value="Live Music">Live Music</option>
    <option value="Living History">Living History</option>
    <option value="Mini-Golf">Mini-Golf</option>
    <option value="Motorized Boating">Motorized Boating</option>
    <option value="Mountain Biking">Mountain Biking</option>
    <option value="Mountain Climbing">Mountain Climbing</option>
    <option value="Museum Exhibits">Museum Exhibits</option>
    <option value="Off-Trail Permitted Hiking">Off-Trail Permitted Hiking</option>
    <option value="Orienteering">Orienteering</option>
    <option value="Paddling">Paddling</option>
    <option value="Park Film">Park Film</option>
    <option value="Picnicking">Picnicking</option>
    <option value="Planetarium">Planetarium</option>
    <option value="Playground">Playground</option>
    <option value="Pool Swimming">Pool Swimming</option>
    <option value="RV Camping">RV Camping</option>
    <option value="Reenactments">Reenactments</option>
    <option value="River Tubing">River Tubing</option>
    <option value="Road Biking">Road Biking</option>
    <option value="Rock Climbing">Rock Climbing</option>
    <option value="SCUBA Diving">SCUBA Diving</option>
    <option value="Sailing">Sailing</option>
    <option value="Saltwater Fishing">Saltwater Fishing</option>
    <option value="Saltwater Swimming">Saltwater Swimming</option>
    <option value="Scenic Driving">Scenic Driving</option>
    <option value="Self-Guided Tours - Auto">Self-Guided Tours - Auto</option>
    <option value="Self-Guided Tours - Walking">Self-Guided Tours - Walking</option>
    <option value="Shopping">Shopping</option>
    <option value="Skiing">Skiing</option>
    <option value="Snorkeling">Snorkeling</option>
    <option value="Snow Play">Snow Play</option>
    <option value="Snow Tubing">Snow Tubing</option>
    <option value="Snowmobiling">Snowmobiling</option>
    <option value="Snowshoeing">Snowshoeing</option>
    <option value="Stand Up Paddleboarding">Stand Up Paddleboarding</option>
    <option value="Stargazing">Stargazing</option>
    <option value="Surfing">Surfing</option>
    <option value="Swimming">Swimming</option>
    <option value="Team Sports">Team Sports</option>
    <option value="Theater">Theater</option>
    <option value="Tubing">Tubing</option>
    <option value="Volunteer Vacation">Volunteer Vacation</option>
    <option value="Water Skiing">Water Skiing</option>
    <option value="Whitewater Rafting">Whitewater Rafting</option>
    <option value="Wildlife Watching">Wildlife Watching</option>
    `;
  return template;
}

/****************************************************************************************
 * Populate State search box in DOM
 ***************************************************************************************/
export function renderStateSearch() {
  const stateSearchEL = document.querySelector("#stateSearch");
  const contents = stateOptions();
  stateSearchEL.innerHTML = contents;
}

/****************************************************************************************
 * Populate Region search box in DOM
 ***************************************************************************************/
export function renderRegionSearch() {
  const regionSearchEL = document.querySelector("#regionSearch");
  const contents = regionsTemplate();
  regionSearchEL.innerHTML = contents;
}

/****************************************************************************************
 * Populate ActivitySearch box in DOM
 ***************************************************************************************/
export function renderActivitySearch() {
  const activitySearchEL = document.querySelector("#activitySearch");
  const contents = activitiesTemplate();
  activitySearchEL.innerHTML = contents;
}

/****************************************************************************************
 * Add master filter function
 ***************************************************************************************/
export function applyFilters(data, { state, region, activity }) {
  let filtered = [...data];

  // Filter state OR Region (NOT both)
  if (state) {
    filtered = filtered.filter((p) => p.states.includes(state));
  } else if (region) {
    const regionStates = region.split(",").map((s) => s.trim());
    filtered = filtered.filter((p) => {
      const parkStates = p.states.split(",").map((s) => s.trim());
      return parkStates.some((s) => regionStates.includes(s));
    });
  }

  // Activity filter always allowed to combine
  if (activity) {
    filtered = filtered.filter((p) =>
      p.activities.some((a) => a.name === activity),
    );
  }

  return filtered;
}

/****************************************************************************************
 * Get user Location from browser
 ***************************************************************************************/
export function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = parseFloat(position.coords.latitude);
        const lon = parseFloat(position.coords.longitude);
        resolve({ lat, lon });
      },
      (error) => reject(error),
    );
  });
}

/******************************************************************************
 * Calculate distance
 *****************************************************************************/
function calculateDistance(lonUser, latUser, lonPark, latPark) {
  const R = 3958.8;

  const dLat = ((latPark - latUser) * Math.PI) / 180;
  const dLon = ((lonPark - lonUser) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((latUser * Math.PI) / 180) *
      Math.cos((latPark * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/******************************************************************************
 * Get State from Coordinates
 *****************************************************************************/

async function getStateFromCoords(lat, lon) {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;

  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${token}`,
  );

  const data = await res.json();

  const context = data.features[0].context;

  const state = context.find((c) => c.id.includes("region"));

  return state.short_code.split("-")[1].toUpperCase(); // "us-co" → "CO"
}

/******************************************************************************
 * Filter Parks by distance
 *****************************************************************************/
export async function findNearbyParks(userLat, userLon) {
  const stateCode = await getStateFromCoords(userLat, userLon);

  let parameters = `/parks?stateCode=${stateCode}`;
  let data = await fetchNPS(parameters);

  if (data.data.length == 0) {
    parameters = "/parks?stateCode=CO";
    data = await fetchNPS(parameters);
  }

  const parksWithDistance = data.data.map((park) => {
    const lat = parseFloat(park.latitude);
    const lon = parseFloat(park.longitude);

    const distance = calculateDistance(userLat, userLon, lat, lon);

    return {
      park,
      lat,
      lon,
      distance,
    };
  });

  // Sort by distance
  parksWithDistance.sort((a, b) => a.distance - b.distance);

  // Get closest 10
  const nearest = parksWithDistance.slice(0, 10);

  return nearest;
}
