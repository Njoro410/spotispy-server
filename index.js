import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
const app = express();
const port = 8888;
import queryString from 'query-string';


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

app.get('/', (req, res) => {
    // res.send('Hello, world');
    const data = {
        name: 'Brian',
        isBoy: true,
    };
    res.json(data);
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };


app.get('/login', (req, res) => {
    const queryParams = queryString.stringify({
        client_id:CLIENT_ID,
        response_type:'code',
        redirect_uri:REDIRECT_URI,
    })

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})


app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
})