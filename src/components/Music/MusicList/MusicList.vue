<template>
  <div class="music-container">
    <ul>
      <li v-for="(track, i) in getMusic" :data-index="i" @click="PLAY_SONG(i)" :key="track.id">
        {{ track.track_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    getMusic () {
      return this.musicData();
    },
    getDuration () {
      return this.trackDuration();
    }
  },
  methods: {
      ...mapActions(['GET_MUSIC', 'PLAY_SONG']),
      ...mapGetters(['musicData', 'trackDuration']),
  }
}

</script>

<style lang="scss" scoped>

.music-container {
  padding-left: 250px;
  height: 100%;
}

ul {
  overflow: scroll;
  height: 1000px;
  padding-bottom: 100px;
}

li {
  padding: 20px;
  margin: 20px 0;
  background: rgba(0, 0, 0, 0.2);
}
</style>