<template>
  <div class="Edit">
    <div>
        <div id="form">
            <input placeholder="Please enter your Meetlink ID" v-model="plannerId">
            <button @click="nextPage()">Submit</button>
        </div>
    </div>
    <div id="alert">
      <h5 v-if="this.showAlert">Invalid Meetlink ID</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Edit-page',
  props:['email'],
  data(){
    return {plannerId:"",showAlert:false}
  },
  methods:{
    validatePlannerId(inputPlannerId){
      return new Promise(resolve => {
        fetch(`${process.env.VUE_APP_BACKEND_URL}/retrieve?id=${inputPlannerId}`, {
          method: 'GET'
        }).then((response) => response.json())
        .then((data) => {
          this.showAlert=(data.dates.length==0)
          resolve({
            'status':!this.showAlert,
            'dates':data.dates
          })
        })
      });
    },
    nextPage(){
      this.validatePlannerId(this.plannerId).then((result)=>{
        if(result.status){
          // alert(JSON.stringify({
          //   'plannerID':this.plannerId,
          //   'timeSlots':result.dates
          // },null,2))
          this.$router.push({
              name: 'ScheduleBoard',
              params: {
                inputPlannerInfo: JSON.stringify({
                  'plannerId':this.plannerId,
                  'timeSlots':result.dates
                }),
                email:this.email
              }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.Edit > div{
    display:flex;
    flex-direction: row;
    justify-content: center;
}
#form{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width:300px;
}
button{
  width: 70px;
  height: 30px;
  border-radius: 120px;
  font-weight:bold;
  border:none;
  background-color: rgb(18, 18, 93);
  color: rgb(215, 215, 65);
}
input{
  width: 200px;
  height: 25px;
  border-radius: 120px;
  border-color: rgb(18, 18, 93);
  padding-left: 10px;
}
#alert{
  color:rgb(219, 18, 18);
  height:10px;
}
</style>

