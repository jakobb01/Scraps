const express = require('express');

const app = express();
const cors = require("cors")
const users = require("./routes/users")
const safeurl = require("./routes/safeurl");
//const db = require('./db/database')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true
}));


//routes
app.post('/search', async (req, res) => {
  res.send(await safeurl(req.body.url));
});

app.use("/users", users)





app.listen(process.env.PORT || 5054, () => {
  console.log(`server is running on port ${process.env.PORT || 5054}`);
});