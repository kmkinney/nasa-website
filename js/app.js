import * as nasa from './nasaAPI.js'

document.getElementById('start-date').addEventListener('load', (event) => {
    event.preventDefault();
    document.getElementById('start-date').value = new Date().toDateInputValue();
    console.log('here')
})

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    const day = document.getElementById('start-date').value;
    console.log(day)
})

getTestData()

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
