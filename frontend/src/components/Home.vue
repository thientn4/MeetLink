<template>
  <div class="Home">
    <div>
        <button id="create_btn"  @click="nextPage('Calendar')">Create planner</button>
    </div>
    <div>
        <button id="edit_btn"  @click="nextPage('Edit')">Edit planner</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home-page',
  methods:{
    async nextPage(type){
      this.$router.push({
          name: 'Email',
          params: {
            pageType:type
          }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.Home{
  display:"flex";
  flex-direction: column;
  column-gap: 500px;
}
.Home > div{
  height:40px;
}

button{
  width: 120px;
  height: 30px;
  border-radius: 120px;
  font-weight:bold;
  border:none;
}
#create_btn{
  background-color: rgb(215, 215, 65);
  color: rgb(18, 18, 93);
  
}
#edit_btn{
  background-color: rgb(18, 18, 93);
  color: rgb(215, 215, 65);
}
</style>

