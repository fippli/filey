const bodyParser = require('body-parser');
const cors = require('cors');

const middleware = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
};

module.exports = middleware;

