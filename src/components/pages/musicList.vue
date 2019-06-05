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
    .back{
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 60;
        .backIcon{
            display: block;
            color: #fff;
            font-weight: 800;
            padding: 10px;
            font-size: 22px
        }
    }
    .title{
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }
    .bgImg{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        
        .play-wrapper{
            position: absolute;
            bottom: 20px;
            z-index: 50;
            width: 100%;
            .play{
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                margin: 0 auto;
                text-align: center;
                border: 1px solid #ffcd32;
                color: #ffcd32;
                border-radius: 100px;
                font-size: 0;
                .icon-play{
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: 22px;
                }
                .text{
                    display: inline-block;
                    vertical-align: middle;
                    font-size:10px;
                }
            }
        }
        .filter{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer{
        position: relative;
        height: 100%;
        background: #222;
    }
    .list{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #222;
        .song-list-wrapper{
            padding: 20px 30px;
        }
        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
      

}
</style>