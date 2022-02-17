import * as nasa from './nasaAPI.js'


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
