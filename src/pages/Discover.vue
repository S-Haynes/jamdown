<template>
  <div>
    <MusicList />
  </div>
</template>

<script>
import MusicList from '../components/Music/MusicList/MusicList'
import { mapActions } from 'vuex'
export default {
  components: {
    MusicList
  },
  methods: {
    ...mapActions(["GET_MUSIC_DISCOVER"])
  }, 
  created() {
    this.GET_MUSIC_DISCOVER();
  }
}
</script>

<style>

</style>