import "./style.css"
import { getWeather } from "./weather"
import { ICON_MAP } from "./iconMap"

getWeather(39.3321, -84.4173, Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(renderWeather).catch(e =>{
    console.error(e)
    alert('error getting weather')
})

function renderWeather({current}){
    renderCurrentWeather(current)
}

// Helper function for renderCurrentWeather()
function setValue(selector, value, unit, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value + unit
}

function getIconUrl(iconCode){
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

function renderCurrentWeather(current){
    // currentIcon.src = getIconUrl(current.iconCode)
    setValue('current-temp', current.currentTemp,'°')
    setValue('high', current.highTemp, '°')
    setValue('low', current.lowTemp, '°')
    setValue('wind', current.windSpeed, ' mph')

}