import * as nasa from './nasaAPI.js'

/* Event Listeners */
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('start-date').value = today
}, false)

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    const day = document.getElementById('start-date').value
    loadOneDay(day)
})

/* Load asteroids for 1 day */
async function loadOneDay(day){
    startWaiting()
    const data = await nasa.getAllByDay(day)
    
    // Get elements
    let len = data.element_count
    const neos = data.near_earth_objects[day]
    let min = 5

    // const slider = document.getElementById('length-slider')
    // const output = document.getElementById('length')
    // slider.style.display = 'inline';
    // slider.min = min
    // slider.max = len
    // slider.oninput = function() {
    //     console.log(this)
    //     output.innerText = this.value
    //     console.log(this.value)
    //     let shorter = neos.slice(0, this.value)
    //     displayNeos(shorter)
    // }

    displayNeos(neos)
    // setup slider
    
    stopWaiting()
}

function displayNeos(neos) {
    const results = document.getElementById('data')
    for(let i = 0; i < neos.length; i++){
        let neo = parseNeo(neos[i])

        let neoDiv = document.createElement('div')
        neoDiv.className = "neo"
        let dangerText = ''
        if(neo.danger){
            neoDiv.className += " danger"
            dangerText = 'POTENTIALLY HAZARDOUS'
        }

        let neoContent = `
            <img class="icon" src="/img/meteorite.svg" />
            <button id="${neo.id}" class="details-btn">Show Details</button>
            <h3 class="neo-header">${neo.name} ${dangerText}</h3>
            <span class="fact">Diameter: ${Math.round(neo.min_size)}-${neo.max_size} km</span>
            <span class="fact">Speed: ${neo.approach_speed} km/h</span>
            <span class="fact">Approach Distance: ${neo.dist} km</span> 
        `
        neoDiv.innerHTML = neoContent
        results.appendChild(neoDiv)
        const b = document.getElementById(neo.id)
        b.onclick = (e) => {
            e.preventDefault()
            console.log(b.id)
            showDetails(b.id)
        }
    }
}

async function showDetails(id){
    startWaiting()
    const data = await nasa.getNeoById(id)
    const neo = parseNeo(data)




    console.log(data)
    stopWaiting()
}

function parseNeo(neo) {
    return {
        id: neo.id,
        name: neo.name,
        danger: neo.is_potentially_hazardous_asteroid,
        max_size: neo.estimated_diameter.meters.estimated_diameter_max,
        min_size: neo.estimated_diameter.meters.estimated_diameter_min,
        approach_speed: neo.close_approach_data[0].relative_velocity.kilometers_per_hour,
        dist: neo.close_approach_data[0].miss_distance.kilometers,
        moon_dist: neo.close_approach_data[0].miss_distance.lunar

    }
}

/* Waiting Icon */
function startWaiting(){
    document.getElementById('waiting').style.display = "block"
}
function stopWaiting(){
    document.getElementById('waiting').style.display = "none"
}