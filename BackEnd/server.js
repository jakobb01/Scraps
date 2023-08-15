import express from 'express';
//import db from './database.js';

const app = express();

app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hello World');
});



app.listen(8080, () => {
  console.log('server is running on port 3000');
});