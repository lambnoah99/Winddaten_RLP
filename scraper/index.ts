import { get } from './node_modules/table-scraper';
import { parseDms } from './node_modules/dms-conversion';
import { createConnection } from 'mysql2';
import { Anlage } from './models/Anlage';
import { DDCoordinates } from './models/DDCoordinates';


const url = "https://de.wikipedia.org/wiki/Liste_von_Windkraftanlagen_in_Rheinland-Pfalz";
let anlagen: Anlage[] = [];

// DB config
const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'wind'
});
// Connect to Database
connection.connect((
    (err) => console.error(err)
));


// Scrape Table from Wikipedia
get(url).then((tableData: any) => {

    // Filter out relevant data and add them to anlagen Array
    tableData[0].forEach((anlage: any) => {
        anlagen.push({
            name: anlage.Name,
            leistung: Number(anlage['Gesamt-leistung (MW)'].replace(',', '.')),
            anzahl: Number(anlage.Anzahl),
            koordinaten: convertDmsToDD(anlage.Koordinaten),
        });
    });

    // Insert all anlagen into DB
    anlagen.forEach((anlage: Anlage) => {
        insertIntoDB(anlage);
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
function insertIntoDB(anlage: Anlage) {
    connection.query(`INSERT INTO anlagen (name, performance, amount, latitude, longitude) VALUES ('${anlage.name}', '${anlage.leistung}', '${anlage.anzahl}', '${anlage.koordinaten.latitude}', '${anlage.koordinaten.longitude}')`)
}