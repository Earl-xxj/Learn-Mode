<template>
    <div class="tabs">
        <router-link tag="div" class="tab_items" to="/recommend">
            <span class="tab_span">推荐</span>
        </router-link>
        <router-link tag="div" class="tab_items" to="/singer">
            <span class="tab_span">歌手</span>
        </router-link>
        <router-link tag="div" class="tab_items" to="/rankList">
            <span class="tab_span">排行</span>
        </router-link>
        <router-link tag="div" class="tab_items" to="/search">
            <span class="tab_span">搜索</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name:'Tabs',
        data(){
            return{}
        },
    }
</script>

<style lang="scss" scoped>
$color-text-l : rgba(255, 255, 255, 0.5);
$color-theme : #ffcd32;
.tabs{
    display: flex;
    height: 44px;
    line-height: 44px;
    background: #222;
    .tab_items{
        flex: 1;
        text-align: center;
        .tab_sapn{
            padding-bottom: 5px;
            color: $color-text-l;
        }
        &.router-link-active{
            .tab_span{
                    color: $color-theme;
                    border-bottom: 2px solid $color-theme;
                }
        }
    }
}

</style>