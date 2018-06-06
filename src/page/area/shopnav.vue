<template>
  <div class="bf" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="false "
  infinite-scroll-disabled="loading" infinite-scroll-distance="0">
    <header>
      <mt-header fixed title="限时特价">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </header>
    <div class="box">
      <div class="top flex bet">
        <div>限时特价</div>
        <div>
          <span class="time"> {{starttime}}</span>
          &nbsp;&nbsp;:&nbsp;&nbsp;
          <!-- <span class="time">08</span> -->
          <!-- &nbsp;-&nbsp;-&nbsp; -->
          <span class="time">{{endtime}}</span>
          <!-- <span class="time">08</span> -->
        </div>
      </div>
      <el-row>
        <el-col :span="24" v-for="(item, index) in datas" :key="index">
          <div :id="item.id" style="padding:0.2rem 0.3rem">
            <product-vue row="row1" :rowData="item"></product-vue>
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
import { shopnav } from '../../api/index'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      areaData: [],
      loadingMsg: '点击加载更多数据',
      datas: [],
      starttime: '',
      endtime: ''
    }
  },
  methods: {
    getShopnav (loading) {
      let start = this.datas.length
      shopnav({
        params: {
          limit: start
        }
      }).then(res => {
        if (res.datas.length === 0) {
          this.loadingMsg = '已经没有数据啦！'
          loading.close()
          return
        }
        setTimeout(() => {
          this.areaData = res
          res.datas.forEach(item => {
            this.datas.push(item)
          })
          this.starttime = this.timestampToTime(this.areaData.starttime)
          this.endtime = this.timestampToTime(this.areaData.endtime)
          if (loading) {
            loading.close()
          }
        }, 500)
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
        let itemPrice = parseInt(item.More.price.replace(/[^\d.]/g, ''))
        totalPrice += (item.productNum * itemPrice)
      })
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
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000)
      // let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ' - '
      let D = date.getDate() + ''
      let h = date.getHours() + ' : '
      let m = date.getMinutes()
      // let s = date.getSeconds()
      return M + D + '日' + h + m
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
.box .top{
  font-size: 0.28rem; padding: 0.26rem 0.2rem; background: #eee;
}
.box .top>div:last-child{
  display: flex; align-items: center;
}
.box .time{
  font-size: 0.22rem; background: #1B1B1B; border-radius: 0.1rem; padding: 0.05rem; color: #fff;
}
footer{
  position: fixed;
    width: 100%;
    bottom: 0;
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
