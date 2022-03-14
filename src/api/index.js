/*
    This App uses the NASA Near Earth Object API
    More info can be found at https://api.nasa.gov/ 
*/
const appKey = '5s5BpYuvu9SqTQ2KqCDDElAOQsuF06l4erbwEPEe'

/**
 * Get all asteroids with closest approach on certain day
 * 
 * @param {*} day YYYY-MM-DD format 
 * @returns json object data
 */
async function getAllByDay(day) {
    const params = `?start_date=${day}&end_date=${day}&api_key=${appKey}`
    const url = 'https://api.nasa.gov/neo/rest/v1/feed' + params
    const response = await fetch(url)
    const data = await response.json()
    const neos = data.near_earth_objects[day].map((neo) => parseNeo(neo))
    return neos
}

/**
 * Get all asteroids with a closest approach date in given range
 * 
 * @param {*} startDate YYYY-MM-DD format
 * @param {*} endDate YYYY-MM-DD format
 * @returns json object data
 */
async function getAllInRange(startDate, endDate) {
    const params = `?start_date=${startDate}&end_date=${endDate}&api_key=${appKey}`
    const url = 'https://api.nasa.gov/neo/rest/v1/feed' + params
    const response = await fetch(url)
    const data = await response.json()
    const neos = []
    let day = new Date(startDate)
    let end = new Date(endDate)
    while (day <= end){
        let curr = new Date(day).toISOString().split('T')[0]
        for(let neo of data.near_earth_objects[curr]){
            neos.push(parseNeo(neo))
        }
        let newDay = day.setDate(day.getDate() + 1)
        day = new Date(newDay)
    }
    return neos
}

async function getNeoById(id) {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${appKey}`
    const response = await fetch(url)
    const data = await response.json()
    return parseNeo(data)
}

function parseNeo(neo) {
    return {
        id: neo.id,
        name: neo.name,
        date: neo.close_approach_data[0].close_approach_date,
        danger: neo.is_potentially_hazardous_asteroid,
        max_size: neo.estimated_diameter.meters.estimated_diameter_max,
        min_size: neo.estimated_diameter.meters.estimated_diameter_min,
        approach_speed: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        dist: neo.close_approach_data[0].miss_distance.kilometers,
        moon_dist: neo.close_approach_data[0].miss_distance.lunar

    }
}

export { getAllByDay, getAllInRange, getNeoById };