<template>
  <div class="index">
    <header>
      <div class="center">
        <img src="../../assets/img/logo.png">
        <br>
        <marquee behavior="" direction="" style="color:#2ECC71" class="f23">平台公告：海鲜批发专业平台正式入驻！</marquee>
      </div>
    </header>
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in bannerList" :key="index"> <a :href="item.url"><img :src="item.pic" alt=""></a> </mt-swipe-item>
      </mt-swipe>
    </div>
    <nav>
      <ul class="flex">
        <li v-for="(item, index) in navList" :key="index" class="col">
          <router-link :to="item.href">
            <img :src="item.src" alt="">
          </router-link>
          <div class="bottom">{{item.title}}</div>
        </li>
      </ul>
    </nav>
    <article>
      <!-- 热门推荐 -->
      <hot :HotData="ishots" :itemVal="_ishotgoods"></hot>

      <section class="sale">
        <div class="top flex bet">
          <div>限时特价</div>
          <div>
          <span class="time"> {{starttime}}</span>
          &nbsp;:&nbsp;
          <span class="time">{{endtime}}</span>
            <router-link to="/shopnav"><img src="../../assets/img/icon/arrow-right.png" alt="" class="arrow-right"></router-link>
          </div>
        </div>
        <div class="bottom">
          <ul class="flex">
            <li v-for="(item, index) in sale.datas" :key="index" class="gps">
              <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                <img v-lazy="item.img" :alt="item.name">
                <span>立即抢购</span>
              </router-link>
            </li>
          </ul>
        </div>
      </section>
      
      <!-- 活鲜区 -->
      <hot :HotData="huoxianArea" :itemVal="_freshinfo"></hot>
      <hot :HotData="frozens" :itemVal="_frozeninfo"></hot>
      <hot :HotData="seafood" :itemVal="_frozeninfo"></hot>
      <hot :HotData="isnews" :itemVal="_newinfo"></hot>
      <section class="partition">
        <ul>
          <li v-for="(item, index) in partition" :key="index">
            <router-link :to="{ name: 'area', params: { data: item } }"><img :src="item.image" :alt="item.title" width="100%"></router-link>
          </li>
        </ul>
        
      </section>

    </article>
  </div>
</template> 

<script>
import Hot from '../../common/hot'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
import { banners, ishot, ishotgoods, fresh, freshinfo, seafood, seafoodinfo, frozen, frozeninfo, isnew, newinfo, large, threenav } from '../../api/index.js'
export default {
  data () {
    return {
      userInfo: '',
      bannerList: [],
      navList: [
        {id: 1, src: require('../../assets/img/nav/1.png'), href: '/category', title: '全部分类'},
        {id: 2, src: require('../../assets/img/nav/2.png'), href: '/shopnav', title: '限时特价'},
        {id: 3, src: require('../../assets/img/nav/3.png'), href: '/user/applySeller', title: '成为卖家'},
        {id: 4, src: require('../../assets/img/nav/4.png'), href: '/order/daishouhuo', title: '物流信息'},
        {id: 5, src: require('../../assets/img/nav/5.png'), href: '/users', title: '个人中心'},
        {id: 6, src: require('../../assets/img/nav/6.png'), href: '/cart', title: '购物车'},
        {id: 7, src: require('../../assets/img/nav/7.png'), href: '/user/recharge', title: '账户充值'},
        {id: 8, src: require('../../assets/img/nav/8.png'), href: '/order/all', title: '订单管理'}
      ],
      selected: 1,
      ishots: {},
      huoxianArea: {},
      seafood: {},
      frozens: {},
      isnews: {},
      _ishotgoods: null,
      _freshinfo: null,
      _seafoodinfo: null,
      _frozeninfo: null,
      _newinfo: null,
      partition: [],
      sale: [],
      starttime: '',
      endtime: ''
    }
  },
  methods: {
    getBanners () {
      banners().then(res => {
        this.bannerList = res
      })
    },
    getIshot () {
      ishot().then(res => {
        this.ishots = res
      })
    },
    _fresh () {
      fresh().then(res => {
        this.huoxianArea = res
      })
    },
    _seafood () {
      seafood().then(res => {
        this.seafood = res
      })
    },
    _frozen () {
      frozen().then(res => {
        this.frozens = res
      })
    },
    _isnew () {
      isnew().then(res => {
        this.isnews = res
      })
    },
    _large () {
      large().then(res => {
        this.partition = res.datas
      })
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000)
      // let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() + ' '
      let h = date.getHours() + ':'
      let m = date.getMinutes()
      // let s = date.getSeconds()
      return M + D + h + m
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    this._ishotgoods = ishotgoods
    this._freshinfo = freshinfo
    this._frozeninfo = frozeninfo
    this._newinfo = newinfo
    this._seafoodinfo = seafoodinfo
    this.getBanners()
    this.getIshot()
    this._fresh()
    this._seafood()
    this._frozen()
    this._isnew()
    this._large()
    threenav().then(res => {
      this.sale = res
      this.starttime = this.timestampToTime(this.sale.starttime)
      this.endtime = this.timestampToTime(this.sale.endtime)
    })
  },
  components: {
    Hot
  }
}
</script>

