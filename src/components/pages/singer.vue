<template>
    <div class="singer" ref="singer">
        <list-view :data="singers" @selectf ='selectSinger' ref="list"></list-view>
        <router-view>ss</router-view>
    </div>
</template>

<script>
    import {getSingerList} from '../../api/singer'
    import  Singer from '../../assets/js/singer'
    import {resCode} from '../../api/config'
    import listView from '../../base/listView'

    import {mapMutations} from 'vuex'
    import {playlistMixin} from '../../assets/js/mixin'

    const hotLength = 10
    const hotName = '热门'
    export default {
        name:'singer',
        mixins:[playlistMixin],
        components:{listView},
        data(){
            return {
                singers:[]
            }
        },
        created(){
            this._getSingerList();
        },
        methods:{
            handlePlaylist(playlist){
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.singer.style.bottom = bottom;
                this.$refs.list.refresh();
            },
            ...mapMutations({setSinger: 'SET_SINGER'}),
            // 获取singer 列表
            _getSingerList(){
                getSingerList().then((res) =>{
                    // console.log(res,'getSingerList');
                    if(res.code === resCode){
                        this.singers = this._normalizeSinger(res.data.list);

                        // console.log(this.singers,'this.singers');
                    }
                })
            },
            _normalizeSinger(list){
                let map = {
                    hot:{
                        title:hotName,
                        items:[]
                    }
                }

                list.forEach((item,index) => {
                    if(index < hotLength){
                        map.hot.items.push(new Singer({
                            name:item.Fsinger_name,
                            id:item.Fsinger_mid
                        }))
                    }
                    const key = item.Findex;
                    if(!map[key]){
                        map[key] = {
                            title:key,
                            items:[]
                        }
                    }
                    map[key].items.push(new Singer({
                        name:item.Fsinger_name,
                        id:item.Fsinger_mid
                    }))
                });
                //  我们得到了对象 但是对象的key值排布 是无序的 我们要对他进行有序的排列
                let charArr = [], hotArr = [];
                for(var K in map){
                    if(map[K].title.match(/[a-zA-Z]/)){
                        charArr.push(map[K])
                    }else if(map[K].title === hotName){
                        hotArr.push(map[K])
                    }
                }
                // 此时得到了 热门数组和字符数组
                charArr.sort((a,b) =>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hotArr.concat(charArr);

            },

            selectSinger (item) {
                this.$router.push({
                path: `/singer/${item.id}`
                })
                // 将传入的参数对象 放入vuex中  item 也就是单个的歌手对象
                //        console.log(item);
                this.setSinger(item)
            },

        },
        
    }
</script>

<style lang="scss" scoped>
    .singer{
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
    }
    
</style>