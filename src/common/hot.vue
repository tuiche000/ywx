<template>
  <section class="hot">
        <mt-navbar v-model="selected">
          <h5>{{HotData.img}}：</h5>
          <mt-tab-item v-for="(item, index) in HotData.datas" :id="(index + 1)" :key="index">
            <a @click="getGoods(item)">{{item.title}}</a>
          </mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">     
          <mt-tab-container-item v-for="(item, index) in HotData.datas" :id="(index + 1)" :key="index">
            <br>
            <img v-lazy="goods.img" alt="" style="width:100%;height:2.6rem">
            <ul class="productList flex">
              <li v-for="(productItem, productIndex) in goods.datas" :key="productIndex">
                <div class="box">
                  <div>
                    <div class="bott">
                      <div class="gps">
                        <img src="../assets/img/icon/arrow-bot.png" alt="">
                        <div>已售<br>{{productItem.sale}}</div>
                      </div>
                    </div>
                    <router-link :to="{ name: 'goodsDetails', params: { data: productItem.id } }">
                      <img v-lazy="productItem.img" alt="" style="width:100%;height:1.9rem;">
                    </router-link>
                  </div>
                  <div class="flex">
                    <img src="../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="productItem.cate_type == 1">
                    <img src="../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                    
                    <!-- <span class="sold">已售：{{productItem.sale}}</span> -->
                    <span class="specification">{{productItem.shu}}</span>
                  </div>
                  <div class="flex">
                    
                    <span class="description">{{productItem.name}}</span>
                  </div>
                  <div class="flex">
                    <div class="price">
                      {{productItem.price}}
                    </div>
                  </div>
                  <div class="flex align-center">
                    <span class="price">
                      <div class="bot">{{productItem.shu_price}}</div>
                    </span>
                    <a class="add" @click="_ADD_CART(productItem)" v-if="productItem.cate_type == 1">
                      <img src="../assets/img/icon/add.png" alt="">
                    </a>
                    <router-link class="add" :to="{name: 'preOrder', params: {data: productItem}}" style="display:block" v-if="productItem.cate_type != 1">
                      <img src="../assets/img/icon/add2.png" alt="">
                    </router-link>
                  </div>
                </div>   
              </li>
            </ul>
          </mt-tab-container-item>         
        </mt-tab-container>
      </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'hot',
  data () {
    return {
      selected: 1,
      goods: {},
      productNum: 1,
      DetailHotData: this.HotData
    }
  },
  computed: {
    ...mapState(['cartList'])
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    getGoods (item) {
      this.itemVal({
        params: {
          id: item.id
        }
      }).then(res => {
        this.goods = res
      })
    },
    _ADD_CART (data) {
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
          productNum: this.productNum,
          porduct: data
        })
      }
    }
  },
  watch: {
    HotData: function (res) {
      let item = res.datas[0]
      this.getGoods(item)
    }
  },
  props: [
    'HotData', 'itemVal'
  ]
}
</script>

<style>
.mint-navbar{ align-items: center!important; text-align: left!important; }
.mint-navbar .mint-tab-item{ padding: 8px 0!important; margin-left: 0.5rem; flex: none }
.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label { font-size: 0.24rem!important; display: inline-block; border-bottom: 0.04rem solid #2ABA66!important; padding: 8px 0; }
.mint-navbar .mint-tab-item.is-selected { border-bottom: none!important;}
.mint-navbar .mint-tab-item.is-selected a{ color: #2ABA66!important; }
</style>

<style scoped>
/* hot */
.hot{
  font-size: 0.24rem; padding: 0 0.2rem 0.2rem 0.2rem;
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
  padding: 0 0.1rem;
}
.hot .box>div{
  margin-bottom: 0.1rem; justify-content: space-between; align-items: center;
}
.hot .box>div:last-child{
  margin-bottom: 0; align-items: center;
}
.hot .sold, .hot .specification{
  font-size: 0.22rem; color: #AAB2BD;
}
.hot .description{
  font-size: 0.24rem; line-height: 0.32rem; color: #656D78; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.hot .price{
  color: #F05F5F; font-size: 0.24rem;
}
.hot .price .bot{
  font-size: 0.22rem; color: #aab2bd;
}
.hot .add img{
  width: 0.59rem;
}
.bott{
  position: absolute;
  width: 0.6rem;
}
.bott .gps img{
  width: 0.6rem;
}
.bott .gps div{
  position: absolute;
  width: 0.6rem;
  font-size: 0.2rem;
  color: #fff;
  text-align: center;
  left: 0;
  top: 0;
}
</style>
