<template>
    <div class="music-list">
        <div class="bacl" @click="back()"><i class='icon-back'></i></div>
        <h1 class="title" v-html="title"></h1>
        <div class="bgImg" :style="bgStyle" ref="bgImg">
            <div class="play-wrapper">
                <div class="play" ref="playBtn" v-if="song.length > 0" @click='random'>
                    <i class="icon-play"></i>
                    <span class='text'>随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref='filter'></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
    </div>
</template>

<script>
    export default {
        name:'musicList',
        props:{
            bgImg: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: function () {
                return [];
                }
            },
            titleN: {
                type: String,
                default: ''
            },
        },
        data(){
            return{
                title:'',
                song:[],
            }
        },
        computed:{
            bgStyle() {
                return `background-image:url(${this.bgImage})`
            }
        }
    }
</script>

<style lang="scss" scoped>
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
}
</style>