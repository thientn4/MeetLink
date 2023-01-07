const {Client}=require('pg');
const db=new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password: "723155",
    database: "postgres"
})
db.connect();

module.exports=db;