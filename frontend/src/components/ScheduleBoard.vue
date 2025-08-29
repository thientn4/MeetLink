<template>
  <div class="Calendar">
    <br>
    <h4 id="calendar_prompt">Please edit your availability</h4>
    <div class="center_div"><div id="calendar_divider"></div></div>
    <br>
    
    <div class="center_div">
        <div class="calendar_nav_btn_center">
            <button class="calendar_nav_button" 
                @click="navTimeSlot(-3)"
                :class="{
                            inactive_btn:
                            this.timeSlotsIter-3<0,
                        }"
            >
                {{'<'}}
            </button>
        </div>
        <table>
            <tr>
                <td>
                    <table width="480px" style="table-layout: fixed">
                        <tr>
                            <th 
                                v-for="timeSlot in ['PST',...this.plannerInfo.timeSlots.slice(this.timeSlotsIter,this.timeSlotsIter+3).map((slot)=>(
                                slot.date.slice(0,4)+'-'+
                                this.months[parseInt(slot.date.slice(5,7))-1]+'-'+
                                slot.date.slice(8,10)
                                ))]" v-bind:key="timeSlot.id"
                                :class="{
                                        timezone_title:
                                        timeSlot=='PST',
                                    }"
                            >
                                {{timeSlot}}
                            </th>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                <div style="width:500px; height:230px; overflow:auto;">
                    <table width="480px" height="230px">
                        <tr v-for="hour in [...Array(47).keys()]" v-bind:key="hour">
                            <td 
                                v-for="slot in [...Array(this.plannerInfo.timeSlots.slice(this.timeSlotsIter,this.timeSlotsIter+3).length+1).keys()]" 
                                v-bind:key="slot"
                                v-text="(hour%2==0)?(Math.floor(hour/2)+':00'):(Math.floor(hour/2)+':30')"
                                :class="{
                                        hour_title:
                                            slot==0,
                                        hour_option_0:
                                            slot!=0 
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )==0,
                                        hour_option_1:
                                            slot!=0 
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )>0
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )<=(1/3),
                                        hour_option_2:
                                            slot!=0 
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )>(1/3)
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )<=(2/3),
                                        hour_option_3:
                                            slot!=0 
                                            && setSlotColor(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )>(2/3),
                                        selected_slot:
                                            slot!=0
                                            && setSlotBorder(
                                                this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                                ,hour
                                            )

                                    }"
                                @click="()=>{
                                    if(slot!=0)
                                        selectedSlotToggle(
                                            this.plannerInfo.timeSlots[slot-1+this.timeSlotsIter].date
                                            ,hour
                                        )
                                    }"
                            >
                            </td>
                        </tr>
                    </table>  
                </div>
                </td>
            </tr>
        </table>
        <div class="calendar_nav_btn_center">
            <button class="calendar_nav_button"
                @click="navTimeSlot(3)"
                :class="{
                            inactive_btn:
                            this.timeSlotsIter+3>=this.plannerInfo.timeSlots.length,
                        }"
            >
                {{'>'}}
            </button>
        </div>
    </div>
    <br>
    <button id="continue_button" @click="nextPage()">Confirm</button>
  </div>
</template>

