<template>
  <div class="copy_disable">
    <a href="/">
      <h1 id="meet_title">Meet<span id="link_title">Link</span></h1>
    </a>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
  </script>


<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  height:90vh;
}
#meet_title{
  color: rgb(18, 18, 93);
}
#link_title{
  color: rgb(215, 215, 65);
}
a{
  text-decoration: none;
}
.copy_disable{
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

/*
  1.  Calendar page create new planner with new plannerID from selected date
      Edit page validate plannerID
  3.  ScheduleBoard page retrieve date from plannerID and email to start editting

*/
</style>

