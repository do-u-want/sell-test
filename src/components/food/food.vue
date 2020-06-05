<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image" alt="" />
        <div class="back" @click="close">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{ food.name }}</h1>
        <div class="detail">
          <span class="sell-count">月售{{ food.sellCount }}</span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{ food.price }}</span
          ><span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div
          transition="fade"
          class="buy"
          v-show="!food.count || food.count === 0"
          @click="addFrist($event)"
        >
          <span>加入购物车</span>
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{ food.info }}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect
          :select-type="selectType"
          :only-content="onlyContent"
          :ratings="food.ratings"
          :desc="desc"
        ></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li
              v-for="rating in food.ratings"
              class="rating-item border-1px"
              v-show="needShow(rating.rateType, rating.text)"
            >
              <div class="user">
                <span class="name">{{ rating.username }}</span>
                <img :src="rating.avatar" width="12px" height="12px" alt="" />
              </div>
              <div class="time">{{ rating.rateTime |formatDate}}</div>
              <p class="text">
                <span
                  :class="{
                    'icon-thumb_up': rating.rateType === 0,
                    'icon-thumb_down': rating.rateType === 1,
                  }"
                ></span
                >{{ rating.text }}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol";
import Vue from "vue";
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";
import {formatDate} from "../../common/js/date.js"
const POSITIVE = 0;
const NAGATIVE = 1;
const ALL = 2;
export default {
  props: { food: { type: Object } },
  components: { cartcontrol, split, ratingselect },

  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽",
      },
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.BS) {
          this.BS = new BScroll(this.$els.food, { click: true });
          // console.log(1);
        } else {
          this.BS.refresh();
        }
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },

    close() {
      this.showFlag = false;
    },
    addFrist(event) {
      console.log(1);
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, "count", 1);

      this.$dispatch("cart.add", event.target);
    },
  },
  filters:{
     formatDate(time){
       let date=new Date(time);
      //  console.log(date);
       return formatDate(date,'yyyy-MM-dd hh:mm:ss')
     }
  },
  events: {
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.BS.refresh();
      });
    },
    switch(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.BS.refresh();
      });
    },
  },
};
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl";
.food
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 30//遮住父元素但是不能遮住购物篮index=50的，并且不管购物栏子元素index多少，永远遮不住。
  width 100%

  background #fff
  // height 590px
  &.move-transition
    transform translate3d(0,0,0)
    transition all 0.2s linear
  &.move-enter,&.move-leave
    transform translate3d(100%,0,0)
  .image-header
    position relative
    width 100%
    height 0
    padding-top 100%
    img
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .back
      position absolute
      top 0px
      left 0
      .icon-close
          display block
          padding 10px
          font-size 20px
          color #fff
  .content
    padding 18px
    position relative
    .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7,17,27)
    .detail
        margin-bottom 18px
        line-height 10px
        height 10px
        color rgb(147,153,159)
        font-size 0
        .sell-count,.rating
            font-size 10px
        .sell-count
            margin-right 12px
    .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color red
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147,153,159)
    .cartcontrol-wrapper
      position absolute
      right 12px
      top 62px
    .buy
      position absolute
      right 18px
      top  66px
      z-index 10
      height 24px
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0,160,220)
      .fade-transition
          transition all 0.2s linear
          opacity 1
      .fade-leave,.fade-enter
          opacity 0
  .info
      padding 18px
      .title
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(7,17,27)
      .text
          line-height 24px
          padding 0 8px
          font-size 12px
          color rgb(77,85,93)
  .rating
      padding-top 18px
      .title
          line-height 14px
          margin-left  18px
          font-size 14px
          color rgb(7,17,27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px (rgba(7,17,27,0.1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              margin-right 6px
              font-size 10px
              color rgb(147,153,159)
            .avatar
              border-radius 50%
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147,153,159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7,17,27)
            .icon-thumb_up
              color blue
              line-height 16px
              margin-right 4px
            .icon-thumb_down
              line-height 24px
              margin-right 4px
              color rgb(147,153,159)
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147,153,159)

</style>
