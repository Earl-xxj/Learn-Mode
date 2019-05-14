

import * as types from './mutation-type'

const mutations = {
    [types.SET_MUSIC_LIST](state,musicList){
        state.musicList = musicList
    },
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequencelist = list
    },
    [types.SET_PLAY_MODE](state,mode){
        state.mode = mode 
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentindex = index
    },
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_TOPLIST](state,topList){
        state.topList = topList
    },
    [types.SET_SEARCHHISTORY](state,searchHistory){
        state.searchHistory = searchHistory
    },
    [types.SET_FAVORAITELIST](state,favoriteList){
        state.favoriteList = favoriteList
    },
    [types.SET_PLAY_HISTORY](state,playHistory){
        state.playHistory = playHistory
    }
    
}

export default mutations