<template>
  <div class="footer">

    <mt-tabbar fixed>
        <div class="box" v-for="(item, index) in nav" :key="index">
          <router-link :to="item.to">
            <mt-tab-item :id="item.id">
              <span v-show="( item.id === '购物车' &&  totalNum() !== 0  )" class="num">{{totalNum()}}</span>
              <img slot="icon" :src="item.src" v-if="item.id !== act">
              <img slot="icon" :src="item.act" v-else>
              {{item.id}}
            </mt-tab-item>
          </router-link>
        </div>
      </mt-tabbar>
      

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      act: '首页',
      nav: [
        {id: '首页', src: require('../assets/img/icon/home.png'), act: require('../assets/img/icon/homeAct.png'), to: '/home'},
        {id: '分类', src: require('../assets/img/icon/category.png'), act: require('../assets/img/icon/cartgoryAct.png'), to: '/category'},
        {id: '购物车', src: require('../assets/img/icon/cart.png'), act: require('../assets/img/icon/cartAct.png'), to: '/cart'},
        {id: '个人中心', src: require('../assets/img/icon/my.png'), act: require('../assets/img/icon/myAct.png'), to: '/users'}
      ]
    }
  },
  methods: {
    ...mapMutations([
      'INIT_BUYCART'
    ]),
    // 计算总数量
    totalNum () {
      let totalNum = 0
      this.cartList && this.cartList.forEach(item => {
        totalNum += (item.number)
      })
      return Number(totalNum)
    }
  },
  computed: {
    ...mapState(
      ['cartList']
    )
  },
  watch: {
    $route (to) {
      let path = to.path
      this.nav.forEach(item => {
        if (item.to === path) {
          this.act = item.id
        }
      })
    }
  }
}
</script>

<style>
.mint-tabbar{
  border-top: 1px solid #D0D3D5;
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
/* footer */
.footer{
  margin-top: 56px;
}
.footer .box{
  width: 100%; display: flex;
  a{
    flex:1;
    position: relative;
  }
  .num{
    position: absolute; right: 0.3rem; top: 0.1rem; color: #F05F5F; font-weight: bold; font-size: 0.26rem;
  }
}
</style>
