import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world');
});

const port = 8888;
app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
})