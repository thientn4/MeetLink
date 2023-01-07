<template>
  <div class="Email">
    <div>
        <div id="form">
            <input placeholder="Please enter your email" v-model="email">
            <button @click="nextPage()">Submit</button>
        </div>
    </div>
    <div id="alert">
      <h5 v-if="this.showAlert">Invalid email address</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Email-page',
  props:['pageType'],
  data(){
    return {email:"",showAlert:false}
  },
  methods:{
    async nextPage(){
      if(this.email.length===0){
        this.showAlert=true
        return
      }
      // await fetch(process.env.VUE_APP_ABSTRACT_API_EMAIL_VALIDATOR_URL + new URLSearchParams({
      //   api_key: process.env.VUE_APP_ABSTRACT_API_EMAIL_VALIDATOR_KEY,
      //   email: this.email,
      // }))
      //   .then((response)=>response.json())
      //   .then((data) => {
      //     this.showAlert=(data.deliverability==='UNDELIVERABLE')
      //     if(data.deliverability==='DELIVERABLE') {
      //       this.$router.push({
      //           name: this.pageType,
      //           params: {
      //               email:this.email
      //           }
      //       })
      //     }
      //   })
        this.$router.push({
                name: this.pageType,
                params: {
                    email:this.email
                }
            })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.Email > div{
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

