<template>
  <div>
    <header>
      <mt-header fixed title="购物车">
        <mt-button slot="right">
          <a @click="editFn" v-show="__cartList">
            编辑
          </a>
        </mt-button>
      </mt-header>
    </header>
    <div class="header-bottom">
      <div class="top flex bet align-center">
        <span class="caa flex align-center"> <img src="../../assets/img/icon/youhui.png" alt="" style="height:0.22rem;margin-right:0.1rem">优惠信息/满减公告</span>
        <span><i class="el-icon-arrow-right" style="color:#F05F5F"></i></span>
      </div>
      <div class="bottom bf">
         <ul v-if="__cartList">
            <li class="flex align-center li2" v-for="(item, index) in List" :key="index">
              <div class="radio" v-show="edit" style="margin-right:0.1rem">
                <i class="el-icon-delete" @click="cartEdit('del', item)"></i>
              </div>
              <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                <div class="img">
                  <img :src="item.img" alt="">
                </div>
              </router-link>
              <div class="box flex1 flex col bet">
                
                <div class="flex">
                  
                  <span class="type">
                    <img src="../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.cate_type == 1">
                    <img src="../../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                  </span>
                  <span class="description">{{item.name}}</span>
                </div>
                <!-- <div class="flex" v-show="!edit">
                  <span class="sold">已售：{{item.More.sale}}</span>
                  <span class="specification" style="margin-left:0.3rem">{{item.More.shu}}</span>
                </div> -->
                <!-- <div class="flex">
                  <span class="caa" style="font-size:0.22rem;margin-left:0.3rem">包装规格：{{item.baozhuang2 === true ? item.baozhuang2.battrname : '默认'}}</span>
                  <span class="caa" style="font-size:0.22rem;margin-left:0.3rem">产品规格：{{item.shuxing2 === true ? item.shuxing2.cattrname : '默认'}}</span>
                </div> -->
                <div class="flex price bet align-center">
                  <span class="cf0">￥{{item.shu_price}}
                    <!-- <span class="caa" style="font-size:0.22rem;margin-left:0.3rem">库存：{{item.More.goodskc}}</span> -->
                    <!-- <span class="caa" style="font-size:0.22rem;margin-left:0.3rem">包装规格：{{item.More.baozhuang2.battrname}}</span>
                    <span class="caa" style="font-size:0.22rem;margin-left:0.3rem">产品规格：{{item.More.goodskc}}</span> -->
                    </span>
                  <span class="calc" v-if="edit">
                    <div class="flex">
                      <a class="flex1" @click="cartEdit('reduce', item)" >-</a>
                      <span class="flex1">{{item.number}}</span>
                      <a class="flex1" @click="cartEdit('increase', item, item.goodskc)">+</a>
                    </div>
                    <!-- <el-button size="mini" >-</el-button> <el-button size="mini" >+</el-button> -->
                  </span>

                  <span class="flex1" style="text-align:right" v-else>x {{item.number}}</span>
                  
                </div>
              </div>   
            </li>
          </ul>

       
          <div v-else>
            您的购物车空空如也
          </div>
      </div>
      <footer>
        <div class="flex bet">
          <div class="left flex bet flex1">
            <!-- <div class="flex align-center" v-show="edit">
              <el-button type="text" @click="cartDel (id)">删除全部</el-button>
            </div> -->
            <div class="flex col">
              <div class="flex1 flex align-center">合计：￥{{checkPrice()}}</div>
              <div class="flex1 flex align-center">已优惠 ￥0</div>
            </div>
          </div>
          <!-- <router-link to='/checkout' > -->
          <!-- <router-link :to="{ name: 'checkout', params: { data: cartList } }"> -->
            <div class="right flex-center" @click="_addtocart" v-if="totalNum() > 0">
              结算（{{totalNum()}}）
            </div>
          <!-- </router-link> -->
          <div class="right flex-center" v-else style="background: #434A54; color: #fff">
              没有商品!
          </div>
          <!-- <div class="right flex-center" v-else>
            删除
          </div> -->
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getStore } from '../../utils/storage'
export default {
  data () {
    return {
      radio: '1',
      edit: false,
      all: null,
      userInfo: null,
      List: [],
      order: [
        {id: 1, img: require('../../assets/img/index/6.png'), sale: '1965箱', specification: '600g/箱', type: require('../../assets/img/icon/qihuo.png'), description: '美岸 野生 螯龙 虾螯龙虾', price: '90'},
        {id: 2, img: require('../../assets/img/index/6.png'), sale: '1965箱', specification: '600g/箱', type: require('../../assets/img/icon/qihuo.png'), description: '美岸 野生 螯龙 虾螯龙虾', price: '90'}
      ]
    }
  },
  methods: {
    ...mapMutations([
      'EDIT_CART', 'INIT_BUYCART'
    ]),
    editFn () {
      this.edit = !this.edit
    },
    // 计算总数量
    totalNum () {
      let totalNum = 0
      this.cartList && this.cartList.forEach(item => {
        totalNum += (item.number)
      })
      return Number(totalNum)
    },
    // 总价格
    checkPrice () {
      let totalPrice = 0
      this.cartList.forEach(item => {
        let itemPrice = parseInt(item.boxprice)
        totalPrice += itemPrice
      })
      console.log(totalPrice)
      return totalPrice
    },
    // 编辑购物车
    cartEdit (type, item, maxNum) {
      // if (type === 'del') {
      //   editshopgood({
      //     params: {
      //     }
      //   }).then(res => {
      //     console.log(res)
      //   })
      // }
      this.EDIT_CART({
        product: item,
        type,
        maxNum
      })
    },
    _addtocart () {
      this.$router.push('/checkout')
      // let g = this.cartList
      // let arr = []
      // g.map(item => {
      //   arr.push(item)
      // })
      // console.log(arr)
      // addtocart({
      //   goods: arr,
      //   userid: this.userInfo.datas.id
      // }).then(res => {
      //   console.log(res)
      // })
    }
  },
  created () {
    window.test = this
    this.userInfo = JSON.parse(getStore('userInfo'))
    this.INIT_BUYCART()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route': function () {
    // }
    cartList: function (val) {
      this.$data.List = val
      console.log('list', this.List)
    }
  },
  computed: {
    ...mapState(
      ['cartList']
    ),
    __cartList: function () {
      // this.$set(this, 'List', this.cartList)
      return this.List.length
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bottom{
  .top,.bottom{
    padding: 0.2rem;
  }
   .bottom{
     margin-bottom: 106px;
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
      .calc{
        text-align: center;
        width: 2rem;
        &>div{
          width: 2rem; height: 0.6rem; border-radius: 0.3rem; background: #F1F4F7; display: flex; justify-content: space-around; align-items: center;
        }
        &>span{
          font-size: 0.24rem;
        }
      }
      .box{
        margin-left: 0.2rem;
        height: 1.14rem;
        img{
          width: 0.36rem; height: 0.24rem;
        }
        .description{
          font-size: 0.24rem; margin-left: 0.15rem;
        }
        .sold {
          font-size: 0.22rem;
        }
        .specification{
          font-size: 0.22rem;
        }
        .price{
          font-size: 0.24rem;
        }
      }

      .blue-checkbox-new {
      float: left;
      margin-right: 9px;
    }
      
    }
}
footer{
  position: fixed; left: 0; bottom: 56px; width: 100%;
  background: #F9F9F9;
  .left{
    padding: 0 0.3rem;
  }
  .right{
    width: 2rem; height: 1rem; background: #79EE4B; font-size: 0.28rem;
  }
}
</style>

