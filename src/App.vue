<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    isLogin() {
      const username = Cookies.get("username")
      if (username == null || username === '') {
        return false;
      }
      else {
        return true
      }
    }
  }
}
</script>

<style>
@import url(./assets/iconfont/material-icons.css);

  /*#app {*/
  /*!*font-family: 'Avenir', Helvetica, Arial, sans-serif;*!*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*!*text-align: center;*!*/
  /*!*color: #2c3e50;*!*/
/*}*/

</style>
