import React, {useEffect, useState} from "react";
import styles from "../styles/WeatherPage.module.css";
import axios from "axios";

const WeatherPage = () => {
    const [country, setCountry] = useState("");
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        fetchWeather("Minsk");
    }, []);

    async function fetchWeather(city) {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: city,
                appid: "45c5f1b5155e85e7b7bec5a5fd9b45cc",
                units: "metric",
                lang: "eng",
            },
        });
        setWeatherData(response.data);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>SYNOPTIC</div>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        className={styles.input}
                    />
                    <button onClick={() => {
                        fetchWeather(country);
                        setCountry('')}
                    } className={styles.button}>
                        Find
                    </button>
                </div>
                <div className={styles.location}>
                    Weather in {weatherData?.name ? `${weatherData.name}` : "your city"}
                </div>
            </header>

            <main className={styles.main}>
                {weatherData && weatherData.main ? (
                    <div className={styles.content}>
                        <section className={styles.summary}>
                            <h1 className={styles.title}>Current Weather</h1>
                            <div className={styles.temperature}>
                                {weatherData.main.temp >= 0 ? "+" : "-"}
                                {Math.round(weatherData.main.temp)}°C
                            </div>
                            <div className={styles.feelsLike}>
                                Feels like {Math.round(weatherData.main.feels_like)}°
                            </div>
                            <div className={styles.description}>
                                {weatherData.weather[0].description}
                            </div>
                            <div className={styles.sunTimes}>
                                <div>
                                    Sunrise:{" "}
                                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div>
                                    Sunset:{" "}
                                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </div>
                        </section>

                        <section className={styles.details}>
                            <h2>Details</h2>
                            <div>Wind Speed: {weatherData.wind.speed} m/s</div>
                            <div>Humidity: {weatherData.main.humidity}%</div>
                            <div>Pressure: {weatherData.main.pressure} hPa</div>
                        </section>
                    </div>
                ) : (
                    <div className={styles.loading}>Loading weather data...</div>
                )}
            </main>
        </div>
    );
};

export default WeatherPage;
