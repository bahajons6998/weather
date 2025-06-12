export async function fetchWeatherData(city,unit) {
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    const res = await fetch(url);
    const data = await res.json();
    return data; 
}

export async function searchCities(query) {
    const apiKey = process.env.REACT_APP_OWM_API_KEY;
    
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json(); if (data && Array.isArray(data)) {
        return data.map(city => ({
            value: `${city.name}, ${city.country}`,
            label: `${city.name}, ${city.country}`,
            originalName: city.name, 
            country: city.country,
            lat: city.lat,
            lon: city.lon,
        }));
    }
    return []; 
}