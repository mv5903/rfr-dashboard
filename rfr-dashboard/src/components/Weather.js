import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function Weather() {
    const zip = '08901';
    const apikey = '214164ec971a2392bc3bd503b9174fff';

    const [weather, setWeather] = useState({ temp: 'Fetching the current weather...', desc: 'Please wait a few seconds...', icon: '' });

    useEffect(() => {
        setInterval(() => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}&units=imperial`)
                .then(response => response.json())
                .then(data => {
                    setWeather({
                        temp: data.main.temp.toFixed(0) + '°F',
                        high: data.main.temp_max.toFixed(0) + '°F',
                        low: data.main.temp_min.toFixed(0) + '°F',
                        desc: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
                        icon: data.weather[0].icon
                    });
                });
        }, 5000);
    }, []);

    return (
        <div className="weather">
            <div className='flex-col'>
                { weather.icon !== '' ? <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} style={{ width: '5em' }} alt="weather icon" /> : null }
                <h3 className="text" style={{ fontSize: '5em' }}>{weather.temp}</h3>
                <br></br>
                { weather.icon !== '' ? <h3 className='text' style={{ fontSize: '2em' }}><FaArrowUp/> {weather.high} <FaArrowDown/> {weather.low} </h3> : null }
            </div>
            <h3 className="text" style={{ marginTop: '-1vh', fontSize: '3em' }}><i>{weather.desc}</i></h3>
        </div>
    );
}