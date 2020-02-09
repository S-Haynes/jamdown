import { SET_LOADING, SET_PAGE_DATA, PLAY_SONG, SET_MUSIC_DATA, SET_AUDIO, SET_SONG, SET_CURRENTLY_PLAYING, PLAY, PAUSE } from '../types';
import axios from 'axios'

const state = {
  musicData: [],
  pageMusicData: [],
  musicQueue: [],
  currentlyPlaying: false,
  loading: false,
  song: {},
  audio: new Audio,
  currentTime: null,
  maxTime: null
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
  },
  audio: (state) => {
    return state.audio
  },
  currentTime: (state) => {
    return state.currentTime
  },
  maxTime: (state) => {
    return state.maxTime
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

    state.audio.addEventListener('ended', () => {
      const currentSongIndex = state.musicData.findIndex(song => song.id === state.song.id)
      let nextSong = null;

      if(currentSongIndex === state.musicData.length - 1) {
        nextSong = state.musicData[0];
      } else {
        nextSong = state.musicData[currentSongIndex + 1];
      }

      state.song = nextSong;
      state.audio.src = nextSong.audio;
      state.audio.play();
      state.currentlyPlaying = true;
    })

    state.audio.addEventListener('timeupdate', () => {
      const time = state.audio.currentTime;
      state.currentTime = time;
      state.maxTime = state.audio.duration;
    })
  },
  SET_CURRENTLY_PLAYING: (state, payload) => {
    state.currentlyPlaying = payload;
  },
  PAUSE: (state) => {
    state.audio.pause();
  },
  PLAY: (state) => {
    state.audio.play();
  }
}


const actions = {
  GET_MUSIC_DISCOVER ({commit}) {
    commit(SET_LOADING, true)
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&limit=200&include=musicinfo&groupby=artist_id&imagesize=300`)
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
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.VUE_APP_JAMENDO}&format=jsonpretty&fuzzytags=hiphop&limit=200&include=musicinfo&groupby=artist_id&imagesize=300`)
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
    let nextSong = null;
    if(currentSongIndex === state.musicData.length - 1) {
      nextSong = state.musicData[0];
    } else {
      nextSong = state.musicData[currentSongIndex + 1];
    }
    commit(SET_AUDIO, nextSong);
    commit(SET_CURRENTLY_PLAYING, true)
  },
  PLAY_PREVIOUS_SONG({commit}) {
    const currentSongIndex = state.musicData.findIndex(song => song.id === state.song.id)
    let previousSong = null;
    if(currentSongIndex === 0) {
      previousSong = state.musicData[0];
    } else {
      previousSong = state.musicData[currentSongIndex - 1];
    }
    commit(SET_AUDIO, previousSong);
    commit(SET_CURRENTLY_PLAYING, true)
  },
  PLAY_CURRENT_SONG({commit}) {
    if(Object.keys(state.song).length > 0 && state.musicData[0].id === state.pageMusicData[0].id) {
      commit(PLAY);
      commit(SET_CURRENTLY_PLAYING, true)
    } else {
      commit(SET_MUSIC_DATA, state.pageMusicData)
      commit(SET_AUDIO, state.musicData[0])
      commit(SET_CURRENTLY_PLAYING, true)
    }
  },
  PAUSE_CURRENT_SONG({commit}) {
    commit(PAUSE);
    commit(SET_CURRENTLY_PLAYING, false)
  }
}

export default {
  state,
  mutations, 
  actions,
  getters
}