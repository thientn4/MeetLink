const mysql = require('mysql2');
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    port: 3306,
    password: "Ntmtrung1973@",
    database: "meetlink"
});

module.exports=pool;