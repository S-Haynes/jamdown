<template>
  <div class="music-page-container">
    <Sidebar />
    <router-view></router-view>
    <Controller />
  </div>
</template>

<script>
import Controller from '../components/Controller/Controller'
import Sidebar from '../components/Sidebar/Sidebar'
export default {
  components: {
    Controller,
    Sidebar
  }
}
</script>

<style>
  .music-page-container {
    height: 100%;
  }
</style>