<!--商品详情-->
<template>
  <div>
    <header class="headerBack">
      <mt-header fixed>
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right">
          <div class="flex-center">
            <span>
              <i class="el-icon-share" style="font-size:0.35rem"></i>
            </span>
            <router-link to="/cart" style="margin-left: 0.5rem;margin-right: 0.2rem;">
              <span class="gps">
                <img src="../../assets/img/icon/cart.png" alt="" 
                style="width:0.35rem;">
                <span v-show="totalNum() !== 0" style="position: absolute;top: -0.2rem;right: -0.2rem;font-size: 0.2rem;color: red;">{{totalNum()}}</span>
              </span>
            </router-link>
          </div>
        </mt-button>
      </mt-header>
    </header>
    <section class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in goods.datas" :key="index">
          <img v-lazy="item.img" alt="" style="height:5.5rem; width:100%">
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <section class="product bf">
      <div class="title">
        <!-- <img :src="goods.datas[0].cate_type" alt="" style="display: inline-block;width:0.36rem; height:0.24rem"> -->
        <span style="font-size:0.32rem;margin-left:0.15rem">{{goods.datas[0].name}}</span>
      </div>
      <div class="price">
        <!-- <span style="color: #F05F5F">¥<big style="font-size:0.4rem">{{goods.datas[0].shuxing2.xiangprice || goods.datas[0].shu_price}}</big></span> -->
        <span style="color: #F05F5F">¥<big style="font-size:0.4rem">{{CidPrice3 || goods.datas[0].price}}</big></span>
      </div>
      <div class="weight">
        <span>{{CidPrice2 || goods.datas[0].shu_price}}</span>
      </div>
      <div class="bottom caa">
        <div>
          <span>配送区域:{{goods.datas[0].range}}</span>
          <span>库存:{{goods.datas[0].shuxing2.kucun || goods.datas[0].goodskc}}</span>
          <span>销量:{{goods.datas[0].sale}}</span>
        </div>
        <div>
          <el-row>
            <el-col :span="5" style="text-align:left"><div class="grid-content bg-purple">发货日期:</div></el-col>
            <el-col :span="19">
              <span v-if="goods.datas[0].cate_type == 4">
                <div class="grid-content bg-purple-light t-left">
                <span class="radio-btn" :class="{act: index === isDid}" v-for="(item, index) in goods.datas[0].dtimes" :key="index" @click="_changeDidPrice(index, item)">{{item.daotime}}</span>
              </div>
              </span>
              <span v-else>现货</span>
            </el-col>
          </el-row>
          <!-- <span>产品上线时间:{{goods.datas[0].create_time}}</span> -->
          <!-- <span>发货日期:
            <span v-if="goods.datas[0].cate_type == 4">

            </span>
            <span v-else>现货</span>
          </span> -->
          <!-- <span>重量:{{goods.datas[0].weight}}</span> -->
        </div>
        <div v-if="!(goods.datas[0].zhiliang == null)">
          <span>质量标准：{{goods.datas[0].zhiliang}}</span>
        </div>
        <div v-else>
          <span>免赔率：{{goods.datas[0].exemption}}</span>
          <span>破壳率：{{goods.datas[0].broken}}</span>
          <span>缩水率：{{goods.datas[0].shrinkage}}</span>
        </div>
        <div>
          <el-row>
            <el-col :span="5" style="text-align:left"><div class="grid-content bg-purple">包装规格:</div></el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple-light t-left">
                <span class="radio-btn" :class="{act: index === isBid}" v-for="(item, index) in goods.datas[0].baozhuang" :key="index" @click="_changeBidPrice(index, item)">{{item.battrname}}</span>
              </div>
            </el-col>
          </el-row>
          <!-- <span>
            
          </span>
          <el-row>
              <el-button size="mini" ></el-button>
            </el-row> -->
        </div>
        <div>
          <el-row>
            <el-col :span="5" style="text-align:left"><div class="grid-content bg-purple">产品规格:</div></el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple-light t-left">
                <span class="radio-btn" :class="{act: index === isCid}" v-for="(item, index) in goods.datas[0].shuxing" :key="index" @click="_changeCidPrice(index, item)">{{item.cattrname}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </section>
    <section class="comment bf">
      <div class="line-30 flex bet">
        <span class="caa">用户评论（{{goods.datas[0].pinglun.length}}条）</span>
        <span>好感度：<big class="c2a">100%</big></span>
      </div>
      <!-- <div class="line-30 hasImg">
        <router-link to="">
          <span>全部</span>
        </router-link>
        <router-link to="">
          <span class="active">有图</span>
        </router-link>
      </div> -->
      <ul>
        <li v-for="(item, index) in goods.datas[0].pinglun" :key="index">
          <router-link to="">
            <div class="top flex bet" style="align-items:  center;">
              <div class="flex" style="align-items:  center;">
                <img v-lazy="item.h_img" alt="" style="width:0.64rem;height:0.64rem;">
                <span style="margin-left:0.4rem">{{item.name}}</span>
              </div>
              <div>{{item.create_time}}</div>
            </div>
            <div class="bottom" style="marigin-top:0.28rem; font-size: 0.26rem" v-html="item.content"></div>
          </router-link>
        </li>
      </ul>
    </section>
    <aside>
      <a>
        <div class="more">
          <div class="line-80">
            <a @click="_pinlunall()">{{msg}}</a>
          </div>
        </div>
      </a>
    </aside>
    <footer>
      <ul class="flex">
        <li class="calc">
        <div class="flex">
          <a class="flex1" @click="_math()">-</a>
          <span class="flex1">{{num}}</span>
          <a class="flex1" @click="_increase(goods.datas[0])">+</a>
        </div>
        </li>
        <li v-show="goods.datas[0].cate_type == 1 || goods.datas[0].cate_type == 4">
          <a @click="addCart(goods.datas[0])" style="display:block">
            加入购物车
          </a>
        </li>
        <li v-show="goods.datas[0].cate_type == 1 || goods.datas[0].cate_type == 4">
          <a style="display:block" @click="addCart(goods.datas[0]),$router.push('/cart')">
            购买
          </a>
        </li>
        <li v-show="goods.datas[0].cate_type == 2">
          <router-link :to="{name: 'preOrder', params: {data: goods.datas[0]}}" style="display:block">
            预购
          </router-link> 
        </li>
      </ul>
    </footer>
  </div>
  
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import { footprint, infogood, pinlunall } from '../../api/index'
  import { getStore } from '../../utils/storage'
  export default {
    data () {
      return {
        msg: '查看更多评论 >',
        id: '',
        // product: {
        //   id: 1, title: '澳洲黑毛和牛', type: require('../../assets/img/icon/qihuo.png'), price: 90, weight: '500g', area: '上海外地', inventory: '3000箱', turnover: '200笔', uptime: '2017.09.20--2017.10.10', franchise: '5%', broken: '不可能', shrinkage: '3%'
        // },
        banners: [
          {id: 1, src: require('../../assets/img/goods/1.png'), href: ''},
          {id: 2, src: require('../../assets/img/goods/1.png'), href: ''},
          {id: 3, src: require('../../assets/img/goods/1.png'), href: ''}
        ],
        commentList: [
          {id: 1, src: require('../../assets/img/user/face2.png'), name: '151123123', postTime: '2017-08-12', content: '牛肉很鲜，牛肉很鲜牛肉很鲜牛肉很鲜，牛肉很鲜，牛肉 很鲜，牛肉很鲜，牛肉'},
          {id: 2, src: require('../../assets/img/user/face2.png'), name: '151123123', postTime: '2017-08-12', content: '牛肉很鲜，牛肉很鲜牛肉很鲜牛肉很鲜，牛肉很鲜，牛肉 很鲜，牛肉很鲜，牛肉'}
        ],
        goods: [],
        num: 1,
        isBid: null,
        isCid: null,
        isDid: null,
        BidPrice: null,
        CidPrice: null,
        CidPrice2: null,
        CidPrice3: null,
        fhtime: null // 发货日期
      }
    },
    methods: {
      ...mapMutations(['ADD_CART']),
      addCart (data) {
        let tot = 0
        this.cartList.map(item => {
          if (item.id === data.id) {
            tot += item.productNum
          }
        })
        console.log(tot)
        tot = data.goodskc - tot
        console.log(tot)
        if (tot < 1) {
          this.$message.warning('库存不足')
        } else {
          this.ADD_CART({
            productId: data.id,
            productPrice: data.price,
            productName: data.name,
            productImg: data.img,
            productNum: this.num,
            porduct: data
          })
        }
      },
      // 更多评论 ?goodid=222&limit=3
      _pinlunall () {
        pinlunall({
          params: {
            goodid: this.$route.params.data,
            limit: this.goods.datas[0].pinglun.length
          }
        }).then(res => {
          if (res.datas.length === 0) {
            this.msg = '已经没有评论了'
            return
          }
          res.datas.forEach(item => {
            this.goods.datas[0].pinglun.push(item)
          })
        })
      },
      // 计算总数量
      totalNum () {
        let totalNum = 0
        this.cartList && this.cartList.forEach(item => {
          totalNum += (item.number)
        })
        return Number(totalNum)
      },
      _math () {
        if (this.num - 1 <= 1) {
          this.num = 1
        } else {
          this.num--
        }
      },
      _increase (data) {
        let tot = 0
        this.cartList.map(item => {
          if (item.id === data.id) {
            tot += item.productNum
          }
        })
        console.log(tot)
        tot = data.goodskc - tot
        console.log(tot)
        if (this.num + 1 >= tot) {
          this.$message.warning('库存不足')
          this.num = tot
        } else {
          this.num++
        }
      },
      _infogood () {
        // 详情信息 （GET）data（id:商品id；name：商品名；img：商品图；price：价格；sale：销量；shu_price：属性价格；shu:属性名；create_time：添加时间；重量：weight）data【’pinglun‘】(id：评论id；name：用户名称；头像：h_img；content：评论内容；create_time：时间)
        infogood({
          params: {
            goodid: this.$route.params.data
          }
        }).then(res => {
          this.goods = res
        })
      },
      isNull (data) {
        if (Object.is(data, null) || Object.is(data, '')) {
          return 0
        } else {
          return parseInt(data)
        }
      },
      _changeBidPrice (index, item) {
        this.isBid = index
        // this.BidPrice = item.shuprice
        // this.goods.datas[0].price = this.isNull(this.BidPrice) + this.isNull(this.CidPrice)
        this.goods.datas[0].baozhuang2 = item
      },
      _changeCidPrice (index, item) {
        this.isCid = index
        this.CidPrice = this.filterPrice(item.xiangprice)
        this.CidPrice2 = item.xiangprice
        this.CidPrice3 = item.shuprice
        // this.goods.datas[0].price = this.isNull(this.BidPrice) + this.isNull(this.CidPrice)
        // this.goods.datas[0].price = this.CidPrice
        this.goods.datas[0].shu_price = this.CidPrice
        this.goods.datas[0].shuxing2 = item
      },
      _changeDidPrice (index, item) {
        this.isDid = index
        this.fhtime = item.daotime
        this.goods.datas[0].fhtime = item.daotime
      },
      filterPrice (data) {
        const result = data.split('/')
        return result[0]
      }
    },
    computed: {
      ...mapState(['showCart', 'cartList'])
    },
    created () {
      this._infogood()
      if (JSON.parse(getStore('userInfo')).datas.id) {
        this.id = JSON.parse(getStore('userInfo')).datas.id
        // 添加足迹 （GET） userid=1&goodid=1
        footprint({
          params: {
            userid: this.id,
            goodid: this.$route.params.data
          }
        })
      }
    }
  }
</script>
<style>
.mint-header{
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

<style lang="scss" scoped>
  .headerBack{
    height: 40px;
    position: fixed;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.2);
  }
  .swipe {
    height: 5.5rem; position: relative; z-index: 8; margin-top: 40px;
  }
  .product{
    text-align: center; padding-top: 0.3rem; margin-bottom: 0.34rem;
  }
  .title{
    margin-bottom: 0.28rem; padding: 0 0.4rem;
  }
  .price{
    margin-bottom: 0.18rem;
  }
  .weight{
    color: #2ABA66; border-radius: 0.25rem; width: 2.5rem; height: 0.5rem;
    border: 0.02rem solid #2ABA66; display: flex; justify-content: center; align-items: center; font-size: 0.24rem; margin: 0 auto;
  }
  .bottom{
    padding: 0.4rem;
  }
  .bottom>div{
    display: flex; margin-bottom: 0.4rem; justify-content: space-between;
  }
  .radio-btn {
    font-size: 0.22rem; border: 1px solid gray; padding: 0.1rem; display: inline-block; margin: 0 0.05rem 0.05rem 0;
  }
  .act {
    color: black;
    background-color: #2ABA66;
  }
  .t-left {
    text-align: left;
  }
  // 评论
  .comment{
    padding: 0.3rem 0.4rem; margin-bottom: 0.2rem;
  }
  .hasImg span{
    display: inline-block; text-align: center; line-height: 0.5rem;
    width: 1.1rem; height: 0.5rem; background: #F1F4F7; border-radius: 0.25rem;
  }
  .hasImg span{
    margin-right: 0.6rem; font-size: 0.26rem;
  }
  .hasImg span.active{
    color: #2ABA66;
  }
  .comment li{
    padding: 0.3rem 0;
  }
  .comment li a{
    color: #656D78;
  }
  // aside
  aside{
    margin-bottom: calc(0.3rem + 50px); font-size: 0.24rem;
  }
  aside a{
    color: #656D78;
  }
  aside .more .line-80{
    justify-content: center
  }
  // footer
  footer{
    position: fixed; bottom: 0; width: 100%;
    height: 1rem;
  }
  footer ul{
    height: 100%;
  }
  footer li{
    width: 1.68rem; text-align: center; line-height: 1rem; font-size: 0.28rem;
  }
  footer .calc{
    flex: 1;
  }
  footer li:nth-child(1)>div{
    width: 2rem; height: 0.6rem; border-radius: 0.3rem; background: #F1F4F7; display: flex; justify-content: space-around; align-items: center;
  }
  footer li:nth-child(1) span{
    font-size: 0.24rem;
  }
  footer li:nth-child(1){
    background: #F9F9F9; display: flex; justify-content: center; align-items: center;
  }
  footer li:nth-child(2){
    background: #79EE4B;
  }
  footer li:nth-child(3){
    background: #2ECC71;
  }
  footer li:nth-child(4){
    background: #2ABA66;
  }
</style>
