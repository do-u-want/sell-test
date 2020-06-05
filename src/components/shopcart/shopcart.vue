<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" @click="shopcartListshow">
          <div class="logo" :class="{ highlight: totalCount > 0 }">
            <i
              class="icon-shopping_cart"
              :class="{ highlight: totalCount > 0 }"
            ></i>
          </div>
          <div class="num" v-show="totalCount">
            {{ totalCount }}
          </div>
        </div>
        <div class="price" :class="{ highlight: totalCount > 0 }">
          ￥{{ totalPrice }}
        </div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class=" payClass ">{{ payDesc }}</div>
      </div>
      <div class="ball-container">
          <div transition="drop"  v-for="ball in balls" v-show="ball.show" class="ball">
              <div class="inner inner-hook">

              </div>
          </div>
      
      </div>
      <div class="shopcart-list" v-show="listShow" transition="fold" >
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearFoods">清空</span>
        </div>
        <div class="list-content" v-el:list-content>
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  props: {
    deliveryPrice: { type: Number },
    minPrice: { type: Number },
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components:{
    cartcontrol,
  },
  data() {
    return {
      balls:[
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        {show:false},
        ],
      dropBalls:[],
      open:false
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((item) => {
        total += item.price * item.count;
      });
      return (total );
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return (count );
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow(){
      if(this.totalCount&&this.open){
         this.$nextTick(()=>{
          if(!this.scroll)
          {this.scroll=new BScroll(this.$els.listContent,{click:true})}
          else{
            this.scroll.refresh()
          }
        })
        return true
       
      }
      return false
    }
    
  },
  methods: {
    drop(el){
      // console.log(el)
      for(let i=0;i<this.balls.length;i++){
        let ball=this.balls[i]
        if(!ball.show){
          ball.show=true;
          ball.el=el;
          this.dropBalls.push(ball);
          // console.log(this.dropBalls)
          return;
        }
      }
    },
    shopcartListshow(){
      this.open=!this.open;
      // console.log(this.listShow)
    },
    clearFoods(){
      this.selectFoods.forEach((food)=>{
        food.count=0;
      })
    }
  
  },
  transitions:{
       drop:{
         beforeEnter(el){
           let count=this.balls.length;
           while(count--){
             let ball=this.balls[count]
             if(ball.show)
             {
               let rect=ball.el.getBoundingClientRect();
               let x=rect.left-32;
               let y=-(window.innerHeight-rect.top-22);
               el.style.display='';
               el.style.webkitTransform=`translate3d(0,${y}px,0)`
               el.style.transform=`translate3d(0,${y}px,0)`
               let inner=el.getElementsByClassName('inner-hook')[0];
               inner.style.webkitTransform=`translate3d(${x}px,0,0)`
               inner.style.transform=`translate3d(${x}px,0,0)`
             }
           }
         },
         enter(el){
              let rf=el.offsetHeight;//触发重绘
              this.$nextTick(()=>{
              el.style.webkitTransform='translate3d(0,0,0)'
               el.style.transform='translate3d(0,0,0)'
               let inner=el.getElementsByClassName('inner-hook')[0];
               inner.style.webkitTransform='translate3d(0,0,0)'
               inner.style.transform='translate3d(0,0,0)'
              })
               
         },
         afterEnter(el){
           let ball=this.dropBalls.shift();
           if(ball){
             ball.show=false;
             el.style.display='none';
           }
         }
       }    
  }
};
</script>
<style lang="stylus">
@import "../../common/stylus/mixin";
.shopcart
    position fixed
    display block
    left  0px
    bottom  0px
    z-index 50
    width 100%
    height 48px
    // background #000
    .content
      display flex
      background #141d27
      height 100%
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          text-align center
          .logo
            width 100%
            height  100%
            border-radius 50%
            background  #2b343c
            text-align center
            &.highlight
              background rgb(0,160,220)

            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            background rgb(240,20,20)
            color #fff
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)

        .price
          display inline-block
          line-height 24px
          margin-top 12px
          vertical-align top
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          font-size 16px
          font-weight 700
          color rgba(255,255,255,0.4)
          &.highlight
            color #fff

        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin  12px 0 0 12px
          color rgba(255,255,255,0.1)
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px

        .pay
          font-size 12px
          //color rgba(255,255,255,0.4)
          text-align center
          line-height 48px
          height 48px
          background #2b333b
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container 
      .ball
        position fixed
        left 32px
        bottom 22px
        zindex 200
        &.drop-transition
          transition all 0.8s  cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width 16px
            height  16px
            border-radius 50%
            background rgb(0,160,220)
            transition all 0.8s linear 
    .shopcart-list 
      position absolute
      top 0
      left 0
      z-index -100
      width 100%
      font-size 12px
      &.fold-transition
        transition all 0.5s linear 
        transform translate3d(0,-100%,0)
      &.fold-enter,&.fold-leave
        transform translate3d(0,0,0) 
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom  1px solid rgba(7,17,27,0.1)
        // position relative
        .title
          float:left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
      .list-content
        padding 0 18px
        max-height 217px
        background #ffffff
        overflow hidden
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240,20,20)
          .cartcontrol-wrapper
            position absolute
            right 0px
            bottom 6px

        






</style>
