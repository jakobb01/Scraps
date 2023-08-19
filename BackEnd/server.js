const express = require('express');
const app = express();
const cors = require("cors")
const safeurl = require("./routes/safeurl");
const linkchecker = require("./routes/linkchecker.js");
const db = require('./db/database')
const {generate} = require("shortid");
const {isUri} = require("valid-url");
require('dotenv').config()
const bcrypt = require('bcrypt');
const saltRounds = 6;
const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [`http://localhost:${process.env.CLIENT_PORT || 3000}`],
  methods: ["GET", "POST"],
  credentials: true
}));


//search page
app.post('/search/safe', async (req, res) => {
  const safedata = await safeurl(req.body.url);
  if (req.body.uid) {
    try (safedata.risk_score) {
      await db.addUserHistory(req.body.uid, req.body.url, safedata.risk_score);
    } catch (err) {
      console.log(err);
    }
  }
  res.send(safedata);
});

app.post('/search/linkcheck', async (req, res) => {
  try {
    const checkdata = await linkchecker(req.body.url);
    const top = await db.getTop();

    // Assume that the top 10 scores are stored in an array
    let minScore = null;
    let minScoreUrl = null;

    // Find the smallest score in the top 10
    for (let i = 0; i < top.length; i++) {
      if (minScore === null || top[i].percent < minScore) {
        minScore = top[i].percent;
        minScoreUrl = top[i].url;
      }
    }

    // If the new score is greater than the smallest score in the top 10, replace it
    if (checkdata.percent > minScore) {
      await db.removeTop(minScoreUrl);
      await db.addTop(req.body.url, checkdata.percent);
    }

    res.send(checkdata);
  } catch (err) {
    console.log(err);
  }

});

//login & register page
app.post('/login', async (req, res) => {
  const userdetails = await db.authUser(req.body.email);
  const psw = req.body.password;
  bcrypt.compare(psw, userdetails.password, function (err, result) {
    if (result) {
      res.send(userdetails.uid);
    } else {
      res.send("Invalid password");
    }
  });
});

app.post('/signup', async (req, res) => {
  const psw = req.body.password;

  const id = uuidv4();

  bcrypt.hash(psw, saltRounds, async function (err, hash) {
    try {
      await db.addUser(id, req.body.username, req.body.email, hash);
    } catch (err) {
      console.log(err);
    }
  });
});

//user history page
app.get('/history/:uid', async (req, res) => {
  res.send(await db.getUserHistory(req.params.uid));
});

//top 10 urls page
app.get('/topurls', async (req, res) => {
  res.send(await db.getTop());
});

//short url page
app.get('/short/:url', async (req, res) => {
  res.send(await db.findShort(req.params.url));
});

app.post('/short', async (req, res) => {
  const baseUrl = req.body.url;

  if (isUri(baseUrl)) {
    const urlCode = generate();
    try (await db.addUserShort(req.body.uid, req.body.url, urlCode)) {
      res.send({
        uid: req.body.uid,
        url: req.body.url,
        shortUrl: `${process.env.SERVER_IP || "http://localhost"}:${process.env.SERVER_PORT || 5053}/${urlCode}`
      })
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json('Invalid base url');
  }
});

app.get('/short/history/:uid', async (req, res) => {
  res.send(await db.getUserShort(req.params.uid));
});

// free ports -> nc -zv 88.200.63.148 5000-5100
app.listen(process.env.SERVER_PORT || 5055, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT || 5055}`);
});