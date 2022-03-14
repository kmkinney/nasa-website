import * as nasa from './nasaAPI.js'

/* Event Listeners */
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]
    const dateSelect = document.getElementById('start-date')
    if(dateSelect){
        dateSelect.value = today
    }
}, false)

const submitBtn = document.getElementById('submit')
if(submitBtn){
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const day = document.getElementById('start-date').value
        loadOneDay(day)
    })
}

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
    while(results.firstChild){
        results.removeChild(results.firstChild)
    }
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
            <p class="fact">Diameter: ${Math.round(neo.min_size)}-${Math.round(neo.max_size)} km</p>
            <p class="fact">Speed: ${Math.round(neo.approach_speed)} km/h</p>
            <p class="fact">Approach Distance: ${Math.round(neo.dist)} km</p> 
            <p class="fact">Lunar Distance: ${Number(neo.moon_dist).toPrecision(3)}</p> 
        `
        neoDiv.innerHTML = neoContent
        
        results.appendChild(neoDiv)
        const b = document.getElementById(neo.id)
        b.onclick = (e) => {
            e.preventDefault()
            showDetails(neo)
        }
    }
}

async function showDetails(neo){
    // window.location.href = '/details.html'
    startWaiting()

    console.log(neo)

    const results = document.getElementById('data')
    let neoDiv = document.createElement('div')
    neoDiv.className = "neo-details"
    let dangerText = ''
    if(neo.danger){
        dangerText = 'POTENTIALLY HAZARDOUS'
    }

    neoDiv.innerHTML = `
        <h1>${neo.name}<span class="danger">${dangerText}</span></h1>
        <h3 class="fact">Diameter: ${Math.round(neo.min_size)}-${Math.round(neo.max_size)} km</h3>
        <h3 class="fact">Speed: ${Math.round(neo.approach_speed)} km/h</h3>
        <h3 class="fact">Approach Distance: ${Math.round(neo.dist)} km</h3> 
        <h3 class="fact">Lunar Distance: ${Number(neo.moon_dist).toPrecision(3)}</h3>
        <span class="earth">&#9679;<-EARTH</span> 
        <span class="moon">&#9679;<-MOON</span> 
        <span class="asteroid">&#9679;<-ASTEROID</span> 
        <canvas id='map'></canvas>
    `
    while(results.firstChild){
        results.removeChild(results.firstChild)
    }
    results.appendChild(neoDiv)
    //Drawing

    const canvas = document.getElementById('map')
    canvas.style.width = '100%'
    canvas.width = canvas.offsetWidth
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, w, h)
    if(neo.moon_dist > 1){
        const scale = (w - 50) / neo.moon_dist
        drawCirle(ctx, 25, h/2, Math.min(25,scale/2), 'blue')
        drawCirle(ctx, 25 + scale, h/2, Math.min(12, scale/4), 'grey')
        drawCirle(ctx, w-25, h/2, 2, 'brown')
    }
    else {
        const scale = (w-50) * neo.moon_dist
        drawCirle(ctx, 25, h/2, 10, 'blue')
        drawCirle(ctx, w-25, h/2, 5, 'grey')
        drawCirle(ctx, 25 + scale, h/2, 2, 'brown')
    }
    
    
    stopWaiting()
}

function drawCirle(ctx, x, y, r, color) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, false)
    ctx.fillStyle=color
    ctx.fill()
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