import React, { useState } from 'react';
import axios from 'axios';
import './Main.scss';

export default function Main() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const apiKey = "bd57b47651200e2706ad96e7dd798339";

    const getWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            )
            setWeatherData(response.data);
            setError("");
        } catch (error) {
            setWeatherData(null);
            setError("Город не найден");
        }
    }

    const getIcon = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;

    return (
        <div>
            <h1>Погодное приложение</h1>
            <input className='inp' type="text" placeholder='Введите город' value={city} onChange={(e) => setCity(e.target.value)} />
            <button className='btn' onClick={getWeatherData}>Узнать погоду</button>
            {
                weatherData && (
                    <div className='weather-card'>
                        <h2>{weatherData.name}</h2>
                        <p>Температура: {weatherData.main.temp}</p>
                        <img src={getIcon(weatherData.weather[0].icon )} alt="" />
                    </div>
                )
            }
            {
                error && <p className='error'>{error}!</p>
            }
        </div>
    )
}
