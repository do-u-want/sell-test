<template>
  <div class="seller" v-el:seller>
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span
              >元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span
              >元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span
              >分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
            <span class="icon-favorite" :class="{'active':favorite===true}" @click="loveOrNot"></span>
            <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{ seller.bulletin }}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li
            class="support-item boder-1px"
            v-for="(item, index) in seller.supports"
            :key="index"
          >
            <span
              class="icon"
              :class="classmap[seller.supports[$index].type]"
            ></span>
            <span class="text">{{ seller.supports[$index].description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" v-el:pic>
              <ul class="pic-list" v-el:pic-list>
                  <li class="pic-item" v-for="pic in seller.pics">
                      <img :src="pic" alt="" width="120" height="90">
                  </li>
              </ul>
          </div>
      
      
      </div>
      <split></split>
      <div class="info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
              <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from "components/star/star";
import split from "components/split/split";
import BScroll from "better-scroll";
import  {saveToLocal,loadFromLocal} from '../../common/js/store'
export default {
  props: { seller: { type: Object } },
  components: { star, split },
  data() {
      return {
          favorite:(()=>{
            return loadFromLocal(this.seller.id,'favorite',false);
          })(),
          
      }
  },
  created() {
    this.classmap = ["decrease", "discount", "special", "guarantee", "invoice"];
  },
  computed: {
    favoriteText(){
      return this.favorite?'已收藏':'收藏';
    }
  },
  watch: {
    seller() {
      this.$nextTick(() => {
        if (!this.BS) {
          this.BS = new BScroll(this.$els.seller, { click: true });
          // console.log(1);
        } else {
          this.BS.refresh();
        }
      });
      this.$nextTick(() => {
        if(this.seller.pics){
        let picWidth=120;
        let margin=6;
        let width=(picWidth+margin)*this.seller.pics.length-margin;
        this.$els.picList.style.width=width+'px';
         this.$nextTick(() => {
        if (!this.pic) {
          this.pic = new BScroll(this.$els.pic, { click: true ,scrollX:true,eventPassthrough:'vertical'});
          // console.log(1);
        } else {
          this.pic.refresh();
        }
      });

    };
      });
    },
  },
  ready() {
    this.$nextTick(() => {
      if (!this.BS) {
        this.BS = new BScroll(this.$els.seller, { click: true });
        // console.log(1);
      } else {
        this.BS.refresh();
      }
    });
    // if(this.seller.pics){
    //     let picWidth=120;
    //     let margin=6;
    //     let width=(picWidth+margin)*this.seller.pics.length-margin;
    //     this.$els.picList.style.width=width+'px';
    //      this.$nextTick(() => {
    //     if (!this.pic) {
    //       this.pic = new BScroll(this.$els.pic, { click: true ,scrollX:true,eventPassthrough:'vertical'});
    //       // console.log(1);
    //     } else {
    //       this.pic.refresh();
    //     }
    //   });

    // };
    
  },
  methods: {
      loveOrNot(){
          this.favorite=!this.favorite;
          // console.log(this.favorite)
          saveToLocal(this.seller.id,"favorite",this.favorite);
          // console.log(2)
          
      }
  },
};
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl";
  .seller
    position absolute
    top 174px
    left 0
    bottom 0
    width 100%
    overflow hidden
    .overview
        padding 18px
        position relative
        .title
            margin-bottom 8px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
        .favorite
            position absolute
            right 18px
            top 18px
            // width 40px
            text-align center
            .icon-favorite
              display block
              padding-bottom  4px
              line-height 24px
              font-size 24px
              color #d4d6d9 
              // width 40px
              &.active
                color rgb(240,20,20)
            .text
              display block
              line-height 10px
              font-size 10px
              color rgb(77,85,93)
              width 30px
        .desc
            padding-bottom 18px
            line-height 18px
            font-size 0
            border-1px(rgba(7,17,27,0.1))
            // border-bottom 1px solid
            .star
                display inline-block
                margin-right 8px
                vertical-align top
            .text
                display inline-block
                margin-right 12px
                line-height 18px
                font-size 10px
                color rgb(77,85,93)
        .remark
            display flex
            padding 18px 0
            .block
                flex 1
                text-align center
                border-right 1px solid rgba(7,17,27,0.1)
                &:last-child
                    border none
                .title
                    margin-bottom 4px
                    line-height 10px
                    font-size 10px
                    color rgb(147,153,159)
                .content
                    font-size 10px
                    font-weight 200
                    line-height 24px
                    color rgb(7,17,27)
                    .stress
                        font-size 24px
    .bulletin
        padding 18px 18px 0 18px
        .title
            margin-bottom 8px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
        .content-wrapper
            padding 0 12px 16px 12px
            border-1px(rgba(7,17,27,0.1))
            .content
                line-height 24px
                font-weight 200
                font-size 12px
                color rgb(240,20,20)
        .supports
            .support-item
                padding 16px 12px
                border-1px(rgba(7,17,27,0.1))
                font-size 0
                &:last-child
                    border none 
                .icon
                  display inline-block
                  width 16px
                  height 16px
                  vertical-align top
                  margin-right 6px
                  background-size 16px 16px
                  background-repeat no-repeat
                  &.decrease
                    bg-image('decrease_4')
                  &.discount
                    bg-image('discount_4')
                  &.guarantee
                    bg-image('guarantee_4')
                  &.invoice
                    bg-image('invoice_4')
                  &.special
                    bg-image('special_4')
                .text
                    font-size 12px
                    font-weight 200
                    color rgb(7,17,27)
                    line-height 16px
    .pics
        padding 18px
        .title
            margin-bottom 12px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
        .pic-wrapper
            width 100%
            overflow hidden
            white-space nowrap
            .pic-list
                font-size 0
                .pic-item
                    display inline-block
                    margin-right 6px
                    width 120px
                    height 90px
                    &:last-child
                        margin 0
    .info
        padding  18px 18px 0 18px
        .title
            padding-bottom 12px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
            border-1px(rgba(7,17,27,0.1))
        .info-item
            padding 16px 12px
            border-1px(rgba(7,17,27,0.1))
            line-height 16px
            font-size 12px
            font-weight 200
            color rgb(7,17,27)
            &:last-child
                border none 
</style>
