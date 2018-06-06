<template>
  <div>
    <mt-header fixed title="结账">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-bottom"> 
      <div class="line-30  caa flex bet">
        地址信息<router-link to="/user/address" class="caa">选择其他地址<i class="el-icon-arrow-right"></i></router-link>
      </div>
      <div class="address" v-if="data1.length">
        <ul class="flex col list">
          <li v-for="(item, index) in data1" :key="index">
            <div class="top flex bet">
              <span>{{item.name}}</span>
              <span>{{item.phone}}</span>
            </div>
            <div class="bottom caa" v-html="item.address"></div>
          </li>
        </ul>
      </div>
      <div class="center" v-else>
        <router-link :to="{ name: 'addressManage', params: { data: 1 } }">
          <button-vue :btnData="{
            size: 's',
            text: '新增地址'
          }"></button-vue>
        </router-link>
      </div>
      <div class="line-30  caa">
        产品信息
      </div>
      <div class="box bf">
        <ul class="ulul">
          <!-- <li v-for="(item, index) in $route.params.data" :key="index">
            <product-vue row="row1" :areaData="item"></product-vue>
          </li> -->
          <li class="flex align-center li2" v-for="(item, index) in List" :key="index">
            <!-- {{item}} -->
            <!-- {{item}} -->
            <div class="img">
              <img v-lazy="item.img" alt="">
            </div>
            <div class="box flex1 flex col bet">
              
              <div class="flex">
                <span class="type">
                  
                  <img src="../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.cate_type == 1">
                  <img src="../../assets/img/icon/qihuo.png" alt="" v-else>
                </span>
                <span class="description">{{item.goodname}}</span>
              </div>
              <!-- <div class="flex">
                <span class="sold">已售：{{item.sale}}</span>
                <span class="specification">{{item.specification}}</span>
              </div> -->
              <div class="flex price bet align-center">
                <span class="cf0">￥{{item.xprice}}</span>
                <span> {{item.number}} </span>
              </div>
            </div>   
          </li>
        </ul>
        <a @click="popupVisible3 = true" v-if="!d.zhifu">
          <div class="line-24 more">
            <span>全款/订金</span>
            <span>{{payment}} <i class="el-icon-arrow-right"></i></span>
          </div>
        </a>
        <a @click="_popupVisible()">
          <div class="line-24 more">
            <span>物流选择</span>
            <span>{{logistics}} <i class="el-icon-arrow-right"></i></span>
          </div>
        </a>
        <a  @click="popupVisible2 = true">
        <div class="line-24 more">
          <span>支付方式</span>
          <router-link to="">
            <span>{{payid}} <i class="el-icon-arrow-right"></i></span>
          </router-link>
        </div>
        </a>
        <!-- <a  @click="popupVisible3 = true">
        <div class="line-24 more">
          <span>折扣券</span>
          <router-link to="">
            <span>5张可用 <i class="el-icon-arrow-right"></i></span>
          </router-link>
        </div>
        </a> -->
      </div>  
    </div>

    <footer class="flex">
      <div class="flex1 total" v-if="payment == '全款支付'">
        总计：<span class="cf0">¥ {{checkPrice}}</span>
      </div>
      <div class="flex1 total" v-else>
        定金：<span class="cf0">¥ {{ (checkPrice / 10).toFixed(2)  }}</span>
      </div>
      <div class="cart flex-center">
        <a @click="_goalipay">
          立即支付
        </a>
      </div>
    </footer>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      >
      <div class="pingjiaBox flex col">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="bottom"
      >
      <div class="pingjiaBox flex col">
        <mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible3"
      position="bottom"
      >
      <div class="pingjiaBox flex col">
        <mt-picker :slots="slots3" @change="onValuesChange3"></mt-picker>
      </div>
    </mt-popup>
    <el-dialog
  :title="payTitle"
  :visible.sync="dialogVisible"
  width="70%"
  :before-close="handleClose">
  <span>
    <div v-if="payInfo.payMsg == null">
      金额： <span style="color:red">{{payInfo.money}}</span>
      <img :src="payInfo.url" alt="" width="100%">
    </div>
    <div v-else>
      错误：<span style="color:red">{{payInfo.payMsg}}</span>
    </div>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { address, jiage } from '../../api/users'
