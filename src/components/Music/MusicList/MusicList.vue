<template>
  <div class="music-container">
    <div class="loading-wrapper" v-if="checkLoading">
        <!-- <div class="loader"></div> -->
      <div class="pulse"></div>
    </div>
    <div class="wrapper" v-else >
    <div class="playlist-info">
      <div class="playlist-info-image" ref="playlistImage" :style="{height: innerWidth > 1300 ? '300px' : auto}">
        <progressive-img :src="posterTrack.album_image" :placeholder="temp_image" :blur="5" fallback="../../../assets/temp_music.jpg" @onLoad="onLoad"/>
      </div>
      <div class="playlist-info-title">
        <h2>{{name}}</h2>
      </div>
      <div class="play-btn">
        <button class="btn" @click="PLAY_SONG(0)">Play</button>
      </div>
    </div>
    <ul>
      <li class="track" v-for="(track, i) in getMusic" :data-index="i" @click="PLAY_SONG(i)" :key="track.id" :class="index === i && queue[index].track_name === track.track_name ? 'active' : null" >
        <div class="track-title">{{ track.track_name }}</div>
        <div class="track-info">
          <span class="track-artist">{{track.artist_name}}</span>
          <span class="track-spacer">&#183;</span>
          <span class="track-album">{{track.album_name}}</span>
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters } from 'vuex'

export default {

  props: ["name"],
  computed: {
    getMusic () {
      return this.pageMusicData();
    },
    posterTrack() {
      return this.pageMusicData()[0];
    },
    checkLoading() {
      return this.loading();
    },
    index() {
      return this.songIndex();
    },
    queue() {
      return this.songQueue();
    },
    innerWidth() {
      return window.innerWidth;
    }
    
  },
  methods: {
      ...mapActions(['PLAY_SONG']),
      ...mapGetters(['pageMusicData', 'loading', 'songIndex', 'songQueue']),
      onLoad () {
        this.$refs.playlistImage.style.height = 'auto';
      }
  },
  data() {
    return {
      temp_image: require('@/assets/temp_music.jpg')
    }
  }
}

</script>

<style lang="scss" scoped>

.music-container {
  padding-top: 100px;
  padding-left: 300px;
  height: 100% !important;
  background: linear-gradient(to bottom, darken(#696970, 25%) 10%, #111 70%);
}

.wrapper {
  display: flex;
  justify-content: space-between;
}

.loading-wrapper {
  width: 100%;
  height: 100%;
}

.playlist-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(30% - 20px);

  &-image {
    margin-bottom: 20px;
    max-width: 300px;
    max-height: 300px;
    width: 100%;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    margin-bottom: 30px;
    color: #ffffff;
    font-family: $sans !important;
    font-weight: $bold;
    text-align: center;
  }

  .play-btn {
    text-align: center;
  }
}

ul {
  overflow: scroll;
  height: 1000px;
  padding-bottom: 100px;
  width: calc(70% - 40px);
  padding-bottom: 500px;
  padding-right: 50px;
}

.track {
  padding: 15px 10px;
  transition: background-color 0.2s ease-in-out;

  &.active {
    background-color: rgba($gray, 0.05);

    .track-title {
      color: $pink;
    }
  }

  &:hover {
    background-color: rgba($gray, 0.05);
  }

  &:first-child {
    margin-top: 0;
  }

  &-title {
    color: #fff;
    margin-bottom: 10px;
  }

  &-artist,
  &-album {
    color: darken($gray, 20%);
  }

  &-spacer {
    font-size: 16px;
    margin: 0 5px;
    color: darken($gray, 20%);
  }
}
</style>