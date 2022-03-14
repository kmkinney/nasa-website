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
    return data
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
    return data
}

async function getNeoById(id) {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${appKey}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export { getAllByDay, getAllInRange, getNeoById };