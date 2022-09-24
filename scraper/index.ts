import { get } from './node_modules/table-scraper';
import { parseDms } from './node_modules/dms-conversion';
import { createConnection } from 'mysql2';
import { Windpark } from './models/Windpark';
import { DDCoordinates } from './models/DDCoordinates';


const url = "https://de.wikipedia.org/wiki/Liste_von_Windkraftanlagen_in_Rheinland-Pfalz";
let parks: Windpark[] = [];

// DB config
const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'winddata'
});
// Connect to Database
connection.connect((
    (err) => console.error(err)
));


// Scrape Table from Wikipedia
get(url).then((tableData: any) => {

    // Filter out relevant data and add them to anlagen Array
    tableData[0].forEach((park: any) => {
        parks.push({
            name: park.Name,
            performance: Number(park['Gesamt-leistung (MW)'].replace(',', '.')),
            amount: Number(park.Anzahl),
            coordinates: convertDmsToDD(park.Koordinaten),
            constructionYear: Number(park.Baujahr.toString().slice(0,4)),
            type: park['Typ (WKA)'],
            place: park.Ort,
            district: park['Land-kreis'],
            notes: park.Bemerkungen
        });
    });

    // Insert all anlagen into DB
    parks.forEach((park: Windpark) => {
        insertIntoDB(park);
    })
});

// Converts DMS Coordinates to DD Coordinates
function convertDmsToDD(dms: string): DDCoordinates {
    let parts = dms.split(',');
    return {
        latitude: parseDms(parts[0]),
        longitude: parseDms(parts[1].slice(1)),
    }
}

// Adds a single Anlage into the Database
function insertIntoDB(park: Windpark) {
    connection.query(`
        INSERT INTO parks (name, performance, amount, latitude, longitude, constructionYear, type, place, district, notes) 
        VALUES ('${park.name}','${park.performance}','${park.amount}','${park.coordinates.latitude}','${park.coordinates.longitude}','${park.constructionYear}','${park.type}','${park.place}','${park.district}','${park.notes}')
    `)
}