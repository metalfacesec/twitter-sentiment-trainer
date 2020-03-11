const express = require('express');
const axios = require('axios');
const randomWords = require('random-words');

var cors = require('cors')

var app = express();

app.use(cors());

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/random_tweet", async (req, res, next) => {
    let token = await getAuthToken();
    let tweet = await getRandomTweet(token);

    res.json({'text': tweet});
});

async function getAuthToken() {
    let url = 'https://XXXAPIKEYXX:XXXAPISECRETXXX@api.twitter.com/oauth2/token';
    let response = await axios.post(url, null, {params: {'grant_type': 'client_credentials'}});

    return response.data.access_token;
}

async function getRandomTweet(token) {
    let random_word = randomWords();

    console.log(random_word);

    let url = "https://api.twitter.com/1.1/search/tweets.json?count=1&lang=en&q=" + random_word;
    let response = await axios.get(url, {headers: {'Authorization': 'Bearer ' + token}});

    return response.data.statuses[0].text;
}