const express = require('express');
const routerApi = require('./routes');
const usersService = require('./services/users.service');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON bodies (as sent by API clients)
app.use(cors());


router.use((req,res,next)=>{
  console.log('middleware');
  next();
})



routerApi(app);

app.listen(port, () => { // This is the callback function that will be executed when the server is ready to listen
  console.log(`Example app listening at http://localhost:${port}`)
});

