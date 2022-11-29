/* A class that is used to create a module. */
class Module {
    /**
     * The constructor function is a special function that is called when an object is created from a
     * class
     * @param app - The express app object
     */
    constructor(app) {
       this.app = app;
    }
   /* Initializing the module. */
   init() {
    /* Requiring the product controller and then creating a new instance of it. */
    const productcontroller = require('./product/product.controller');
    new productcontroller(this.app);
   }
  }
  /* Exporting the Module class so that it can be used in other files. */
  module.exports = Module;