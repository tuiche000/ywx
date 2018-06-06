<template>
  <div class="users">
    <article>
      <section>
        <div class="face">
          <img src="../../assets/img/user/face1.png" alt="">
        </div>
        <!-- <div class="btn" v-show="userInfo.status">
          <router-link to="/login">
            <button-vue :btnData="{
            size: 's',
            text: '登陆'
            }">
            </button-vue>
          </router-link>
          <b style="width: 0.6rem; display: inline-block"></b>
          <router-link to="/register">
            <button-vue :btnData="{
              size: 's',
              text: '注册'
            }"></button-vue>
          </router-link>
        </div> -->
      </section>
      <section>
        <div class="flex bet my">
          <div class="left flex col">
            <span>余额</span>
            <div class="balance">
            <h4>{{jiage}}</h4>  
            <!-- <h4>{{_toFixed(userInfo.datas.money, 2)}}</h4>   -->
            </div>
            <div class="recharge">
              <router-link to="/user/recharge" style="color:#fff">
                <span>账户充值 ></span>
              </router-link>
            </div>
          </div>
          <div class="mid flex col">
            <span>保证金</span>
            <div class="balance">
            <h4>{{userInfo.datas.frozenmoney}}</h4>  
            </div>
          </div>
          <div class="right flex-center">
            <router-link to="/user/accountDetails" style="color:#fff">
              <span>账单明细</span>
            </router-link>
          </div>
        </div>     
      </section>
      <section class="order bf">
        <router-link to="">
          <div class="line-80 more">
            <span>我的订单</span>
            <router-link to="/order">
              <span class="caa">查看更多订单 <i class="el-icon-arrow-right"></i></span>
            </router-link>
          </div>
        </router-link>
        <div class="orderState">
          <ul class="flex">
  
            <li v-for="(item, index) in myOrderList" :key="index">
              <router-link :to="item.to" class="flex col">
                <span>
                  <img :src="item.src" alt="">
                </span>
                <span class="bottom">{{item.title}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="logistics flex">
          <span class="caa f20">最新物流</span>
          <img src="../../assets/img/user/1.png" alt="">
          <span class="caa f20">2017/12/7 到达某市某地</span>
        </div>
      </section>
      <section class="histroy bf">
        <router-link to="/order/histroy">
          <div class="line-80 more">
            <span>足迹</span>
            <span class="caa">更多 <i class="el-icon-arrow-right"></i></span>
          </div>
        </router-link>
         <div class="orderState">
          <ul class="flex">
  
            <li v-for="(item, index) in historyList" :key="index" style="width:25%">
              <router-link :to="{ name: 'goodsDetails', params: { data: item.goods_id } }" class="flex col">
                <span>
                  <img v-lazy="item.img" alt="">
                </span>
                <span class="bottom nowrap">{{item.name}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </section>
      <aside>
        <router-link to="/user/business" v-if="userInfo.datas.compaty === 3">
          <div class="line-80 more">
            <span>卖家入口</span>           
          </div>
        </router-link>
        <router-link to="" v-if="userInfo.datas.compaty === 2">
          <div class="line-80 more">
            <span>审核中</span>           
          </div>
        </router-link>
        <router-link to="/user/applySeller" v-if="userInfo.datas.compaty === 1">
          <div class="line-80 more">
            <span>成为卖家</span>           
          </div>
        </router-link>
        <router-link :to="item.to" v-for="(item, index) in asideList" :key="index">
          <div class="line-80 more">
            <span>{{item.title}}</span>           
          </div>
        </router-link>
        <a @click="loginOut()">
          <div class="line-80 more">
            <span>退出登录</span>           
          </div>
        </a>
      </aside>
    </article>
  </div> 
</template>

<script>
import { footinfo } from '../../api/index'
import { jiage } from '../../api/users'
import { getStore, removeStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      jiage: null,
      userInfo: '',
      myOrderList: [
        {src: require('../../assets/img/icon/1.png'), title: '待支付', to: '/order/daifu'},
        {src: require('../../assets/img/icon/2.png'), title: '待收货', to: '/order/daishouhuo'},
        {src: require('../../assets/img/icon/3.png'), title: '待评价', to: '/order/daipingjia'},
        {src: require('../../assets/img/icon/4.png'), title: '售后服务', to: '/user/sxcustomer'}
      ],
      historyList: [
        {src: require('../../assets/img/user/2.png'), title: '魔芋'},
        {src: require('../../assets/img/user/3.png'), title: '刺身拼盘'},
        {src: require('../../assets/img/user/4.png'), title: '鸡尾虾'},
        {src: require('../../assets/img/user/5.png'), title: '贝壳'}
      ],
      asideList: [
        {title: '帮助与客服', to: '/user/sxhelp'},
        {title: '联系我们', to: '/user/aboutUs'},
        {title: '地址管理', to: '/user/address'},
        {title: '发票管理', to: '/user/col'}
      ]
    }
  },
  methods: {
    loginOut () {
      removeStore('buyCart')
      removeStore('userInfo')
      this.$router.push('/home')
    },
    _toFixed (data, num) {
      return parseFloat(data).toFixed(num)
    },
    _footinfo () {
      // userid=1
      footinfo({
        params: {
          userid: this.userInfo.datas.id,
          limit: 'my'
        }
      }).then(res => {
        this.historyList = res.datas
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    jiage({
      params: {
        userid: this.userInfo.datas.id
      }
    }).then(res => {
      this.jiage = res.money
    })
    this._footinfo()
  }
}
</script>

<style lang="scss" scoped>
section{
  display: flex; flex-direction: column;
}
.nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
/* 1 */
section:nth-child(1){
  height: 3.9rem; justify-content: space-around; background: #F8FEFF;
}
.face{
  text-align: center
}
.face img{
  width: 1.7rem; height: 1.7rem;
}
.btn {
  text-align: center
}
/* 2 */
.my{
  width:100%;padding:0 0.4rem
}
.my .left{
  align-items: left;
}
section:nth-child(2){
  height: 2rem; justify-content: center; background: RGB(42,186,102); color: #fff; font-size: 0.24rem; align-items: center; text-align: center
}
.balance h4{
  font-size: 0.6rem;
}
/* 3 */
.more{
  display: flex; justify-content: space-between;
}
.order .orderState{
  height: 1.62rem; border-bottom: 0.03rem solid #F1F4F7;
}
ul{
  height: 100%; align-items: center;
}
li{
  flex: 1; text-align: center; padding: 0.1rem; box-sizing:border-box;
}
.order .orderState img{
  display: inline-block; width: 0.57rem; height: 0.53rem;
}
.order .orderState li .bottom{
  color: #656D78; font-size: 0.2rem; margin-top: 0.1rem;
}
.order .logistics{
  padding: 0.2rem 0.3rem; align-items: center;
}
.order .logistics>*{
  margin-right: 0.24rem;
}
.order .logistics img{
  width: 0.7rem; height: 0.7rem;
}
/* 4 */
.histroy{
  margin-top: 0.3rem;
}
.histroy img{
  width: 100%; height: 1.19rem;
}
/* 5 */
aside{
  margin-top: 0.3rem;
  margin-bottom: 1.2rem;
}
</style>
