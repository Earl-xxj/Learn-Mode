<template>
        <scroll :data='data' class="listview" ref="listView" :listen-scroll='listenScroll' :probe-type="probeType" @scroll="scroll">
            <ul>
                <li class="list-group" v-for="group in data" :key="group.id" ref="listGroup">
                    <h2 class="list-group-title">{{group.title}}</h2>
                    <ul>
                        <li class="list-group-item" v-for="item in group.items" :key="item.id" @click='selectItem(item)'>
                            <img v-lazy="item.avatar" class="avatar">
                            <span class="name">{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="list-shortcut" @touchstart.stop.prevent='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
                <ul>
                    <li class='item' v-for="(item,index) in shortcutList" :key="item.id" :data-index='index' :class="{'current':currentIndex===index}">{{item}}</li>
                </ul>
            </div>
            <div class="list-fixed" ref="fixed" v-show='fixedTitle'>
                <div class="fixed-title">{{fixedTitle}}</div>
            </div>
        </scroll>
</template>

<script>
    import Scroll from './scroll'
    import {getData} from '../assets/js/dom'

    const keyWordHeight = 18
    const TITLE_HEIGHT = 30;
    export default {
        name:'listView',
        // props:{//父组件传递的 值
        //     fdata:{
        //         type: Array,
                
        //         default: function(){
        //             return new Array()
        //         }
        //     }
        // },
        props:['data'],
        components:{Scroll},
        data(){
            return{
                scrollY: -1,
                currentIndex: 0,
                diffIdx:-1,

                // listenScroll:true,
                // listHeight:[],
                // probeType:3,
               
            }
        },
        created(){
            this.touch = {};
            this.listenScroll = true;
            this.listHeight = [];
            this.probeType = 3
        },
        computed:{
            shortcutList(){
                return this.data.map((value) => {
                return value.title.substr(0, 1);
                })
            },
            fixedTitle(){
                if (this.scrollY > 0) {
                return '0000'
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods:{
            refresh(){
                this.$refs.listView.refresh();
            },
            selectItem(item){
                // 触发 子向父传值
                this.$emit('selectf',item)
            },
            onShortcutTouchStart(e){
                //获取到被触摸的 index
                let touchedIdx  = getData(e.target,'index');
                // js触摸事件 http://www.jianshu.com/p/832f36531df9
                let firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.touchedIdx1 = touchedIdx;
                this._scroll(touchedIdx);
                this.$refs.listView.scrollToElement(this.$refs.listGroup[touchedIdx],0)
            },
            onShortcutTouchMove(e){
                let touchmove = e.touches[0];
                this.touch.y2 = touchmove.pageY;
                let diff = (this.touch.y2 - this.touch.y1) / keyWordHeight | 0;

                this.touch.touchedIdx2 = parseInt(this.touch.touchedIdx1) + diff;
                this._scroll(this.touch.touchedIdx2);
                this.$refs.listView.scrollToElement(this.$refs.listGroup[this.touch.touchedIdx2],0)
            },
            scroll(pos){
                this.scrollY = pos.y
            },
            _scroll(index){
                if(!index) {
                    return;
                }
                if(index < 0){
                    index = 0
                }else if(index  > this.listHeight.length -2){
                    index = this.listHeight.length - 2
                }
                this.scrollY = -this.listHeight[index]
            },
            _calculateHeight(){
                this.listHeight = [];
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height);
                [...list].forEach((item) =>{
                    height += item.clientHeight
                    this.listHeight.push(height);
                })
            },
        },
        watch:{
            data(){
                setTimeout(() =>{
                    this._calculateHeight();
                },20)
            },
            scrollY(newY){
                // 监听滚动距离的变化 根据移动的y值 在高度数组中判断index值
                const listHeight = this.listHeight;
                if(newY > 0){
                    this.currentIndex = 0
                    return
                }
                //当你在中间移动的时候  滑动距离为负值 我们在判断区间的时候  去最后的那个值
                for(let i = 0; i < listHeight.length -1; i++){
                    let height1 = listHeight[i];
                    let height2 = listHeight[i + 1];
                    if(-newY > height1 && -newY <= height2){
                        this.currentIndex = i;
                        this.diffIdx = height2 - newY;
                        return
                    }
                }
                // 滚动到底部的时候
                this.currentIndex = listHeight.length - 2;
            },
            diffIdx(newVal){
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            },
        }
        
    }
</script>

<style lang="scss" scoped>
    .listview{
        position: relative;
        width: 100%;
        height: 100%;
        overflow:hidden;
        background: #222;
        .list-group{
            padding-bottom: 30px;
            .list-group-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: 10px;
                color:rgba(255, 255, 255, 0.5);
                background: #333;
                text-align: left;
            }
            .list-group-item{
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                .avatar{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                .name{
                    margin-left: 20px;
                    color:rgba(255, 255, 255, 0.5);
                    font-size: 14px;
                }
            }
        }
        .list-shortcut{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 30;
            width: 20px;
            padding: 20px  0;
            border-radius: 10px;
            text-align: center;
            background: rgba(0, 0, 0, 0.3);
            font-family: Helvetica;
            .item{
                padding: 3px;
                line-height: 1;
                color: rgba(255, 255, 255, 0.5);
                font-size: 10px;
                &.current{
                    color: #ffcd32;
                }
            }
        }
        .list-fixed{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .fixed-title{
                height: 30px;
                line-height: 30px;
                padding-left: 20px;
                font-size: 10px;
                color: rgba(255, 255, 255, 0.5);
                background: #333;
            }
        }
    }
</style>