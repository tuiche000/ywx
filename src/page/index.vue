<template>
  <div>
    <transition name="slide-fade">
      <router-view class="main"></router-view>
    </transition>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import YFooter from '/common/footer'
  export default {
    data () {
      return {}
    },
    components: {
      YFooter
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
  @import "../assets/style/mixin";

  // .main {
  //   min-height: calc(100vh - 454px);
  //   // background: #ededed;
  //   overflow: hidden;
  //   width: 100%;
  // }

  .bn {
    border-style: none;
    border-width: 0;
    border: none;
  }

  .move_img {
    position: fixed;
    @include wh(40px);
    width: 45px;
    z-index: 29;
    height: 45px;
    div {
      @extend .bn;
    }
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      display: block;
      @extend .bn;
    }
  }

</style>
