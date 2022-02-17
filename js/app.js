import someFun from "./nasaAPI.js";
/* https://api.nasa.gov/ */


getTestData();
/*
function onload(){
    const data = await getTestData()
}
*/

async function getTestData(){
    alert('started call');
    const start = '2020-12-19';
    const appKey = '5s5BpYuvu9SqTQ2KqCDDElAOQsuF06l4erbwEPEe';
    const url = `https://api.nasa.gov/neo/rest/v1/feed`
    const params = `?start_date=${start}&api_key=${appKey}`
    const fullURI = url + params;

    startWaiting();
    const resp = await fetch(fullURI);
    const data = await resp.json()
    console.log(data)
    stopWaiting();

    return data
}

function startWaiting(){
    document.getElementById('waiting').style.display = "block";
}

function stopWaiting(){
    document.getElementById('waiting').style.display = "none";
}
