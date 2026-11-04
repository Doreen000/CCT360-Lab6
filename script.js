const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=43.5789&longitude=-79.6583&hourly=temperature_2m,weather_code&timezone=auto";

function getWeatherDescription(code) {
    switch(code) {
        case 0: return "Clear";
        case 1:
        case 2:
        case 3: return "Partly Cloudy";
        case 45:
        case 48: return "Foggy";
        case 51:
        case 53:
        case 55: return "Drizzle";
        case 61:
        case 63:
        case 65: return "Rain";
        case 71:
        case 73:
        case 75: return "Snow";
        case 95:
        case 96:
        case 99: return "Thunderstorm";
        default: return "Weather Condition: " + code;
    }
}

fetch(apiUrl)
    .then((Response) => Response.json())
    .then((data) => {
        console.log("API success:", data);
        
        let temp = data.hourly.temperature_2m[0];
        let code = data.hourly.weather_code[0];

        document.querySelector("#temperature").textContent = temp + "°C";
        document.querySelector("#weather-condition").textContent = getWeatherDescription(code);
    })
        .catch((error) => {
        console.error("Can't get weather data:", error);
        document.querySelector("#weather-condition").textContent = "Error";
        document.querySelector("#weather-condition").textContent = "";
    });