import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    // res.send('Hello, world');
    const data = {
        name: 'Brian',
        isBoy: true,
    };
    res.json(data);
});



const port = 8888;
app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
})