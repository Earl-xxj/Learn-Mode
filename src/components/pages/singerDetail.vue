<template>
    <transition name='slide'>
        <music :title='titleN' :bg-img='bgImage' :songs='songs'></music>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from '../../api/singer'
    import {resCode} from '../../api/config'
    import {createSong} from '../../assets/js/song'

    import music from './musicList'
    export default {
        name:'singerDetail',
        components:{music},
        data(){
            return{
                songs:[]
            }
        },
        created(){
            this._getDetail()
        },
        computed:{
            ...mapGetters(['singer']),
            titleN(){
                return this.singer.name;
            },
            bgImage(){
                return this.singer.avatar
            },
        },
        methods:{
            _getDetail () {
                //  如果singer没有这个id  那么设置一下跳转 让他 调到歌手页那里
                if (!this.singer.id) {
                this.$router.push('/singer')
                return
                }
                getSingerDetail(this.singer.id).then((res) => {
                if (res.code === resCode) {
                    // console.log(res.data.list)  ;
                    this.songs = this.normalizeSongs(res.data.list)
                }
                })
            },
            normalizeSongs (list) {
                let ret = []
                list.forEach((item) => {
                // 对象的解构赋值 等同于 var musicData = item.musicData
                let {musicData} = item
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
                })
                return ret
            }
            
        },
    }
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
}
    

  .slide-enter, .slide-leave-to{
      transform: translate3d(100%, 0, 0)
  }
    
.musicList{
        position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
}
</style>