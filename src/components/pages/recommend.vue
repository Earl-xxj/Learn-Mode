<template>
    <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref='scroll' :data='discList'>
      <div>
        <!-- <div class="slider-wrapper" v-if="recommends.length"> -->
          <!-- <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" @load='loadImg' :src="item.picUrl">
              </a>
            </div>
          </slider> -->
        <!-- </div> -->
          <div class="swiper-container" ref="sliderOne">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in recommends" :key="item.id">
                  <a :href="item.linkUrl">
                    <img class="needsclick" @load='loadImg' :src="item.picUrl">
                  </a>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="recommend-list">
          <h1 class='list-title'>热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class='item' :key="item.id">
              <div class="icon">
                <img v-lazy="item.imgurl" width='60' height='60' alt="">
              </div>
              <div class="text">
                <h2 class='name' v-html='item.creator.name'></h2>
                <p class="desc" v-html='item.dissname'></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="loading-container" v-show='!discList.length'>
        <loading></loading>
      </div> -->
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from "swiper"
import {getRecommend, getDiscList} from '../../api/recommend'
import {resCode} from '../../api/config'
import scroll from '../../base/scroll.vue'
// import slider from '../../base/slider.vue'
import {mapMutations} from 'vuex'
import {playlistMixin,handlePlaylist} from '../../assets/js/mixin'


  export default{
    mixins: [playlistMixin],
    components: {scroll},
    props: {},
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    watch:{
      recommends(){
        if(this.recommends.length){
        this.$nextTick(() =>{
          new Swiper(this.$refs.sliderOne,{
            loop:true,
            autoplay:true,
            pagination: {
                el: '.swiper-pagination',
            },
          })
        })
      }
      }
      
    },
    created () {
      this._getRecommend()
      
      setTimeout(() => {
        this._getDiscList()
      }, 400)
    },
    mounted(){},
  
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === resCode) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList () {
        this.$nextTick(() =>{
          getDiscList().then((res) =>{
              console.log(res,'ressssssssssssssssssss');
          })
        })

      },
      loadImg () {
        if (!this.checkLoad) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      }),
      selectItem (item) {
        // 点击item之后 页面进行跳转 并且将你点击的这个 存储进入vuex里面
      //        console.log(item);
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
       _initSwiper(){
       
        // new Swiper(this.$refs.sliderOne,{
        //   direction:'horizontal',
        //   autoplayDisableOnInteraction: false,
        //   observer: true,
        //   observeParents: true,
        //   autoplay:true,
        //   loop:true,
        //   pagination: {
        //     el: ".swiper-pagination",
        //     clickable: true //允许点击小圆点跳转
        //   },
         
        // })

      },
    }
  }
</script>

<style lang="scss">
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
    .recommend{
        flex: 1;
        .recommend-content{
            height: 100%;
            overflow: hidden;
            .swiper-container{
                width: 100%;
                overflow: hidden;
                .swiper-wrapper{
                  transition-timing-function:linear !important;
                  .swiper-slide{
                    a{
                      display: block;
                      width: 100%;
                      overflow: hidden;
                      text-decoration: none;
                      img{
                        display: block;
                        width: 100%;
                      }
                    }
                  }

                }
            }
        }
    }
</style>