<template>
  <div class="star" :class="starType">
    <span  v-show="itemClasses[0].value" :class="itemClasses[0].class"></span>
    <span  v-show="itemClasses[1].value" :class="itemClasses[1].class"></span>
    <span  v-show="itemClasses[2].value" :class="itemClasses[2].class"></span>
    <span  v-show="itemClasses[3].value" :class="itemClasses[3].class"></span>
    <span  v-if="itemClasses[4].value" :class="itemClasses[4].class"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = true;
const CLS_HALF =true;
const CLS_Off = false;
export default {
  props: {
    size: {
      type: Number,
    },
    score: {
      type: Number,
    },
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push({value:CLS_ON,class:'on'});
      }
      if (hasDecimal) {
        result.push({value:CLS_HALF,class:'half'});
      }
      while (result.length < LENGTH) {
        result.push({value:true,class:'off'});
      }
      return result;
    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .star
      font-size 0
      &.star-48
        display inline-block
       >span 
          display inline-block
          width 20px
          height 20px
          margin-right 22px
          // background red
          background-size 20px 20px
          background-repeat no-repeat
          
          &:last-child
            margin-right 0
          &.on
            bg-image('star48_on')
          &.half
            bg-image('star48_half')
          &.off
            bg-image('star48_off')

             

      &.star-36
            >span 
              width 15px
              height 15px
              margin-right 16px
              background-size 15px 15px
              display inline-block
              background-repeat no-repeat
              &:last-child
                  margin-right 0
              &.on
                bg-image('star36_on')
              &.half
                bg-image('star36_half')
              &.off
                bg-image('star36_off')
              
      &.star-24
            >span 
              width 10px
              height 10px
              margin-right 3px
              background-size 10px 10px
              display inline-block
              background-repeat no-repeat
              &:last-child
                  margin-right 0
              &.on
                bg-image('star24_on')
              &.half
                bg-image('star24_half')
              &.off
                bg-image('star24_off')
              
</style>
