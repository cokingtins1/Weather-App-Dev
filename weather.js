import axios from "axios";

const link = "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime"

export function getWeather(lat, lon, timezone) {
	return axios.get(link, {
		params: {
			latitude: lat,
			longitude: lon,
			timezone: timezone,
		},
	}).then(({data}) => {
        return {
            current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data)
        }
    });
}

function parseCurrentWeather({current_weather, daily}){s
    const {
        temperature: currentTemp, 
        windspeed: windSpeed, 
        weathercode:iconCode
    } = current_weather

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
    } = daily

    return{
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        windSpeed: Math.round(windSpeed),
        iconCode,
    }
}


