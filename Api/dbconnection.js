/* Importing the mssql module. */
const mssql = require('mssql');
/* It creates a connection to the database and returns it */
class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect({
              user: 'sa',
              password: 'sa',
              server: 'localhost',
              database: 'Demo',
              port: 1433
       });
    }
    catch(error) {
      console.log(error);
    }
  }
}
/* Exporting the class DBConnection. */
module.exports = new DBConnection();