<style scoped>
article section{
  padding: 0 0.2rem;
}
.index{
  background: #fff;
}
/* header */
header {
  padding: 0.2rem 0.24rem;
}
header img{
  width: 50%;
}
/* swipe */
.swipe{
  height: 3.3rem;
}
.swipe img{
  width: 100%;
  height: 100%;
}
/* nav */
nav{
  padding: 0.2rem 0;
}
nav ul{
  flex-wrap: wrap; padding: 0 0.2rem;
}
nav li{
  width: 25%; justify-content: center; align-items: center; margin: 0.3rem 0 0 0;
}
nav img{
  width: 1rem;
}
nav .bottom{
  color:#434A54; font-size: 0.24rem;
}
/* hot */
.hot{
  font-size: 0.24rem; padding: 0.5rem 0.2rem;
}
.hot h5{
  padding: 0.17rem 0; font-size: 0.24rem;
}
.mint-tab-item-label{
  font-size: 0.22rem;
}
.hot ul{
  flex-wrap: wrap;
}
.hot li{
  width: 33.33%; margin-top: 0.2rem;
}
.hot li>img{
  width: 100%;
}
.hot .box{
  padding: 0 0.2rem;
}
.hot .box>div{
  margin-bottom: 0.2rem; justify-content: space-between;
}
.hot .box>div:last-child{
  margin-bottom: 0; align-items: center;
}
.hot .sold, .hot .specification{
  font-size: 0.2rem;
}
.hot .type img{
  width: 0.35rem;
}
.hot .description{
  font-size: 0.22rem; line-height: 0.32rem;
}
.hot .price{
  color: #F05F5F; font-size: 0.28rem;
}
.hot .add img{
  width: 0.59rem;
}
/* sale */
.sale{
  padding: 0;
}
.sale .top{
  font-size: 0.28rem; padding: 0.26rem 0.2rem; background: #eee;
}
.sale .top>div:last-child{
  display: flex; align-items: center;
}
.sale .time{
  font-size: 0.18rem; background: #1B1B1B; border-radius: 0.1rem; padding: 0.05rem; color: #fff;
}
.sale .arrow-right{
  margin-left: 0.3rem;
}
.sale .bottom li{
  height: 2.86rem; flex: 1;
}
.sale .bottom li img{
  width: 100%;
  height: 100%;
}
.sale .bottom li span{
  color: #434A54; font-size: 0.22rem; border-radius: 0.2rem; background: yellow; white-space: nowrap; position: absolute; width: 1.42rem; height: 0.4rem; line-height: 0.4rem; top: 100%; left: 50%; margin-left: -0.71rem; margin-top: -0.7rem; text-align: center;
}
/* partition */
.partition li{
  margin: 0.22rem 0;
}
</style>
 

