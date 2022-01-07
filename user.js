const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "project1",
};
async function connectionCheck() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("connection success");
  await connection.endAsync();
}
connectionCheck();

async function addUser(user) {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  // console.log("connection success");

  let sql = "INSERT INTO user(username, password) VALUES (?,?) ";
  await connection.queryAsync(sql, [user.username, user.password]);

  await connection.endAsync();

  console.log("Record Added");
}

async function selectUser(user) {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  // console.log(" success");

  let sql = "select * from user ";
  const list = await connection.queryAsync(sql, []);

  await connection.endAsync();

  // console.log(list);
  return list;
}

//const user = {username:'Shubham', password:'1223334444'}
// connectionCheck();
//addUser();

//selectUser();