import { getStore } from '../../utils/storage'
import { settlnt, cartgoods } from '../../api/shoporder'
import { goalipay, huidiao } from '../../api/index'
export default {
  data () {
    return {
      jiage: null,
      userInfo: {
        userid: 366,
        pwd: 123456
      },
      d: null,
      zongjia: 0,
      zongjia2: 0,
      yunzongjia: 0,
      userInfo2: null,
      List: null,
      goods: [
        {id: 374, num: 2},
        {id: 375, num: 1}
      ],
      totalPrice: 0,
      popupVisible: false,  // 是否弹出
      popupVisible2: false,  // 是否弹出
      popupVisible3: false,  // 是否弹出
      dialogVisible: false, // 支付二维码
      // popupVisible3: false,  // 是否弹出
      logistics: '',  // 物流
      payid: '', // 支付方式
      payment: '', // 是否全款
      slots: [
        {
          flex: 1,
          values: ['自提', '第三方物流', '平台配送'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ['余额', '支付宝', '微信'],
          className: 'slot2',
          textAlign: 'center'
        }
      ],
      slots3: [
        {
          flex: 1,
          values: ['全款支付', '定金(10%)'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      payTitle: '请扫描二维码付款',
      // 支付回调信息
      payInfo: {
        money: null, // 支付多少钱
        url: null, // 支付二维码
        payMsg: null
      },
      alipayForm: null,
      data1: [],
      str: 'asd123'
    }
  },
  methods: {
    ...mapMutations([
      'INIT_BUYCART', 'REMOVE_CART', 'RECORD_USERINFO'
    ]),
    // 支付弹窗关闭提示
    handleClose (done) {
      this.dialogVisible = false
    },
    // 滚动选择表
    onValuesChange (picker, values) {
      this.logistics = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    // 滚动选择表2
    onValuesChange2 (picker, values) {
      this.payid = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
     // 滚动选择表3
    onValuesChange3 (picker, values) {
      this.payment = values[0]
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0])
      }
    },
    // 弹窗开关
    _popupVisible () {
      this.popupVisible = true  // 弹窗出现
    },
    _isWeixin () {
      var ua = navigator.userAgent.toLowerCase()
      var result = !!(/micromessenger/.test(ua))
      if (result) {
        this.slots2 = [
          {
            flex: 1,
            values: ['余额', '微信'],
            className: 'slot2',
            textAlign: 'center'
          }
        ]
      }
    },
    _goalipay () {
      let isNull = function (data) {
        if (data) {
          return data
        } else {
          return ''
        }
      }
      const goods = []
      this.List.map(item => {
        goods.push(
          {
            goodid: item.goodsid,
            number: item.number,
            shuid: isNull(item.shuid),
            shibie: isNull(item.shibie)
          }
        )
      })
      let pid = null
      switch (this.payid) {
        case '余额':
          pid = '1'
          break
        case '支付宝':
          pid = '2'
          break
        case '微信':
          pid = '3'
          break
      }
      ['自提', '第三方物流', '平台配送']
      let pt = null
      switch (this.logistics) {
        case '自提':
          pt = '1'
          break
        case '第三方物流':
          pt = '2'
          break
        case '平台配送':
          pt = '3'
          break
      }
      const prices = this.payment === '全款支付' ? this.checkPrice : (this.checkPrice / 10).toFixed(2)
      const ispayment = this.payment === '全款支付' ? 1 : 2
      goalipay({
        goods: goods,
        payid: pid, // 支付方式这块，余额，你传我payid=‘1’；支付宝传我payid=‘2’；微信传我payid=‘3’
        userid: this.id, // 客户id
        logistics: pt, // 物流：logistics=‘1’；第三方：logistics=2；平台：logistics=‘3’；
        addressid: this.data1[0].id, // 地址id
        prices: prices, // 总计价格
        payment: ispayment
      }).then(res => {
        if (this.payid === '支付宝') {
          const div = document.createElement('div')
          div.style.display = 'none'
          div.innerHTML = res
          document.body.appendChild(div)
          document.forms.alipaysubmit.submit()
          return
        }
        if (this.payid === '余额') {
          const price = this.payment === '全款支付' ? this.checkPrice : (this.checkPrice / 10).toFixed(2)
          if (price > this.jiage) {
            this.$message.error('余额不足')
            return
          }
        }
        if (Object.is(res.status, '1')) {
          switch (this.payid) {
            case '余额':
              // this.userInfo2.datas.money = (parseFloat(this.userInfo2.datas.money) - price).toFixed(2)
              this.RECORD_USERINFO(this.userInfo2)
              this.REMOVE_CART() // 清空购物车
              alert('支付成功！')
              this.$router.push('/')
              break
            case '支付宝':
              break
            case '微信':
              this.dialogVisible = true
              this.payInfo = res.datas
              this.payTitle = '请扫描二维码付款'
              const dingshi = setInterval(() => {
                huidiao({
                  params: {
                    orderno: this.payInfo.order
                  }
                }).then(res => {
                  if (res.status === '1') {
                    clearInterval(dingshi)
                    clearTimeout(dingshi2)
                    alert('支付成功！')
                    this.dialogVisible = false
                    this.REMOVE_CART()
                    this.$router.push('/')
                  }
                })
              }, 3000)
              const dingshi2 = setTimeout(() => {
                alert('支付超时。')
                clearInterval(dingshi)
              }, 1000 * 60 * 2)
              break
          }
        } else {
          this.$message.error('支付失败')
          this.payInfo.payMsg = res.msg
          this.payTitle = '支付失败'
        }
      })
    },
    // 获取用户地址
    _address () {
      address({
        params: {
          userid: this.id
        }
      }).then(res => {
        res.forEach(element => {
          if (element.status === 1) {
            this.data1.push(element)
          }
        })
      })
    },
    _cartgoods () {
      if (this.$route.query) {
        cartgoods({
          params: {
            userid: this.userInfo2.datas.id,
            status: this.$route.query.status,
            shibie: this.$route.query.shibie
          }
        }).then(res => {
          this.List = res.datas
          this.zongjia = res.zongjia
          this.zongjia2 = res.zongjia
          this.yunzongjia = res.yunzongjia
          this.d = res
        })
      } else {
        cartgoods({
          params: {
            userid: this.userInfo2.datas.id
          }
        }).then(res => {
          this.List = res.datas
          this.zongjia = res.zongjia
          this.zongjia2 = res.zongjia
          this.yunzongjia = res.yunzongjia
          this.d = res
        })
      }
    }
  },
  mounted () {
    this.INIT_BUYCART()
  },
  // watch: {
  //   payment: function (res) {
  //     if (res === '定金') {
  //       console.log(res)
  //     }
  //   }
  // },
  created () {
    this._isWeixin()

    settlnt({
      params: {
        users: {
          userid: 366,
          pwd: 123456
        },
        goods: [
          {id: 374, num: 2},
          {id: 375, num: 1}
        ],
        str: this.str
      }
    })
    this.id = JSON.parse(getStore('userInfo')).datas.id
    this.userInfo2 = JSON.parse(getStore('userInfo'))
    this._address(this.userInfo2)
    jiage({
      params: {
        userid: this.userInfo2.datas.id
      }
    }).then(res => {
      this.jiage = res.money
    })
    this._cartgoods()
  },
  computed: {
    checkPrice () {
      return this.logistics !== '自提' ? this.yunzongjia : this.zongjia
    },
    ...mapState(
      ['cartList']
    )
  }
}
</script>

<style lang="scss" scoped>
.header-bottom{
  margin-bottom: 1.3rem;
  .line-30{
    padding: 0.25rem 0.3rem;
  }
  .box{
    padding: 0 0.3rem;
  }
  ul{
    li{
      padding: 0.2rem 0;
    }
  }
  .more{
    display: flex; justify-content: space-between;
  }
}
.ulul{
  .li1{
        padding: 0 0.3rem;
        .top{
          padding: 0.2rem 0;
        }
        
      }
      .li2{
        padding: 0.2rem 0;
        .img img{
          width: 1.56rem;
          height: 1.14rem;
        }
      }
      .box{
        height: 1.14rem;
        img{
          width: 0.36rem; height: 0.24rem;
        }
        .description{
          font-size: 0.23rem; margin-left: 0.15rem;
        }
        .sold {
          font-size: 0.2rem;
        }
        .specification{
          font-size: 0.2rem;
        }
        .price{
          font-size: 0.28rem;
        }
      }
}
.address{
  .btn{
    margin-bottom: 0.6rem;
  }
  .list {
    padding: 0.2rem 0.2rem;
    li{
      border: 0.04rem solid #8077A0;
      background: #F3F1E0;
      font-size: 0.23rem;
      margin-bottom: 0.2rem;
      padding: 0.35rem;
      position: relative;
    }
    .bottom{
      margin-top: 0.24rem;
    }
  }
}
footer{
  height: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
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
.pingjiaBox{
  width: 100vw;
  // height: 50vh;
  background: #fff;
  padding: 0.3rem;
}
</style>
