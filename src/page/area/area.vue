<template>
  <div class="bf">
    <header>
      <mt-header fixed :title="$route.params.data.title">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </header>

    <div class="box">
      <img v-lazy="$route.params.data.image" alt="" width="100%">
      <el-row>
        <el-col :span="8" v-for="(item, index) in areaData" :key="index">
          <div :id="item.id">
            <product-vue row="row2" :areaData="item"></product-vue>
          </div>
        </el-col>
      </el-row>
      <div class="line-30 center caa f28" @click="loadMore()">{{loadingMsg}}</div>
      
    </div>
    
    <footer class="flex">
        <div class="flex1 total">
          总计：<span class="cf0">¥{{checkPrice()}}</span>
        </div>
        <div class="cart flex-center">
          <router-link to="/cart">
            <img src="../../assets/img/icon/cart.png" alt=""> 购物车
          </router-link>
        </div>
      </footer>

  </div>
</template>

<script>
import { largeinfo } from '../../api/index'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      data: [
        {id: 1, title: '果蔬', banner: require('../../assets/img/index/2.png')},
        {id: 2, title: '果蔬', banner: require('../../assets/img/index/2.png')},
        {id: 3, title: '果蔬', banner: require('../../assets/img/index/2.png')},
        {id: 4, title: '干货', banner: require('../../assets/img/index/2.png')},
        {id: 5, title: '特色', banner: require('../../assets/img/index/2.png')},
        {id: 6, title: '其它', banner: require('../../assets/img/index/2.png')}
      ],
      areaData: [],
      loadingMsg: '点击加载更多数据'
    }
  },
  methods: {
    getShopnav (loading) {
      let start = this.areaData.length
      // let getGoods = largeinfo
      largeinfo({
        params: {
          id: this.$route.params.data.id,
          limit: start
        }
      }).then(res => {
        console.log(res)
        if (res.datas.length === 0) {
          this.loadingMsg = '已经没有数据啦！'
          loading.close()
          return
        }
        setTimeout(() => {
          res.datas.forEach(item => {
            this.areaData.push(item)
          })
          if (loading) {
            loading.close()
          }
        }, 500)
      }).catch(err => {
        this.$message.warning('没有数据')
        loading.close()
        console.log(err)
      })
    },
    price () {
      let total = this.cartList
      return total
    },
    // 总价格
    checkPrice () {
      let totalPrice = 0
      this.cartList.forEach(item => {
        let itemPrice = parseInt(item.boxprice)
        totalPrice += itemPrice
      })
      console.log(this.cartList)
      return totalPrice
    },
    loadMore () {
      if (this.loadingMsg === '已经没有数据啦！') {
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.getShopnav(loading)
    }
  },
  computed: {
    ...mapState(
      ['cartList']
    )
  },
  created () {
    this.getShopnav()
  }
}
</script>

<style lang="scss" scoped>
.box{
  margin-top: 40px;
  margin-bottom: 1rem;
}
.el-col-8{
  padding: 0.15rem;
}
footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-top: 1rem;
  height: 1rem;
  .total{
    background-color: #f9f9f9;
    padding: 0.4rem;
  }
  .cart{
    width: 3.4rem;
    background-color: #79ee4b;
    img{
      width: 0.34rem; height: 0.34rem;
    }
  }
}
</style>
