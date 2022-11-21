var config = require('../server');
const sql = require('mssql');

async function getUsers() {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("SELECT * FROM Users");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

// Create a login function to authenticate users

async function loginUsers(user) {
  try {
    let pool = await sql.connect(config);
    let login = await pool.request()
      .input('name', sql.NVarChar, user.name)
      .input('password', sql.NVarChar, user.password)
      // Use a stored procedure to authenticate users
      .execute('ILC_Moviles.dbo.Sp_Portal_Rendi_Login_Select');
      //.query("SELECT * FROM Users WHERE Name = @name AND Password = @password");
    return login.recordsets;
  } catch (error) {
    console.log(error);
  }
}


async function getUserById(id) {
  try {
    let pool = await sql.connect(config);
    let user = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query("SELECT * FROM Users WHERE Id = @input_parameter");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function createUser(user) {
  try {
    let pool = await sql.connect(config);
    let insertUser = await pool.request()
      .input('input_parameter', sql.NVarChar, user.name)
      .query("INSERT INTO Users (Name) VALUES (@input_parameter)");
    return insertUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function updateUser(id, user) {
  try {
    let pool = await sql.connect(config);
    let updateUser = await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, user.name)
      .query("UPDATE Users SET Name = @name WHERE Id = @id");
    return updateUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    let pool = await sql.connect(config);
    let deleteUser = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query("DELETE FROM Users WHERE Id = @input_parameter");
    return deleteUser.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  loginUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}