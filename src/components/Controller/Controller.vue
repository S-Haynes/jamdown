<template>
  <div class="jamdown-controller">
    <div class="current-track">
      <div class="current-track-image">
        <img :src="songData.album_image">
      </div>
     <div class="current-track-text">
        <div class="current-track-track">{{songData.track_name}}</div>
        <div class="current-track-artist">{{songData.artist_name}}</div>
      </div>
    </div>
    <div class="controller -middle">
      <div class="controller-buttons">
        <button class="-step-btn" @click.prevent="PLAY_PREVIOUS_SONG"><font-awesome-icon icon="fast-backward"/></button>
        <button class="-pause" v-if="playing" @click.prevent="PAUSE_CURRENT_SONG">
          <font-awesome-icon icon="pause"/>
        </button>
        <button class="-play" v-else @click.prevent="PLAY_CURRENT_SONG"> 
          <font-awesome-icon icon="play"/>
        </button>
        <button class="-step-btn" @click.prevent="PLAY_NEXT_SONG"><font-awesome-icon icon="fast-forward"/></button>
      </div>
      <div class="controller-progress-bar">
        
        <span class="controller-progress-bar-start" v-if="currentTimestamp" >{{currentTimestamp | minutes }}</span>
        <span class="controller-progress-bar-start" v-else>0:00</span>
        <button class="progress-bar">
          <div class="progress-bar-line" :style="{width: currentTimestamp ? progressWidth + '%' : '0%', position: 'absolute', top: '0', left: '0'}"></div>
        </button>
        <span class="controller-progress-bar-end" v-if="Object.keys(songData).length">{{songData.duration | minutes}}</span>
        <span class="controller-progress-bar-end" v-else>0:00</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentTimestamp: null
    }
  },
  computed: {
    playing() {
      return this.currentlyPlaying();
    },
    duration() {
      return this.audio().duration;
    },
    progressWidth() {
      return (this.currentTimestamp / this.audioData.duration) * 100
    },
    audioData() {
      return this.audio();
    },
    songData() {
      return this.song();
    },
    getCurrentTime() {
      return this.currentTime();
    },
    getMaxTime() {
      return this.maxTime();
    }
  },
  methods: {
    ...mapActions(["PLAY_NEXT_SONG", "PLAY_PREVIOUS_SONG", "PLAY_CURRENT_SONG", "PAUSE_CURRENT_SONG"]),
    ...mapGetters(["currentlyPlaying", 'audio', 'song', 'currentTime', 'maxTime'])
  },
  watch: {
    getCurrentTime: function (time) {
     this.currentTimestamp = time;
    }
  },
  filters: {
    minutes: function(time) {
      let convertedTime = Math.floor(time);
      let minutes = Math.floor(convertedTime / 60);
      let seconds = convertedTime % 60;
      if(seconds < 10 && seconds >= 1){
        seconds = "0" + seconds
      } else if(seconds <= 0) {
        seconds = "00"
      }

      if(minutes <= 0) {
        minutes = "0";
      }

      return minutes + ":" + seconds;
    }
  }
}
</script>

<style scoped lang="scss">
  .jamdown-controller {
    position: fixed;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: rgb(23, 23, 23);
    padding: 20px;
    box-shadow: -120px -50px 130px 130px rgba(0, 0, 0, 0.9);

    .-middle {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(50% - 20px);
      @media (min-width: 1000px) {
        width: calc(100% / 3);
      }

    }

    button {
      position: relative;
      background-color: transparent;
      outline: none;
      border: none;
      color: #B3B3B3;
      margin: 0 10px;

      &.-play,
      &.-pause {
        width: 38px;
        height: 38px;
        min-width: 38px;
        line-height: 20px;
        border: 1.5px solid #B3B3B3;
        border-radius: 50%;
        font-size: 16px;
        transition: color 0.3s ease-in-out, border 0.3s ease-in-out;

        &:hover {
          color: lightpink;
          border: 1.5px solid lightpink;
        }

        &.-play {
          svg {
            position: relative;
            top: 1px;
            left: 1px;
          }
        }
      }

      &.-step-btn {
        width: 32px;
        height: 32px;
        min-width: 42px;
        font-size: 18px;
        transition: color 0.3s ease-in-out;

        &:hover {
          color: lightpink;
        }
      }
    }

    .controller-progress-bar {
      width: 100%;
      padding-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #B3B3B3;
      }

      .progress-bar {
        width: 75%;
        height: 4px;
        background-color: #B3B3B3;
        position: relative;
        overflow: hidden;
      }

      .progress-bar-line {
        width: 0;
        background-color: $pink;
        height: 4px;
      }
    }

    .controller-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .current-track {
      position: relative;
      top: -5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: calc(50% - 20px);
      margin-right: 20px;
      @media (min-width: 1000px) {
        width: calc(100% / 3);
        margin-right: 100px;
      }

      @media (min-width: 1300px) {
        margin-right: 0px;
      }


      &-image {
        min-width: 75px;
        min-height: 75px;
        max-width: 75px;
        max-height: 75px;
        margin-right: 20px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      &-text {
        width: auto;
      }

      &-artist {
        color: darken($gray, 20%);
      }

      &-track {
        color: $pink;
        margin-bottom: 10px;
      }

      &-spacer {
        font-size: 16px;
        margin: 0 5px;
        color: darken($gray, 20%);
      }
    }
  }
</style>