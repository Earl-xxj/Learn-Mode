
import axios from 'axios'
import Base64 from 'js-base64'

import { commonParams }  from '../../api/config'
import {getLyric} from '../../api/song'

export default class Song{
  constructor({id,mid,singer,name,album, duration, image, url}){
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyrics(){
    if(this.lyric){
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve,reject) =>{
      getLyric(this.mid).then((res) =>{
        if(res.retcode === 0){
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        }else{
          reject('error !!!')
        }
      })
    })
  }
}

export function createSong(musicData){
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: gteVkey(musicData.songmid)
  })
}

function filterSinger(singer){
  let ret = []
  singer.forEach((item) => {
    ret.push(item.name)
  })

  return ret.join('/')
}

function gteVkey (mid) {
  return 'http://ws.stream.qqmusic.qq.com/C100' + mid + '.m4a?fromtag=0&guid=126548448'
  // const data = Object.assign({}, commonParams, {
  //   songmid: mid,
  //   platform: 'yqq',
  //   hostUin: 0,
  //   needNewCode: 0,
  //   categoryId: 10000000,
  //   pcachetime: +new Date(),
  //   format: 'json',
  //   guid: '756847868'
  // })
  // const vkeyUrl = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg '
  // axios.get(vkeyUrl, {
  //   params: data
  // }).then((res) => {
  //   console.log(res)
  // })
}
