import express, { Request, Response} from 'express';

const PORT: number = 8081;
// Instantiate new Epxress-Server
const app = express();

app.get('/', (_req: Request, res: Response) => {
    res.send("Hello World");
});

// Start Epxress Server 
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));