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

#app {
  width: 100%;
  height: 100%;
}

 body, html {
   width: 100%;
   height: 100%;
   padding-bottom: 50px;
   overflow-y: hidden;
 }

 li {
   list-style: none;
 }

 img {
   max-width: 100%;
 }

 div, p {
   width: 100%;
 }

   /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: darken($light-gray, 10%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
