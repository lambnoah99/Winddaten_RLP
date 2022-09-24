import { createConnection } from "mysql2";
import { Windpark } from './models/Windpark';
import { Windspeed } from './models/Windspeed';
import axios from 'axios';

// Db Config
const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'winddata'
});

const apiKey = '7ba94bce30e5d6697a151cd4b94b6325';
// Connect to DB
connection.connect();

let windparks: Windpark[] = [];
let currentWindspeed = 60;
let windSpeeds: Windspeed[] = [
    {
        latitude: 49.93307862572027,
        longitude: 7.469163209694419,
        speed: 60
    }
]

cycle();
setInterval(cycle, 1 * 60 * 1000);

function cycle() {
    // Get Data from API
    fetchWindspeeds();
    // Get Data from DB
    getWindparks();
}

function getWindparks() {
    connection.query('SELECT id, latitude, longitude, performance FROM parks', (err, rows: Windpark[]) => {
        if(err) throw err;
        rows.forEach((windpark: Windpark) => {
            windparks.push(calculate(windpark));
        });
        writeWindparks();
    });
}

function writeWindparks() {
    windparks.forEach((windpark: Windpark) => {
        connection.query('UPDATE parks SET currentPerformance = ? WHERE id = ?', [windpark.currentPerformance, windpark.id], (err, rows) => {
            if(err) throw err;
        });
    })
}

function calculate(windpark: Windpark): Windpark {
    const multiplier = interpolate(windpark.latitude, windpark.longitude) / 10;
    windpark.currentPerformance = (((windpark.performance * multiplier) * 1000) / 365 / 24);

    return windpark;
}

function interpolate(latitude: number, longitude: number): number {
    return windSpeeds
        .map((windspeed: Windspeed) => windspeed.speed)
        .reduce((previous, current) => previous + current);
}

function fetchWindspeeds(): void {
    console.log(Date.now() + " Fetching windspeed");
    windSpeeds.forEach(async (windspeed: Windspeed) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${windspeed.latitude}&lon=${windspeed.longitude}&appid=${apiKey}`
        axios.get(url)
        .then(response => {
            console.log("Windspeed:" + response.data.wind.speed);
            windspeed.speed = response.data.wind.speed;
        })
        .catch(error => console.error(error));
    })
}