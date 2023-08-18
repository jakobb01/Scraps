const express = require('express');
const app = express();
const cors = require("cors")
const safeurl = require("./routes/safeurl");
const linkchecker = require("./routes/linkchecker.js");
const statsapi = require("./routes/statsapi");
const db = require('./db/database')
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [`http://localhost:${process.env.CLIENT_PORT || 3000}`],
  methods: ["GET", "POST"],
  credentials: true
}));


//search page
app.post('/search/safe', async (req, res) => {
  res.send(await safeurl(req.body.url));
});

app.post('/search/linkcheck', async (req, res) => {
  res.send(await linkchecker(req.body.url));
});

app.post('/search/stats', async (req, res) => {
  console.log(await statsapi(req.body.url));
  res.send('JSON file with stats of pic home page');
});


//login & register page
app.post('/login', (req, res) => {

});

app.post('/signup', (req, res) => {

});

//user history page
app.get('/history', (req, res) => {
  res.send('JSON file with user history');
});

//top 10 urls page
app.get('/topurls', (req, res) => {
  res.send('JSON file with top 10 urls overall');
});

//short url page




// free ports -> nc -zv 88.200.63.148 5000-5100
app.listen(process.env.SERVER_PORT || 5055, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT || 5055}`);
});