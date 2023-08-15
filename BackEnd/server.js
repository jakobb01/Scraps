const express = require('express');

const app = express();
const cors = require("cors")
const users = require("./routes/users")
//const db = require('./db/database')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://88.200.63.148:3054"],
  methods: ["GET", "POST"],
  credentials: true
}));


//routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/users", users)



app.listen(8080, () => {
  console.log('server is running on port 8080');
});