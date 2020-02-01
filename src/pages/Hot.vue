<template>
    <MusicList name="Hot Playlist"/>
</template>

<script>
import MusicList from '../components/Music/MusicList/MusicList'
import { mapActions } from 'vuex'
export default {
  components: {
    MusicList
  },
  methods: {
    ...mapActions(["GET_MUSIC_HOT"])
  }, 
  created() {
    this.GET_MUSIC_HOT();
  }
}
</script>

<style>

</style>