<template>
   <div class="slider" ref="slider">
    <div class="slider-group" ref='sliderGroup'>
      <slot>

      </slot>
    </div>
    <div class="dots">
      <span class='dot' v-for='(item,index) in dots' :class='{active: currentPageIndex===index}' :key="item.index"></span>
    </div>
  </div>
</template>

<script>
  // 引入滑动和添加类名 的插件
  
  import {addClass} from '../assets/js/dom'
  import BScroll from 'better-scroll'
  import { setTimeout } from 'timers';

   export default{
    components: {},
    props: {
      // 循环轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 自动轮播
      autoPlay: {
        type: Boolean,
        default: true,
      },
      // 间隔
      interval: {
        type: Number,
        default: 3000
      }
    },
    data(){
      return {
        dots: [],
        currentPageIndex: 0,

      }
    },
    created(){

    },
    mounted(){
      var _this = this;
      setTimeout(() => {
        _this._setSliderWidth()
        _this._initDots()
        _this._initSlider()

        // 在这里判断 如果auroPlay是true 则需要初始化play
        if (_this.autoPlay) {
          _this._play()
        }
      }, 20)

      // 对于移动端 我们需要考虑的是 用户可以横屏竖屏的去观看
      // 那么我们就需要监听resize事件
      window.addEventListener('resize',()=>{
          if(!this.slider){
              return
          }
          this._setSliderWidth(true);
          this.slider.refresh();
      })
    },
    destroyed(){
      clearTimeout(this.timer)
    },
    computed: {},
    methods: {
      _setSliderWidth(isResize){
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        this.children = this.$refs.sliderGroup.children;
        for (let i = 0; i < this.children.length; i++) {
          let singleImg = this.children[i];
          addClass(singleImg, 'slider-item');

          singleImg.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        // 因为是无缝滚动 所以要加上头部和尾部的一张 共两张
        if(this.loop&&!isResize){
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider(){

        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        //  每次滑动结束以后 获取到当前的index
        this.slider.on('scrollEnd', () => { 
          let pageIndex = this.slider.getCurrentPage().pageX;
          console.log(pageIndex,'pageIndex')
          if (this.loop) {
            pageIndex -= 1;
          }

          this.currentPageIndex = pageIndex;
          if (this.autoPlay) {
            clearTimeout(this.timer);
            this._play()
          }
        })
      },
      _initDots(){
        this.dots = this.children
      },
      _play(){
        // 根据当前配置 算出在数组的index
        let pageIndex = this.currentPageIndex + 1;
         console.log(pageIndex,'pageIndex1111')
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>


<style lang="scss" scoped>
.slider{
    min-height: 1px;
    position: relative;
    .slider-group{
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item{
            float: left;
            // box-sizing: border-box;
            // overflow: hidden;
            // text-align: center;
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
    .dots{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 12px;
        .dot{
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background:rgba(255, 255, 255, 0.5);
            &.active{
                width: 20px;
                border-radius: 5px;
                background: rgba(255, 255, 255, 0.8);
            }
        }
    }
}

</style>