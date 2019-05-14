

import * as types from './mutation-type'
import {playMode} from '../assets/js/config'
import {shuffle} from '../assets/js/util'
import {saveSearch, deleteSearch, savePlay, clearSearch, saveFavorite, deleteFavorite } from '../assets/js/cache'

function findIndex(list,song){
    return list.findIndex((item) =>{
        return  item.id = song.id
    })
}

export const  selectPlay = function({commit, state}, {list, index}){
    // 在这个里面对多个commit进行封装 进行异步的调用
    commit(types.SET_SEQUENCE_LIST, list)
    if(state.mode == playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST, randomList)
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAYLIST, list)
    }

    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}
/**
 * 在这里 我们声明一个 action  当点击随机播放的时候
 * 需要改变 playmode 歌曲的列表数组 顺序数组 当前的索引 以及歌曲全屏播放 和播放状态
 */
export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const sequencePlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.sequence)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

/**
 * 声明一个 action 当歌曲列表被检索出来的时候  点击歌曲列表，进行播放事件
 * 因为在检索的时候并不希望改变原来的歌曲列表
 */
export const insertSong = function ({commit,state},song){
    let playlist = state.playlist.slice()
    let sequencelist = state.sequencelist.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playingList[currentIndex]
    let findPlay = findIndex(playlist,song)
    currentIndex ++;
    playlist.splice(currentIndex,0,song)

    if(findPlay > -1){
        if(currentIndex > findPlay){
            playlist.splice(findPlay,1)
            currentIndex--;
        }else{
            playlist.splice(findPlay+1,1)
        }
    }

    let currentSIndex = findIndex(sequencelist,song) + 1
    let findSeqIndex = findIndex(sequencelist,song)

    sequencelist.splice(currentSIndex,0,song)
    if(findSeqIndex > -1){
        if(currentSIndex > findSeqIndex){
            sequencelist.splice(findSeqIndex,1)
        }else{
            sequencelist.splice(findSeqIndex+1,1)
        }
    }


    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST, sequencelist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit},query){
    commit(types.SET_SEARCHHISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SEARCHHISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit},query){
    commit(types.SET_SEARCHHISTORY,clearSearch(query))
}

export const deleteSong = function({commit,state},song){
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 分别找出这首歌在playlist，sequenceList的索引  然后删掉
    let pIndex = playlist.findIndex((item) =>{
        return item.id == song.id
    })

    let sIndex = sequenceList.findIndex((item) =>{
        return item.id == song.id
    })

    playlist.splice(pIndex,1)
    sequenceList.splice(sIndex,1)
    if(currentIndex > pIndex || currentIndex === playlist.length){
        currentIndex --;
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    if(!playlist.length){
        // 播放列表为空的时候 将播放状态变为false
        commit(types.SET_PLAYING_STATE, false)
        // commit(types.SET_PLAYING_STATE, playingState)
    }else{
        commit(types.SET_PLAYING_STATE, true)
    }
}