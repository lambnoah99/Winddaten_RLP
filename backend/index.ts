import *as express from 'express';
import { Request, Response} from 'express';
import { createConnection } from 'mysql2';

const PORT: number = 8081;
// Instantiate new Epxress-Server
const app = express();
app.use(express.json());

// Db Config
const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'wind'
});
// Connect to DB
connection.connect(); 

app.get('/', (_req: Request, res: Response) => {
    res.send("Hello World");
})

app.get('/anlagen', (_req: Request, res: Response) => {
    connection.query('SELECT * FROM anlagen', (err, rows) => {
        if(err) {
            console.error(err);
        }
        res.json(rows);
    });
});


// Start Epxress Server 
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));