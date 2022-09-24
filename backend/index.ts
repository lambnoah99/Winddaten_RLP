import *as express from 'express';
import { Request, Response} from 'express';
import { createConnection } from 'mysql2';
import { Windpark } from './models/Windpark';
import * as cors from 'cors';

const PORT: number = 8081;
// Instantiate new Epxress-Server
const app = express();
app.use(express.json());
app.use(cors());

// Db Config
const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'winddata'
});
// Connect to DB
connection.connect(); 

app.get('/', (_req: Request, res: Response) => {
    res.send("Hello World");
})

app.get('/anlagen', (_req: Request, res: Response) => {
    connection.query('SELECT id, name, latitude, longitude, currentPerformance FROM parks', (err, rows:  Windpark[]) => {
        if(err) {
            console.error(err);
        }
        res.json(rows);
    });
});

app.get('/anlagen/:id', (req: Request, res: Response) => {
    if(req.params.id) {

        connection.query('SELECT * FROM parks WHERE id = ?', [req.params.id], (err, rows) => {
            if(err) {
                console.error(err);
                res.send(400);
            }
            res.json(rows[0]);
        });
    } else {
        res.status(400);
    }
});


// Start Epxress Server 
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