<script>
export default {
  name: 'Calendar-page',
  props:['inputPlannerInfo','email'],
  data(){
    return {
        timeSlotsIter:0,
        months : ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        updatedSlots:[],
        user_cnt:3,
        plannerInfo:{
            plannerId:0,
            timeSlots:[
                // {
                //     date: "2022-09-10",
                //     hours: [
                //         {
                //             hour: 20,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com"]
                //         },
                //         {
                //             hour: 40,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-09-11",
                //     hours: [
                //         {
                //             hour: 21,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com"]
                //         },
                //         {
                //             hour: 41,
                //             attendees:[
                //                 "ntmthien2001@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-09-12",
                //     hours: [
                //         {
                //             hour: 30,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         },
                //         {
                //             hour: 50,
                //             attendees:[
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-09-20",
                //     hours: [
                //         {
                //             hour: 10,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com"]
                //         },
                //         {
                //             hour: 15,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-09-30",
                //     hours: [
                //         {
                //             hour: 40,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         },
                //         {
                //             hour: 50,
                //             attendees:[
                //                 "ntmthien2001@gmail.com",]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-10-05",
                //     hours: [
                //         {
                //             hour: 5,
                //             attendees:[
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmtrung1973@gmail.com"]
                //         },
                //         {
                //             hour: 32,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-10-07",
                //     hours: [
                //         {
                //             hour: 10,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         },
                //         {
                //             hour: 20,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-10-10",
                //     hours: [
                //         {
                //             hour: 30,
                //             attendees:[
                //                 "ntmtrung1973@gmail.com",
                //                 "ntmthien2001@gmail.com"]
                //         },
                //         {
                //             hour: 40,
                //             attendees:[
                //                 "ntmthien2001@gmail.com", 
                //                 "ntmhuyen2005@gmail.com",
                //                 "ntmhoang2005@gmail.com"]
                //         }
                //     ]
                // },
                // {
                //     date: "2022-10-11",
                //     hours: []
                // }
            ]
        }
    }
  },
  created(){ ///////////useEffect on render
    this.plannerInfo=JSON.parse(this.inputPlannerInfo);
  },
  methods:{
    navTimeSlot(slotNum){
        if(slotNum<0 && this.timeSlotsIter+slotNum<0)return;
        if(slotNum>0 && this.timeSlotsIter+slotNum>=this.plannerInfo.timeSlots.length)return;
        this.timeSlotsIter+=slotNum
    },
    setSlotColor(inp_date,inp_hour){
        let curDateSlot=this.plannerInfo.timeSlots.filter((dateSlot)=>dateSlot.date===inp_date)[0]
        let curHourSlot=curDateSlot.hours.filter((hourSlot)=>(hourSlot.hour===inp_hour))
        if(curHourSlot.length==0)return 0
        return (curHourSlot[0].attendees.length/this.user_cnt)
    },
    setSlotBorder(inp_date,inp_hour){
        let curDateSlot=this.plannerInfo.timeSlots.filter((dateSlot)=>dateSlot.date===inp_date)[0]
        let curHourSlot=curDateSlot.hours.filter((hourSlot)=>(hourSlot.hour===inp_hour))
        if(curHourSlot.length==0)return false
        return (curHourSlot[0].attendees.includes(this.email))
    },
    selectedSlotToggle(inp_date,inp_hour){
        let curDateSlot=this.plannerInfo.timeSlots.find((dateSlot)=>dateSlot.date===inp_date)
        let curHourSlot=curDateSlot.hours.find((hourSlot)=>(hourSlot.hour===inp_hour))
        if(curHourSlot===undefined){
            curDateSlot.hours.push({
                hour:inp_hour,
                attendees:[
                    this.email
                ]
            })
        }else{
            let revisedAttendees=curHourSlot.attendees.filter((attendee)=>(attendee!==this.email))
            if(revisedAttendees.length===curHourSlot.attendees.length){
                curHourSlot.attendees.push(this.email)
            }
            else{
                curHourSlot.attendees=revisedAttendees
            }
        }
        let revisedSlots=this.updatedSlots.filter(
            (slot)=>(slot.date!==inp_date||slot.hour!==inp_hour)
        )
        
        if(revisedSlots.length===this.updatedSlots.length){
            this.updatedSlots.push({
                date: inp_date,
                hour: inp_hour
            })
        }else{
            this.updatedSlots=revisedSlots
        }
        console.log(JSON.stringify(this.updatedSlots,null,2))
    },
    nextPage(){
        fetch(process.env.VUE_APP_BACKEND_URL+'/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body:JSON.stringify({ //body can only be passed with headers and mode above
                "email":this.email,
                "id":this.plannerInfo.plannerId,
                "dates":this.updatedSlots
            })
        })
        this.$router.push({
            name: 'Confirmation',
            params: {
                plannerId: this.plannerInfo.plannerId,
                email:this.email
            }
        })
    }
  }
  /*
    receive:
        email: str
        Planner ID: str
    retrieve data via Planner ID:
        {
            plannerID: str
            time slots:[
                {
                    date + hour: str
                    attendee: [email:str, ...]
                },
                ...
            ]
        }
    insert time slot(plannerID:str, time slots: [str], email:str)
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#calendar_prompt{
    color: rgb(18, 18, 93);
}
.center_div{
    display:flex;
    flex-direction: row;
    justify-content: center;
}
#calendar_divider{
    background-color: rgb(215, 215, 65);
    height:3px;
    width:500px;
}
th, td{
    height:25px;
    border-style: solid;
    border-color: white;
}
.hour_option_0{
    color: rgb(240, 240, 250);
    background-color: rgb(240, 240, 250);
}
.hour_option_1{
    color: rgb(172, 172, 219);
    background-color: rgb(172, 172, 219);
}
.hour_option_2{
    color: rgb(86, 86, 160);
    background-color: rgb(86, 86, 160);
}
.hour_option_3{
    color: rgb(18, 18, 93);
    background-color: rgb(18, 18, 93);
}
.selected_slot{
    border-style: solid;
    border-color: rgb(215, 215, 65);
}
.hour_title{
    width:50px;
    background-color: rgb(245, 245, 194);
}
.timezone_title{
    width:50px;
}
#continue_button{
    width: 90px;
    height: 30px;
    border-radius: 120px;
    font-weight:bold;
    border:none;
    background-color: rgb(215, 215, 65);
    color: rgb(18, 18, 93);
}
.inactive_btn{
    color: white;
}
.calendar_nav_button{
    font-size: 30px;
    width:60px;
    height:30px;
    border:none;
    background-color: white;
}
.calendar_nav_btn_center{
    display:flex;
    flex-direction: column;
    justify-content: center;
}
</style>

