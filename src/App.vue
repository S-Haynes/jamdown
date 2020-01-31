<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">

 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
   font-family: $main-font;
 }

 body, html {
   padding-bottom: 50px;
   overflow-y: hidden;
 }

 li {
   list-style: none;
 }

 img {
   max-width: 100%;
 }
</style>
