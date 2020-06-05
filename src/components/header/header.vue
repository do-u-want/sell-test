<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送到
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classmap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count"> {{ seller.supports.length }}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span
      ><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-add_circle"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%" />
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{ seller.name }}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li
              class="support-item"
              v-for="(item, index) in seller.supports"
              :key="index"
            >
              <span
                class="icon"
                :class="classmap[seller.supports[$index].type]"
              ></span>
              <span class="text">{{
                seller.supports[$index].description
              }}</span>
            </li>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </ul>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import star from "components/star/star";
export default {
  data() {
    return {
      detailShow: false,
    };
  },
  props: {
    seller: {
      type: Object,
    },
  },
  created() {
    this.classmap = ["decrease", "discount", "special", "guarantee", "invoice"];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    close() {
      this.detailShow = false;
    },
  },
  components: {
    star,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import "../../common/stylus/mixin";
.header
  position relative
  color :#fff
  background :rgba(7,17,27,0.5)
  overflow hidden
  .content-wrapper
    padding :24px 12px 18px 24px
    position relative
    font-size :0
    .avatar
      display inline-block
      font-size 14px
      vertical-align top
      img
        border-radius 2px
    .content
      display inline-block
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          // background-image url('brand@2x.png')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left :6px
          font-size :16px
          line-height 18px
          font-weight bold
      .description
        margin-bottom 10px
        line-height 12px
        font-size 12px
      .support
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.specal
            bg-image('special_1')
        .text
          line-height 12px
          font-size 10px
    .support-count
      position absolute
      right 12px
      bottom 14px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background:rgba(0,0,0,0.2)
      text-align center
      .count
        font-size 10px
        vertical-align top
      .icon-keyboard_arrow_right
        font-size 10px
        line-height 24px
        margin-left 2px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    background :rgba(7,17,27,0.2)
    // font-size 0
    .bulletin-title
      display inline-block
      width 22px
      margin-top 8px
      height  22px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      vertical-align top
      line-height 22px
    .bulletin-text
      font-size 10px
      margin 0 4px
      vertical-align top
    .icon-add_circle
      position absolute
      font-size 10px
      right 12px
      top 8px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    z-index 100
    width 100%
    height 100%//父类元素
    overflow auto
    background rgba(7,17,27,0.8)
    top 0
    left 0
    transition all 0.5s
    backdrop-filter blur 10px
    &.fade-transition
      opacity 1
      background rgba(7,17,27,0.8)
    &.fade-enter,&.fade-leave
      opacity 0
      background rgba(7,17,27,0)

    .detail-wrapper
      min-height  100%//最小高度一整页面
      width 100%
      .detail-main
        margin-top   64px
        padding-bottom 64px//向下留出64px
        width 100%
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
          // width 200px
          // margin 0 auto
        .title
          display flex
          width 80%
          margin 28px auto 24px auto
          // height 12px
          .line
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding 0 12px
            font-size 18px
            // margin 0 12px
            font-weight 700
        .supports
          width 80%
          margin 0 auto
          .support-item
            padding 6px 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0px
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              line-height 12px
              font-size  12px
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 0px
            line-height 24px
            font-size 12px
            position relative
            left -14px


    .detail-close
      position relative
      width 32px
      height  32px
      margin -64px auto 0 auto//向上64px
      clear both
      font-size 32px
</style>
