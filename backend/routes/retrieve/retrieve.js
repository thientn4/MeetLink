const express = require('express');
const router=express.Router()
const db = require("../dbInfo.js")

router.get('/',(req,res,next)=>{

    db.query(
        `select * from (
            select d.meet_date,a.meet_hour,a.meet_email
            from meetlink.dates d left join meetlink.attendees a on
                d.meet_id=a.meet_id and
                d.meet_date = a.meet_date
            where 
                d.meet_id=${req.query.id}
        ) e
        order by meet_date asc,meet_hour asc`
    ,(ERR,RES)=>{
        let dates=[]
        if(!ERR){
            for(let i=0; i< RES.rows.length; i++){
                let date=RES.rows[i]
                if( dates.length==0 ||
                    dates[dates.length-1].date!=date.meet_date
                ){
                    dates.push({
                        date:date.meet_date,
                        hours:date.meet_email!=null?[
                            {
                                hour:date.meet_hour,
                                attendees:[
                                    date.meet_email
                                ]
                            }
                        ]:[]
                    })
                }else if(dates[dates.length-1].hours[dates[dates.length-1].hours.length-1].hour!=date.meet_hour){
                    dates[dates.length-1].hours.push({
                        hour:date.meet_hour,
                        attendees:[
                            date.meet_email
                        ]
                    })
                }else{
                    dates[dates.length-1].hours[dates[dates.length-1].hours.length-1].attendees.push(date.meet_email)
                }
            }
        }
        db.end;
        res.status(200).json({"dates":dates})
    })
})

module.exports=router;