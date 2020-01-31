import { SET_SONGLIST, SET_MUSIC_DATA, SET_SONG_DURATION, SET_SONG_PLAYING, SET_SONG_PAUSED, SET_NEW_SONG_PLAYING, PLAY_NEXT_SONG, UPDATE_SONG_TIMER, PLAY_PREVIOUS_SONG, SET_MAX_DURATION, SET_SONG } from "../types"
import axios from 'axios'

const state = {
  musicData: [],
  currentlyPlaying: false,
  currentSongIndex: null,
  songInterval: null,
  songDuration: null,
  durationInSecs: null,
  maxDuration: null,
  currentTimestamp: 0,
  songList: [],
  currentSongName: null,
  song: {}
}

const getters = {
  trackName: state => {
    return state.currentSongName;
  },
  trackDuration: state => {
    return state.durationInSecs;
  },
  musicData: state => {
    return state.musicData;
  },
  songList: state => {
    return state.songList;
  },
  currentlyPlaying: state => {
    return state.currentlyPlaying
  },
  songIndex: state => {
    return state.currentSongIndex
  },
  maxDuration: state => {
    return state.maxDuration
  },
  currentTimestamp: state => {
    return state.currentTimestamp
  }
}

const mutations = {
  SET_SONGLIST (state, payload) {
    if(state.songList.length === 0){
      state.songList = payload;
    }
  },
  SET_MUSIC_DATA (state, payload) {
    state.musicData = payload;
  },
  SET_SONG_DURATION (state, index) {
    const songDuration = (parseInt(state.songList[index].duration) * 1000) - (parseInt(state.songList[index].currentTime) * 1000);
    state.songDuration = songDuration;
  },
  SET_MAX_DURATION (state, index) {
    const maxDuration = (parseInt(state.songList[index].duration) * 1000)
    state.maxDuration = maxDuration
  },
  SET_SONG_PLAYING (state, index) {
    state.currentlyPlaying = true;
    state.songList[index].play();
    state.currentSongIndex = index;
    state.currentSongName = state.songList[state.currentSongIndex].track_name
    clearInterval(state.songInterval);
  },
  SET_SONG_PAUSED (state, index) {
    clearInterval(state.songInterval);
    state.songInterval = null;
    state.songList[index].pause();
    state.currentlyPlaying = false;
  },
  SET_NEW_SONG_PLAYING (state, index) {
    state.songList[state.currentSongIndex].pause();
    state.songList[state.currentSongIndex].currentTime = 0;
    clearInterval(state.songInterval);
    state.currentSongIndex = index;
    state.currentTimestamp = 0;
    state.currentSongName = state.songList[state.currentSongIndex].track_name
    state.songDuration = state.songList[index].duration * 1000;
    state.songList[index].play();
  },
  PLAY_NEXT_SONG (state) {

    if(parseInt(state.currentSongIndex) >= parseInt(state.songList.length) - 1) {

      if(state.songList[0].readyState !== 4){
        return
      }

      state.songList[state.currentSongIndex].pause();
      state.songList[state.currentSongIndex].currentTime = 0;
      state.currentSongIndex = 0;
      state.songDuration = (state.songList[parseInt(state.currentSongIndex)].duration * 1000) - (state.songList[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.maxDuration = state.songList[parseInt(state.currentSongIndex)].duration * 1000
      state.currentTimestamp = 0;
      state.songList[parseInt(state.currentSongIndex)].play();
      state.currentSongName = state.songList[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    } else {
      if(state.songList[parseInt(state.currentSongIndex) + 1].readyState !== 4){
        return
      }
      
      state.songList[state.currentSongIndex].pause();
      state.songList[state.currentSongIndex].currentTime = 0;
      state.songDuration = (state.songList[parseInt(state.currentSongIndex) + 1].duration * 1000) - (state.songList[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.maxDuration = state.songList[parseInt(state.currentSongIndex) + 1].duration * 1000
      state.songList[parseInt(state.currentSongIndex) + 1].play();
      state.currentSongIndex = parseInt(state.currentSongIndex) + 1;
      state.currentSongName = state.songList[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    }
  },
  PLAY_PREVIOUS_SONG (state) {

    if(parseInt(state.currentSongIndex) <= 0) {

      if(state.songList[0].readyState !== 4){
        return
      }

      state.songList[state.currentSongIndex].pause();
      state.songList[state.currentSongIndex].currentTime = 0;
      state.currentSongIndex = 0
      state.songDuration = (state.songList[parseInt(state.currentSongIndex)].duration * 1000) - (state.songList[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.songList[parseInt(state.currentSongIndex)].play();
      state.currentSongName = state.songList[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    } else {

      if(state.songList[parseInt(state.currentSongIndex) - 1].readyState !== 4){
        return
      }

      state.songList[state.currentSongIndex].pause();
      state.songList[state.currentSongIndex].currentTime = 0;
      state.songDuration = (state.songList[parseInt(state.currentSongIndex) - 1].duration * 1000) - (state.songList[parseInt(state.currentSongIndex) - 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.songList[parseInt(state.currentSongIndex) - 1].play();
      state.currentSongIndex = parseInt(state.currentSongIndex) - 1;
      state.currentSongName = state.songList[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    }
  },
  UPDATE_SONG_TIMER (state) {
    clearInterval(state.songInterval);
    state.songInterval = setInterval(() => { 
      state.songDuration -= 1000
      state.currentTimestamp += 1000;
      let convertedTime = Math.floor(state.currentTimestamp / 1000);
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

      state.durationInSecs = minutes + ":" + seconds;
    }, 1000);
  },
  SET_SONG: (state, index) => {
    state.song = state.musicData[index];
  }

}

const actions = {
  GET_MUSIC_DISCOVER ({commit}) {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&limit=30&include=musicinfo&groupby=artist_id`)
    .then(res => {
      let songList = [];
      let modifiedData = res.data.results.map(result => {

        const audio = new Audio(result.audio);
        audio.track_name = result.name;
        audio.artist_name = result.artist_name;
        audio.album_name = result.album_name;
        audio.album_id = result.album_id;
        audio.album_image = result.album_image;

        audio.addEventListener('ended', () => {
          if(state.currentlyPlaying) {
            commit(PLAY_NEXT_SONG)
            commit(SET_SONG, state.currentSongIndex)
          }
        })
        songList.push(audio);
        return { 
          id: result.id,
          track_name: result.name,
          duration: result.duration,
          artist_name: result.artist_name,
          album_name: result.album_name,
          album_id: result.album_id,
          album_image: result.album_image,
          track_image: result.track_image,
          audio: result.audio
        }
      })
      commit(SET_MUSIC_DATA, modifiedData);
      commit(SET_SONGLIST, songList)
    })
  },
  PLAY_SONG ({commit}, index) {

    if(state.songList[index].readyState !== 4 || state.songList.length === 0) {
      return;
    }

    if(!state.currentlyPlaying){
      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)
      commit(SET_SONG_PLAYING, index)
      commit(SET_SONG_DURATION, index)
      commit(UPDATE_SONG_TIMER)

    } else if (state.currentlyPlaying && (parseInt(index) === parseInt(state.currentSongIndex))) {

      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)  
      commit(SET_SONG_DURATION, index)
      commit(SET_SONG_PAUSED, index)


    } else if (state.currentlyPlaying && (parseInt(index) !== parseInt(state.currentSongIndex))) {

      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)
      commit(SET_SONG_DURATION, index)
      commit(SET_NEW_SONG_PLAYING, index)
      commit(UPDATE_SONG_TIMER)
    }
  },
  PAUSE_SONG ({commit}, index) {
    commit(SET_SONG_PAUSED, index);
  },
  PLAY_NEXT_SONG ({commit}) {
    if(!state.currentlyPlaying) {
      return
    }

    commit(PLAY_NEXT_SONG);
    commit(UPDATE_SONG_TIMER);
    commit(SET_SONG, state.currentSongIndex)
    commit(SET_MAX_DURATION, state.currentSongIndex)
    commit(SET_SONG_DURATION, state.currentSongIndex)
  },
  PLAY_PREVIOUS_SONG ({commit}) {
    if(!state.currentlyPlaying) {
      return
    }

    commit(PLAY_PREVIOUS_SONG);
    commit(UPDATE_SONG_TIMER)
    commit(SET_SONG, state.currentSongIndex)
    commit(SET_MAX_DURATION, state.currentSongIndex)
    commit(SET_SONG_DURATION, state.currentSongIndex)
  }
}

export default {
  state,
  mutations, 
  actions,
  getters
}