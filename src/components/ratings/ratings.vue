<template>
  <div class="ratings" v-el:ratings>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span
            ><span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings"
        :desc="desc"
      ></ratingselect>
      <div class="rating-wrapper">
      <ul>
        <li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" alt="" height="28" width="28" />
          </div>
          <div class="content">
            <h1 class="name">{{ rating.username }}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-show="rating.deliveryTime">{{
                rating.deliveryTime
              }}分钟到达</span>
            </div>
            <p class="text">{{ rating.text }}</p>
            <div
              class="recommend"
              v-show="rating.recommend && rating.recommend.length"
            >
              <span class="icon-thumb_up"></span>
              <span v-for="recommend in rating.recommend" class="item">{{ recommend }}</span>
            </div>
            <div class="time">
              {{ rating.rateTime | formatDate }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
    
  </div>
</template>
<script>
import star from "components/star/star";
import split from "components/split/split";
import ratingselect from "components/ratingselect/ratingselect";
import { formatDate } from "../../common/js/date.js";
import BScroll from "better-scroll";
const POSITIVE = 0;
const NAGATIVE = 1;
const ALL = 2;
export default {
  props: { seller: { type: Object } },
  components: { star, split, ratingselect },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      ratings: [],
      desc: {
        all: "全部",
        positive: "满意",
        negative: "不满意",
      },
    };
  },
  created() {
    this.$http.get("/api/ratings").then((response) => {
      response = response.body;
      if (response.errno == 0) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$els.ratings, { click: true });
        //   console.log(1);
        });
      }
    });
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      //  console.log(date);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
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
  },
  events: {
    select(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    switch(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
  },
};
</script>

<style lang="stylus">
.ratings
  position absolute
  top 174px
  left 0
  bottom 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7,17,27,0.1)
      text-align center
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255,153,0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7,17,27)
      .rank

        line-height 10px
        font-size 10px
        color rgb(147,153,159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          display inline-block
          font-size 12px
          line-height 18px
          color rgb(7,17,27)
        .star
          display inline-block
          vertical-align top
          margin 0 12px
        .score
          display inline-block
          vertical-align top
          font-size 12px
          line-height 18px
          color rgb(255,153,0)
      .delivery-wrapper
        font-size 12px
        line-height 18px
        .title
          color rgb(7,17,27)
          margin-right 12px
        .time
          color rgb(147,153,159)
  .rating-wrapper
    padding 0 18px
    .rating-item
        display flex
        padding 18px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img 
              border-radius 50%
        .content
            flex 1
            position relative
            .name
                margin-bottom 4px
                line-height 12px
                font-size 10px
                color rgb(7,17,27)
            .star-wrapper
                
                margin-bottom 6px
                font-size 0
                .star
                  display inline-block
                  vertical-align top
                  margin-right 6px
                .delivery
                    display inline-block
                    font-size 10px
                    font-weight 200
                    line-height 12px
                    color rgb(147,153,159)
                    vertical-align top
            .text
                margin-bottom 8px
                font-size 12px
                line-height 18px
                color rgb(7,17,27)
            .recommend
                line-height 16px
                font-size 0
                .icon-thumb_up,.item
                  display inline-block
                  margin 0 8px 4px 0
                  font-size 9px
                .icon-thumb_up
                    color rgb(0,160,220)
                .item
                    padding 0 6px
                    border 1px solid rgba(7,17,27,0.1)
                    border-radius 1px
                    text-align center
                    color rgb(147,153,159)
                    background #ffffff
            .time
                position absolute
                right 0
                top 0
                line-height 12px
                font-size 10px
                color rgb(147,153,159)





</style>
