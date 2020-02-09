// import { SET_PAGE_QUEUE, SET_SONG_QUEUE, SET_MUSIC_DATA, SET_PAGE_MUSIC_DATA, SET_SONG_DURATION, SET_SONG_PAUSED, SET_NEW_SONG_PLAYING, PLAY_NEXT_SONG, UPDATE_SONG_TIMER, PLAY_PREVIOUS_SONG, SET_MAX_DURATION, SET_SONG, SET_LOADING, SET_PAGE_TO_MUSIC_DATA } from "../types"
import { SET_LOADING, SET_PAGE_DATA, PLAY_SONG, SET_MUSIC_DATA, SET_AUDIO, SET_SONG, SET_CURRENTLY_PLAYING, PLAY, PAUSE } from '../types';
import axios from 'axios'

const state = {
  musicData: [],
  pageMusicData: [],
  musicQueue: [],
  currentlyPlaying: false,
  loading: false,
  song: {},
  audio: new Audio
}

const getters = {
  pageMusicData: (state) => {
    return state.pageMusicData
  },
  loading: (state) => {
    return state.loading
  },
  song: (state) => {
    return state.song
  },
  currentlyPlaying: (state) => {
    return state.currentlyPlaying
  },
  compareMusicList: (state) => {
    return state.musicData[0].id === state.pageMusicData[0].id
  }
}

const mutations = {
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  },
  SET_PAGE_DATA: (state, payload) => {
    state.pageMusicData = payload;
  },
  SET_MUSIC_DATA: (state, payload) => {
    state.musicData = payload;
  },
  SET_AUDIO: (state, payload) => {
    state.song = payload;
    state.audio.src = payload.audio;
    state.audio.play();
  },
  SET_NEXT_AUDIO: (state, payload) => {
    state.audio.src = payload.audio;
    state.audio.play();
  },
  SET_CURRENTLY_PLAYING: (state, payload) => {
    state.currentlyPlaying = payload;
  },
  PAUSE: (state) => {
    if(state.audio.src) {
      state.audio.pause();
      state.currentlyPlaying = false;
    }
  },
  PLAY: (state) => {
    if(Object.keys(state.song).length > 0 && state.musicData[0].id === state.pageMusicData[0].id) {
      state.audio.play();
      state.currentlyPlaying = true;
    } else {
      state.musicData = state.pageMusicData;
      state.song = state.musicData[0];
      state.audio.src = state.musicData[0].audio
      state.audio.play();
      state.currentlyPlaying = true;
    }
  }
}

const actions = {
  GET_MUSIC_DISCOVER ({commit}) {
    commit(SET_LOADING, true)
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&limit=30&include=musicinfo&groupby=artist_id&imagesize=300`)
    .then(res => {

      let modifiedData = res.data.results.map(result => {
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
      commit(SET_PAGE_DATA, modifiedData);
      commit(SET_LOADING, false)
    })
  },
  GET_MUSIC_HOT ({commit}) {
    commit(SET_LOADING, true)
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&fuzzytags=hiphop&limit=30&include=musicinfo&groupby=artist_id&imagesize=300`)
    .then(res => {
      let modifiedData = res.data.results.map(result => {

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
      commit(SET_PAGE_DATA, modifiedData);
      commit(SET_LOADING, false)
    })
  },
  PLAY_SONG ({commit}, id) {
    commit(SET_MUSIC_DATA, state.pageMusicData);
    const song = state.pageMusicData.filter(song => id === song.id)[0];
    commit(SET_AUDIO, song);
    commit(SET_CURRENTLY_PLAYING, true)
  },
  PLAY_NEXT_SONG ({commit}) {
    const currentSongIndex = state.musicData.findIndex(song => song.id === state.song.id)
    const nextSong = state.musicData[currentSongIndex + 1];
    commit(SET_AUDIO, nextSong);
    commit(SET_CURRENTLY_PLAYING, true)
  },
  PLAY_PREVIOUS_SONG({commit}) {
    const currentSongIndex = state.musicData.findIndex(song => song.id === state.song.id)
    const previousSong = state.musicData[currentSongIndex - 1];
    commit(SET_AUDIO, previousSong);
    commit(SET_CURRENTLY_PLAYING, true)
  },
  PLAY_CURRENT_SONG({commit}) {
    commit(PLAY);
  },
  PAUSE_CURRENT_SONG({commit}) {
    commit(PAUSE);
  }
}

export default {
  state,
  mutations, 
  actions,
  getters
}