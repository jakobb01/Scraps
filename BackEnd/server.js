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
  origin: [`http://88.200.63.148:${process.env.CLIENT_PORT || 3000}`],
  methods: ["GET", "POST"],
  credentials: true
}));


//search page
app.post('/search/safe', async (req, res) => {
  try {
    const safedata = await safeurl(req.body.url);
    if (req.body.uid) {
      try {
        await db.addUserHistory(req.body.uid, req.body.url, safedata.risk_score);
      } catch (err) {
        console.log(err);
      }
    }
    res.send(safedata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }

});

app.post('/search/linkcheck', async (req, res) => {
  try {
    const checkdata = await linkchecker(req.body.url);
   
    if (req.body.uid) {
    const top = await db.getTop();
      if (top.length < 10) {
        await db.addTop(req.body.url, checkdata.percent);
      } else {
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
          if (minScoreUrl !== null) {
            await db.removeTop(minScoreUrl);
      	  }
      	  await db.addTop(req.body.url, checkdata.percent);
    	}
      }
    }

    res.send(checkdata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }

});

//login & register page
app.post('/login', async (req, res) => {
  const userdetails = await db.authUser(req.body.email);
  const psw = req.body.password;
  try {
    bcrypt.compare(psw, userdetails[0].geslo, function (err, result) {
      if (result) {
        res.send(userdetails[0].uid);
      } else {
        res.status(500).json("Invalid password");
      }
    });
  } catch (err) {
    console.log("Invalid password");
    res.status(500).json({ error: err });
  }
});

app.post('/signup', async (req, res) => {
  const psw = req.body.password;

  const id = uuidv4();

  bcrypt.hash(psw, saltRounds, async function (err, hash) {
    try {
      res.send(await db.addUser(id, req.body.username, req.body.email, hash));
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  });
});

//user history page
app.get('/history/:uid', async (req, res) => {
  try {
    res.send((await db.getUserHistory(req.params.uid)));
  } catch (err) {
    console.log(err);
    res.status(500).json('Database error');
  }
});

//top 10 urls page
app.get('/topurls', async (req, res) => {
  try {
    res.send((await db.getTop()));
  } catch (err) {
    console.log(err);
    res.status(500).json('Database error');
  }
});

//short url page
app.get('/short/:url', async (req, res) => {
  try {
    res.send((await db.findShort(req.params.url))[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: err});
  }

});

app.post('/short', async (req, res) => {
  const baseUrl = req.body.url;

  if (isUri(baseUrl)) {
    const urlCode = generate();
    try  {
      await db.addUserShort(req.body.uid, req.body.url, urlCode);
      res.send({
        uid: req.body.uid,
        url: req.body.url,
        shortUrl: `${process.env.SERVER_IP || "http://localhost"}:${process.env.SERVER_PORT || 5053}/short/${urlCode}`
      })
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json('Invalid base url');
  }
});

app.get('/short/history/:uid', async (req, res) => {
  try {
    res.send(await db.getUserShort(req.params.uid));
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: err});
    }
});

// free ports -> nc -zv 88.200.63.148 5000-5100
app.listen(process.env.SERVER_PORT || 5055, () => {
  console.log(`server is running on port ${process.env.SERVER_PORT || 5055}`);
});
