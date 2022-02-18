import * as nasa from './nasaAPI.js'

/* Event Listeners */
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('start-date').value = today
}, false)

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault()
    const day = document.getElementById('start-date').value
    console.log(day)
    loadOneDay(day)
})

async function loadOneDay(day){
    const data = await nasa.getAllByDay(day)
}

async function getTestData(){
    const day = '2020-12-19'
    startWaiting()
    const data = await nasa.getAllByDay(day)
    console.log(data)
    stopWaiting()

    const id = '2006037'
    startWaiting()
    const idData = await nasa.getNeoById(id)
    console.log(idData)
    stopWaiting()

    return data
}

function startWaiting(){
    document.getElementById('waiting').style.display = "block"
}

function stopWaiting(){
    document.getElementById('waiting').style.display = "none"
}

// Run startup function
// setDayToToday()