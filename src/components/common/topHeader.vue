<template>
    <div class="topHeader">
        <div class="headphoto">
            <img :src="headsrc" alt="">
            <h1 class="txet">XX 音乐</h1>
        </div>
        <div class="mySelf"><i class="el-icon-lx-people grid-con-icon"></i></div>
        <!-- <router-link tag="div" class="mySelf">
            
        </router-link> -->
    </div>
</template>

<script>
    export default {
        name:'topHeader',
        data(){
            return{
                headsrc:'',
            }
        },
    }
</script>

<style lang="scss" scoped>
// 颜色定义规范
// $color-background = #222,
// $color-background-d = rgba(0, 0, 0, 0.3)
// $color-highlight-background = #333
// $color-dialog-background = #666
// $color-theme = #ffcd32
// $color-theme-d = rgba(255, 205, 49, 0.5)
// $color-sub-theme = #d93f30
// $color-text = #fff
// $color-text-d = rgba(255, 255, 255, 0.3)
// $color-text-l = rgba(255, 255, 255, 0.5)
// $color-text-ll = rgba(255, 255, 255, 0.8)

//字体定义规范
// $font-size-small-s = 10px
// $font-size-small = 12px
// $font-size-medium = 14px
// $font-size-medium-x = 16px
// $font-size-large = 18px
// $font-size-large-x = 22px

.topHeader{
    position: relative;
    height: 44px;
    display:flex;
    justify-content: space-around;
    align-items: center;
    background: #222;
    .headphoto{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mySelf{
        // display: inline-block;
        // width: 30px;
        .grid-con-icon{
            font-size: 38px;
        }
    }
}
</style>
