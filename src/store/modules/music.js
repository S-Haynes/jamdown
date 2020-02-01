import { SET_PAGE_QUEUE, SET_SONG_QUEUE, SET_MUSIC_DATA, SET_PAGE_MUSIC_DATA, SET_SONG_DURATION, SET_SONG_PLAYING, SET_SONG_PAUSED, SET_NEW_SONG_PLAYING, PLAY_NEXT_SONG, UPDATE_SONG_TIMER, PLAY_PREVIOUS_SONG, SET_MAX_DURATION, SET_SONG, SET_LOADING, SET_PAGE_TO_MUSIC_DATA } from "../types"
import axios from 'axios'

const state = {
  musicData: [],
  pageMusicData: [],
  currentlyPlaying: false,
  currentSongIndex: null,
  songInterval: null,
  songDuration: null,
  durationInSecs: null,
  maxDuration: null,
  currentTimestamp: 0,
  songQueue: [],
  pageQueue: [],
  currentSongName: null,
  song: {},
  loading: false
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
  pageMusicData: state => {
    return state.pageMusicData;
  },
  songQueue: state => {
    return state.songQueue;
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
  },
  loading: state => {
    return state.loading
  },
  songData: state => {
    return state.song
  }
}

const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_SONG_QUEUE (state, payload) {
    state.songQueue = payload;
  },
  SET_PAGE_QUEUE (state, payload) {
      state.pageQueue = payload;
  },
  SET_MUSIC_DATA (state, payload) {
    state.musicData = payload;
  },
  SET_PAGE_MUSIC_DATA (state, payload) {
    state.pageMusicData = payload;
  },
  SET_SONG_DURATION (state, index) {
    const songDuration = (parseInt(state.songQueue[index].duration) * 1000) - (parseInt(state.songQueue[index].currentTime) * 1000);
    state.songDuration = songDuration;
  },
  SET_MAX_DURATION (state, index) {
    const maxDuration = (parseInt(state.songQueue[index].duration) * 1000)
    state.maxDuration = maxDuration
  },
  SET_SONG_PLAYING (state, index) {
    state.currentlyPlaying = true;
    state.songQueue[index].play();
    state.currentSongIndex = index;
    state.currentSongName = state.songQueue[state.currentSongIndex].track_name
    clearInterval(state.songInterval);
  },
  SET_SONG_PAUSED (state, index) {
    clearInterval(state.songInterval);
    state.songInterval = null;
    state.songQueue[index].pause();
    state.currentlyPlaying = false;
  },
  SET_NEW_SONG_PLAYING (state, index) {
    state.songQueue[state.currentSongIndex].pause();
    state.songQueue[state.currentSongIndex].currentTime = 0;
    clearInterval(state.songInterval);
    state.currentSongIndex = index;
    state.currentTimestamp = 0;
    state.currentSongName = state.songQueue[state.currentSongIndex].track_name
    state.songDuration = state.songQueue[index].duration * 1000;
    state.songQueue[index].play();
    state.currentlyPlaying = true;
  },
  PLAY_NEXT_SONG (state) {

    if(parseInt(state.currentSongIndex) >= parseInt(state.songQueue.length) - 1) {

      if(state.songQueue[0].readyState !== 4){
        return
      }

      state.songQueue[state.currentSongIndex].pause();
      state.songQueue[state.currentSongIndex].currentTime = 0;
      state.currentSongIndex = 0;
      state.songDuration = (state.songQueue[parseInt(state.currentSongIndex)].duration * 1000) - (state.songQueue[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.maxDuration = state.songQueue[parseInt(state.currentSongIndex)].duration * 1000
      state.currentTimestamp = 0;
      state.songQueue[parseInt(state.currentSongIndex)].play();
      state.currentSongName = state.songQueue[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    } else {
      if(state.songQueue[parseInt(state.currentSongIndex) + 1].readyState !== 4){
        return
      }
      
      state.songQueue[state.currentSongIndex].pause();
      state.songQueue[state.currentSongIndex].currentTime = 0;
      state.songDuration = (state.songQueue[parseInt(state.currentSongIndex) + 1].duration * 1000) - (state.songQueue[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.maxDuration = state.songQueue[parseInt(state.currentSongIndex) + 1].duration * 1000
      state.songQueue[parseInt(state.currentSongIndex) + 1].play();
      state.currentSongIndex = parseInt(state.currentSongIndex) + 1;
      state.currentSongName = state.songQueue[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    }
  },
  PLAY_PREVIOUS_SONG (state) {

    if(parseInt(state.currentSongIndex) <= 0) {

      if(state.songQueue[0].readyState !== 4){
        return
      }

      state.songQueue[state.currentSongIndex].pause();
      state.songQueue[state.currentSongIndex].currentTime = 0;
      state.currentSongIndex = 0
      state.songDuration = (state.songQueue[parseInt(state.currentSongIndex)].duration * 1000) - (state.songQueue[parseInt(state.currentSongIndex) + 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.songQueue[parseInt(state.currentSongIndex)].play();
      state.currentSongName = state.songQueue[parseInt(state.currentSongIndex)].track_name;
      state.currentlyPlaying = true;
    } else {

      if(state.songQueue[parseInt(state.currentSongIndex) - 1].readyState !== 4){
        return
      }

      state.songQueue[state.currentSongIndex].pause();
      state.songQueue[state.currentSongIndex].currentTime = 0;
      state.songDuration = (state.songQueue[parseInt(state.currentSongIndex) - 1].duration * 1000) - (state.songQueue[parseInt(state.currentSongIndex) - 1].currentTime * 1000)
      state.currentTimestamp = 0;
      state.songQueue[parseInt(state.currentSongIndex) - 1].play();
      state.currentSongIndex = parseInt(state.currentSongIndex) - 1;
      state.currentSongName = state.songQueue[parseInt(state.currentSongIndex)].track_name;
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
  },
  SET_PAGE_TO_MUSIC_DATA: (state, payload) => {
    state.musicData = payload;
  }
}

const actions = {
  GET_MUSIC_DISCOVER ({commit}) {
    commit(SET_LOADING, true)
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&limit=30&include=musicinfo&groupby=artist_id`)
    .then(res => {
      let songQueue = [];
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
        songQueue.push(audio);
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
      commit(SET_PAGE_MUSIC_DATA, modifiedData);
      commit(SET_PAGE_QUEUE, songQueue);
      commit(SET_LOADING, false)
    })
  },
  GET_MUSIC_HOT ({commit}) {
    commit(SET_LOADING, true)
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&fuzzytags=hiphop&limit=30&include=musicinfo&groupby=artist_id`)
    .then(res => {
      let songQueue = [];
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
        songQueue.push(audio);
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
      commit(SET_PAGE_MUSIC_DATA, modifiedData);
      commit(SET_PAGE_QUEUE, songQueue);
      commit(SET_LOADING, false)
    })
  },
  PLAY_SONG ({commit}, index) {
    commit(SET_PAGE_TO_MUSIC_DATA, state.pageMusicData);
    if(state.currentlyPlaying){
      clearInterval(state.songInterval);
      state.songInterval = null;
      state.songQueue[state.currentSongIndex].pause();
      commit(SET_SONG_QUEUE, []);
      commit(SET_SONG_QUEUE, state.pageQueue);
    } else {
      commit(SET_SONG_QUEUE, []);
      commit(SET_SONG_QUEUE, state.pageQueue);
    }

    if(state.songQueue[index].readyState !== 4 || state.songQueue.length === 0) {
      return;
    }

    if(!state.currentlyPlaying){
      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)
      commit(SET_SONG_PLAYING, index)
      commit(SET_SONG_DURATION, index)
      commit(UPDATE_SONG_TIMER)
      console.log('wasnt playing')

    } else if (state.currentlyPlaying && (parseInt(index) === parseInt(state.currentSongIndex)) && state.songQueue[state.currentSongIndex].currentTime !== 0) {

      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)  
      commit(SET_SONG_DURATION, index)
      commit(SET_SONG_PAUSED, index)
      console.log('paused')

    } else if(state.currentlyPlaying && (parseInt(index) === parseInt(state.currentSongIndex)) && state.songQueue[state.currentSongIndex].currentTime === 0) {
      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)
      commit(SET_SONG_DURATION, index)
      commit(SET_NEW_SONG_PLAYING, index)
      commit(UPDATE_SONG_TIMER)
      console.log('new song')
    } else if (state.currentlyPlaying && (parseInt(index) !== parseInt(state.currentSongIndex))) {

      commit(SET_SONG, index)
      commit(SET_MAX_DURATION, index)
      commit(SET_SONG_DURATION, index)
      commit(SET_NEW_SONG_PLAYING, index)
      commit(UPDATE_SONG_TIMER)
      console.log('new song')
    }
  },
  PLAY_SONG_CONTROLLER ({commit}, index) {

    if(state.songQueue[index].readyState !== 4 || state.songQueue.length === 0) {
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