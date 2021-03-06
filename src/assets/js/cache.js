

// https://github.com/ustbhuangyi/storage
import storage from 'good-storage'


const search_key = '_search_'
const ArrMaxLen = 15

const favorite_key = '_favorite_'
const favoriteMaxLen = 200

// 我最近听过的歌曲功能 所需要的参数

const play_key = '_play_'
const play_max_len = '50'

function insertArr(arr,val,compare,maxlen){
    var index = arr.findIndex(compare)
    if(index == 0){
        return
    }else if(index > 0){
        arr.splice(index,1);
    }

    arr.unshift(val);
    if(maxlen && arr.length > maxlen){
        arr.pop();
    }
}

function deleteFromArray(arr,compare){
    const index = arr.findIndex(compare)
    if(index > -1){
        arr.splice(index,1);
    }
}

// 保存搜索历史 以及获取搜索历史
 export function saveSearch(query){
     let searches = storage.get(search_key,[])

     insertArr(searches,query, (item) =>{
         return item == query;
     },ArrMaxLen)
     storage.set(search_key,searches)
     return searches;
 }

 export function loadSearch(){
    console.log(storage.get(search_key, []),'loadSearch in cache.js')
    return storage.get(search_key, []);
 }

 export function deleteSearch(query){
     let searches = storage.get(search_key,[])
     deleteFromArray(searches,(item) =>{
         return item ===  query;
     })
     storage.set(search_key,searches)
     return  searches;
 }
//  清空
export function clearSearch(){
    storage.remove(search_key)
    return [];
}

// 保存喜欢歌曲
export function saveFavorite(songTarget){
    let songs = storage.get(favorite_key,[])
    insertArr(songs,songTarget,(item) =>{
        return item.id === songTarget.id
    },favoriteMaxLen)
    storage.set(favorite_key,songs)
    return songs;
}

export function loadFavorite(){
    return storage.get(favorite_key, [])
}

export function savePlay(song){
    let recentSongs = storage.get(play_key,[])
    insertArr(recentSongs,song,(item) =>{
        return item.id === song.id
    },play_max_len)
    storage.set(play_key,recentSongs)
    return recentSongs;
}

export function loadPlay () {
    return storage.get(play_key, [])
}

export function deleteFavorite (song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return song.id === item.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}