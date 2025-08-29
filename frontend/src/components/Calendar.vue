<template>
  <div class="Calendar">
    <br>
    <h4 id="calendar_prompt">Which days do you want to meet?</h4>
    <div class="center_div"><div id="calendar_divider"></div></div>
    <h4 id="calendar_prompt">{{currentMonth}} {{currentYear}}</h4>
    
    <div class="center_div">
        <div class="calendar_nav_btn_center">
            <button class="calendar_nav_button" 
                @click="navMonth(-1)">
                {{'<'}}
            </button>
        </div>
        <table id="calendar_table">
            <tr>
                <th v-for="weekday in ['Sun','Mon ','Tue','Wed','Thu','Fri','Sat']" v-bind:key="weekday.id">{{weekday}}</th>
            </tr>
            <tr v-for="week in [0,1,2,3,4,5]" v-bind:key="week">
                <td 
                    v-for="day in [...Array(7).keys()]" 
                    v-bind:key="week*7+day+1"
                    v-text="(week*7+day+1-currentFirstWeekday)>0 &&  (week*7+day+1-currentFirstWeekday)<=currentWeekdayCount? week*7+day-currentFirstWeekday+1 : ''"
                    @click="
                        ()=>{
                            if((week*7+day+1-currentFirstWeekday)>0 &&  (week*7+day+1-currentFirstWeekday)<=currentWeekdayCount)
                            addDate(currentYear+'-'+(currentMonthIndex+1).toString().padStart(2, 0)+'-'+(week*7+day-currentFirstWeekday+1).toString().padStart(2, 0))
                        }"
                    :class="{selected_date:
                            this.selectedDate.includes(currentYear+'-'+(currentMonthIndex+1).toString().padStart(2, 0)+'-'+(week*7+day-currentFirstWeekday+1).toString().padStart(2, 0))
                            ,passed_date:
                            currentYear+'-'+(currentMonthIndex+1).toString().padStart(2, 0)+'-'+(week*7+day-currentFirstWeekday+1).toString().padStart(2, 0)
                            <
                            new Date().getFullYear()+'-'+(new Date().getMonth()+1).toString().padStart(2, 0)+'-'+new Date().getDate().toString().padStart(2, 0)
                        }"
                    >
                </td>
            </tr>
        </table>
        <div class="calendar_nav_btn_center">
            <button class="calendar_nav_button"
                @click="navMonth(1)">
                {{'>'}}
            </button>
        </div>
    </div>
    <br>
    <div id="button_wrapper">
        <button id="continue_button" @click="nextPage()" v-if="this.selectedDate.length!==0">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar-page',
  props:['email'],
  data(){
    return {
        months : ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        currentMonthIndex : new Date().getMonth(),
        currentMonth : ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][new Date().getMonth()],
        currentYear: new Date().getFullYear(),
        currentFirstWeekday:new Date(new Date().getFullYear(),new Date().getMonth(),1).getDay(),
        currentWeekdayCount:new Date(new Date().getFullYear(),new Date().getMonth(),0).getDate(),
        selectedDate:[]
    }
  },
  methods:{
    navMonth(monthNum){
        this.currentMonthIndex+=monthNum
        if(this.currentMonthIndex===-1)this.currentMonthIndex=11
        if(this.currentMonthIndex===12)this.currentMonthIndex=0
        this.currentMonth=this.months[this.currentMonthIndex]
        if(monthNum===-1&&this.currentMonthIndex===11)this.currentYear-=1
        if(monthNum===1&&this.currentMonthIndex===0)this.currentYear+=1
        this.currentFirstWeekday = new Date(this.currentYear,this.currentMonthIndex,1).getDay()
        this.currentWeekdayCount = new Date(this.currentYear,this.currentMonthIndex+1,0).getDate()
    },
    addDate(date){
        if(new Date().getFullYear()+'-'+(new Date().getMonth()+1).toString().padStart(2, 0)+'-'+new Date().getDate().toString().padStart(2, 0)<=date){
            if(this.selectedDate.includes(date)===false){
                this.selectedDate.push(date)
            }else{
                this.selectedDate=this.selectedDate.filter(array_date => array_date!==date)
            }
            console.log(this.selectedDate)
        }
    },
    nextPage(){
        fetch((process.env.VUE_APP_BACKEND_URL+'/create'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            body:JSON.stringify({ //body can only be passed with headers and mode above
                "dates":this.selectedDate
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log(data.id)
            fetch(`${process.env.VUE_APP_BACKEND_URL}/retrieve?id=${data.id}`, {
                method: 'GET'
            }).then((response) => response.json())
            .then((sub_data) => {
                this.$router.push({
                name: 'ScheduleBoard',
                params: {
                    inputPlannerInfo: JSON.stringify({
                    'plannerId':data.id,
                    'timeSlots':sub_data.dates
                    }),
                    email:this.email
                }
            })
            })
        })
    }
  }
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
#calendar_table{
    table-layout: fixed;
    width:500px;
    color: rgb(18, 18, 93);
}
th, td{
    height:30px;
}
th{
    background-color: rgb(215, 215, 65);
}
.selected_date{
    background-color: rgb(18, 18, 93);
    color: rgb(215, 215, 65);
}
.passed_date{
    color: rgb(161, 161, 209);
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
#button_wrapper{
    height: 30px;
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

