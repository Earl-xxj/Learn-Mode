


// 引入设计模式
import {playMode} from '../assets/js/config'
import {loadSearch,loadFavorite,loadPlay} from '../assets/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  favoriteList: loadFavorite(),
  recentPlay: loadPlay()
}

export default state