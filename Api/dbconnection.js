/* Importing the mssql module. */
const mssql = require('mssql');
/* It creates a connection to the database and returns it */
class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect({
              user: 'web.informatica',
              password: 'web.informatica',
              server: '10.1.3.95',
              database: '',
              port: 1433,
              options : {
                encrypt : false,
                enableArithAbort : true,
                trustServerCertificate: true
            }
       });
    }
    catch(error) {
      console.log(error);
    }
  }
}

/* Exporting the class DBConnection. */
module.exports = new DBConnection();