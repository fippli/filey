const express = require('express');
const app = express();

const middleware = require('./middleware');
const api = require('./api');

const { PORT } = process.env;

middleware(app);
api(app);

const port = PORT || 4567
app.listen(port, () => {
  console.log('Filey running on port', port);
})