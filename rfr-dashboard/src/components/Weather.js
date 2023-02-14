import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { SECRETS } from '../secrets';
import { LocalStoragePreferences } from '../util/LocalStoragePreferences';

export default function Weather() {
    let preferences = new LocalStoragePreferences();
    const zip = '08901';
    const apikey = SECRETS.openWeatherMapAPIKey;

    const [weather, setWeather] = useState({ temp: 'Fetching the current weather...', desc: 'Please wait a few seconds...', icon: '' });

    useEffect(() => {
        setInterval(function() {
            let units = preferences.getPreference('unitsMetric') ? 'metric' : 'imperial';
            fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}&units=${units}`)
                .then(response => response.json())
                .then(data => {
                    let degreeMarker = preferences.getPreference('unitsMetric') ? '°C' : '°F';
                    setWeather({
                        temp: data.main.temp.toFixed(0) + degreeMarker,
                        high: data.main.temp_max.toFixed(0) + degreeMarker,
                        low: data.main.temp_min.toFixed(0) + degreeMarker,
                        desc: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
                        icon: data.weather[0].icon
                    });
                });
        }(), 5000);
    }, []);

    return (
        <div className="weather">
            <div className='flex-col'>
                { weather.icon !== '' ? <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} style={{ width: '5em' }} alt="weather icon" /> : null }
                <h3 className="text" style={{ fontSize: '5em' }}>{weather.temp}</h3>
                <br></br>
                { weather.icon !== '' && preferences.getPreference('showHighLowTemp') ? <h3 className='text' style={{ fontSize: '2em' }}><FaArrowUp/> {weather.high} <FaArrowDown/> {weather.low} </h3> : null }
            </div>
            <h3 className="text" style={{ marginTop: '-1vh', fontSize: '3em' }}><i>{weather.desc}</i></h3>
        </div>
    );
}