const express = require('express');
const router=express.Router()
const db = require("../dbInfo.js")

router.post('/',(req,res,next)=>{
    db.query("select max(meet_id) from meetlink.dates"
    ,(ERR,RES)=>{
        let id=RES.rows[0].max+1
        for(let i=0; i<req.body.dates.length; i++){
            let date=req.body.dates[i]
            console.log(date)
            db.query(`
                insert into meetlink.dates 
                values 
                (${id},'${date}')`
            ,(ERR,RES)=>{})
        }
        db.end;
        res.status(200).json({"id":id})
    })
})

module.exports=router;