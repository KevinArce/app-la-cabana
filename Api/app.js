/* Importing the express module. */
const express = require("express");
/* Importing the body-parser module. */
const bodyparser = require("body-parser");

/* Creating an instance of the express module. */
const app = express();

/**
 * The function is called init() and it's an async function. It uses the bodyparser module to parse the
 * body of the request. It then requires the approuting module and creates a new instance of it. It
 * then calls the init() function of the approuting module
 */
async function init() {
  app.use(bodyparser.json({ limit: "50mb" }));
  app.use(
    bodyparser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  const approuting = require("./modules");
  const appmodules = new approuting(app);
  appmodules.init();
}

/* Calling the init() function. */
init();

/* It's exporting the app object so that it can be used in other files. */
module.exports = app;