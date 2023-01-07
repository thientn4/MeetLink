<template>
  <div class="Edit">
    <br>
    <h4 id="confirmation">Your Meetlink ID is</h4>
    <h4 id="highlight">{{plannerId}}</h4>
    <h4 id="confirmation">We have sent an email with MeetLink ID for your team to</h4>
    <h4 id="highlight">{{email}}</h4>
    <button @click="sendEmail()">Resend</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Edit-page',
  props:['email','plannerId'],
  methods:{
    async sendEmail(){
      if(this.email===undefined || this.plannerId===undefined || this.email==="" || this.plannerId==="")return
      const axios = require("axios");
      axios.request({
        "method": "POST",
        "url": process.env.VUE_APP_SENDGRID_API_EMAIL_SENDER_URL,
        "headers": {
          "content-type": "application/json",
          "x-rapidapi-host": "rapidprod-sendgrid-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.VUE_APP_SENDGRID_API_EMAIL_SENDER_KEY,
          "accept": "application/json",
          "useQueryString": true
        },
        "data": {
          "personalizations": [
            {
              "to": [
                {
                  "email": this.email
                }
              ],
              "subject": "MeetLink ID"
            }
          ],
          "from": {
            "email": "meetlinknotification@gmail.com"
          },
          "content": [
            {
              "type": "text/plain",
              "value": "Hello, this is your MeetLink ID: "+this.plannerId
            }
          ]
        }
      })
    }
  },
  mounted(){
    this.sendEmail()
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
#confirmation{
  color: rgb(18, 18, 93);
}
#highlight{
    color:rgb(13, 106, 228);
    text-decoration: underline;
    -webkit-touch-callout: all; /* iOS Safari */
    -webkit-user-select: all; /* Safari */
     -khtml-user-select: all; /* Konqueror HTML */
       -moz-user-select: all; /* Old versions of Firefox */
        -ms-user-select: all; /* Internet Explorer/Edge */
            user-select: all; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
button{
  width: 70px;
  height: 30px;
  border-radius: 120px;
  font-weight:bold;
  border:none;
  background-color: rgb(215, 215, 65);
  color: rgb(18, 18, 93);
}
</style>

