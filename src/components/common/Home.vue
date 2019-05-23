<template>
    <div class="home">
        <top-header></top-header>
        <tabs></tabs>
        <keep-alive>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>    
        </keep-alive>
    </div>
</template>

<script>
// import recommend from '../pages/recommend.vue'
import topHeader from '../common/topHeader.vue'
import Tabs from '../pages/Tabs.vue'
    export default {
        name:'Home',
        components:{topHeader,Tabs},
    }
</script>

<style lang="scss" scoped>
.fade-enter-active,.fade-leave-active{
    transition: all opacity 0.5s;
}

.fade-enter,.fade-leave-active{
    opacity: 0;
}
.home{
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>