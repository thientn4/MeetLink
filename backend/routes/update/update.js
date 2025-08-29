const express = require('express');
const router=express.Router()
const db = require("../dbInfo.js")

router.post('/',(req,res,next)=>{
    for(let i=0;i<req.body.dates.length;i++){
        let date=req.body.dates[i]
        console.log(`(${req.body.id},${date.date},${date.hour},${req.body.email})`)
        db.query(
            `DO $$
            BEGIN
            insert into meetlink.attendees
            values
            (${req.body.id},'${date.date}',${date.hour},'${req.body.email}');
            exception when sqlstate '23505' then
                DELETE FROM meetlink.attendees
                WHERE 
                    meet_id=${req.body.id} and
                    meet_date='${date.date}' and
                    meet_hour=${date.hour} and
                    meet_email='${req.body.email}';
            END $$`
        ,(ERR,RES)=>{db.end;})
    }
    res.status(200).end();
})

module.exports=router;