<template>
  <div class="jamdown-controller">
    <div class="controller -middle">
      <div class="controller-buttons">
        <button class="-step-btn" @click.prevent="PLAY_PREVIOUS_SONG"><font-awesome-icon icon="fast-backward"/></button>
        <button v-if="playing" @click.prevent="PAUSE_SONG(getSongIndex)" class="-pause">
          <font-awesome-icon icon="pause"/>
        </button>
        <button v-else @click.prevent="PLAY_SONG(getSongIndex)" class="-play"> 
          <font-awesome-icon icon="play"/>
        </button>
        <button class="-step-btn" @click.prevent="PLAY_NEXT_SONG"><font-awesome-icon icon="fast-forward"/></button>
      </div>
      <div class="controller-progress-bar">
        
        <span class="controller-progress-bar-start" v-if="getDuration">{{getDuration}}</span>
        <span class="controller-progress-bar-start" v-else>0:00</span>
        <button class="progress-bar">
          <div :style="{width: currentTime + '%', height: '4px', backgroundColor: 'lightpink', position: 'absolute', top: '0', left: '0'}"></div>
        </button>
        <span class="controller-progress-bar-end" v-if="getMaxDuration">{{getMaxDuration}}</span>
        <span class="controller-progress-bar-end" v-else>0:00</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    playing() {
      return this.currentlyPlaying();
    },
    getSongIndex() {
      if(this.songIndex() === null) {
        return "0"
      } else {
        return this.songIndex()
      }
    },
    getDuration() {
      return this.trackDuration();
    },
    getMaxDuration() {
      let convertedTime = Math.floor(this.maxDuration() / 1000);
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
    },
    currentTime() {
      return (this.currentTimestamp() / this.maxDuration()) * 100
    }
  },
  methods: {
    ...mapActions(["PLAY_SONG", "PAUSE_SONG", "PLAY_NEXT_SONG", "PLAY_PREVIOUS_SONG"]),
    ...mapGetters(["currentlyPlaying", "songIndex", "trackDuration", "maxDuration", "currentTimestamp"])
  }
}
</script>

<style scoped lang="scss">
  .jamdown-controller {
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    height: 100px;
    width: 100%;
    background: #333;
    padding: 20px;

    .-middle {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: calc(100% / 3);
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
    }

    .controller-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>