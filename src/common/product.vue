<template>
  <div style="width:100%">
    <div class="product" v-if="row == 'row'">
      <div class="left flex align-center">
        <router-link :to="{ name: 'goodsDetails', params: { data: rowData.goods.goods_id } }">
          <img :src="rowData.goods.image" alt="">
        </router-link>
      </div>
      <div class="right flex1 flex col bet">                      
        <div class="flex align-center">
            <img src="../assets/img/icon/qihuo.png" alt="" class="type">
            <span class="description">
              <router-link :to="{ name: 'goodsDetails', params: { data: rowData.goods.goods_id } }">
                {{rowData.goods.name}}
              </router-link>
            </span>
        </div>
        <!-- <div class="caa">
          <span>{{rowData.goods.name}}</span>
        </div> -->
        <div class="flex caa align-center">
          <span class="sold">已售：{{rowData.goods.sola}}</span>
          <span class="specification" style="margin-left:0.4rem">{{rowData.goods.attr_price}}</span>
        </div>
        <div class="flex price bet">
          <div>
            <span class="cf0">￥{{rowData.goods.goods_price}}</span>
            <!-- <span class="caa">{{rowData.goods.attr_price}}</span> -->
          </div>
          <span class="num">x {{rowData.goods.number}}</span>
        </div>
      </div>  
    </div>
    <div class="product" v-if="row == 'row1'">
      <div class="left flex align-center">
        <router-link :to="{ name: 'goodsDetails', params: { data: rowData.id } }">
          <img :src="rowData.img" alt="">
        </router-link>
      </div>
      <div class="right flex1 flex col bet">                      
        <div class="flex align-center">
          <img src="../assets/img/icon/qihuo.png" alt="" class="type">
          <span class="description">
            <router-link :to="{ name: 'goodsDetails', params: { data: rowData.id } }">
              {{rowData.name}}
            </router-link>
          </span>
        </div>
        <!-- <div class="caa">
          <span>{{rowData.goods.name}}</span>
        </div> -->
        <div class="flex caa align-center">
          <span class="sold">已售：{{rowData.sale}}</span>
          <span class="specification" style="margin-left:0.4rem">{{rowData.shu_price}}</span>
        </div>
        <div class="flex price bet">
          <div>
            <span class="cf0">￥{{rowData.price}}</span>
            <span class="caa">{{rowData.shu}}</span>
          </div>
          <div>
          <a class="add" @click="addCart(rowData)"><img src="../assets/img/icon/add.png" alt=""></a>
        </div>
        </div>
      </div>  
    </div>
    <div class="product2 col" v-if="row == 'row2'">
      <router-link :to="{ name: 'goodsDetails', params: { data: areaData.id } }">
        <div class="top flex align-center">        
          <img :src="areaData.img" :alt="areaData.name">
        </div>
      </router-link>
      <div class="right flex1 flex col bet">
        <div class="flex caa">
          <span class="sold">已售：1965箱{{areaData.sale}}</span>
          <span class="specification" style="margin-left:0.4rem">600g/箱</span>
        </div>      
        <div class="flex align-center">
          <img src="../assets/img/icon/qihuo.png" alt="" class="type">
          <span class="description">{{areaData.name}}</span>
        </div>
        <!-- <div class="caa">
          <span>美岸 野生 螯龙虾螯龙虾螯龙虾螯龙</span>
        </div> -->
        
      </div>
      <div class="flex price bet">
        <div>
          <span class="cf0">￥{{areaData.price}}</span>
          <!-- <span class="cf0">￥{{areaData.price}}<span class="small">/500g</span></span> -->
          <span class="caa">¥900.00/箱</span>
        </div>
        <div>
          <a class="add" @click="addCart(areaData)"><img src="../assets/img/icon/add.png" alt=""></a>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    // 添加购物车
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
          productNum: this.productNum,
          porduct: data
        })
      }
    }
  },
  computed: {
    ...mapState(['showCart', 'cartList'])
  },
  props: [
    'row', 'areaData', 'rowData'
  ]
}
</script>

<style lang="scss" scoped>
  .description{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .product{
    width: 100%;
    display: flex;
    background: #fff;
    .left{
      width: 25%;
      img{
        width: 1.56rem;
        height: 1.14rem;
      }
    }
    .right{
      width: 75%;
      padding-left: 0.3rem;
      & > div{
        margin-top: 0.1rem; white-space: nowrap;
      }
      & > div:first-child{
        margin-top: 0;
      }
      .type{       
        width: 0.35rem; height: 0.23rem;
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
        font-size: 0.28rem;
        align-items: baseline;
        .caa{
          font-size: 0.22rem;
          margin-left: 0.27rem;
        }
        .num{
          color: #AAB2BD;
          float: right;
          font-size: 0.24rem;
        }
        .add{
          img{
            display: inline-block;
            width: 0.59rem;
          }
        }    
      }
    }      
  }
  .product2{
    display: flex;
    background: #fff;
    .top{
      flex: 1;
      justify-content: center;
      img{
        width: 100%;
        height: 2rem;
      }
    }
    .right{
      flex: 2;  
      & > div{
        margin-top: 0.1rem
      }
      & > div:first-child{
        margin-top: 0;
      }
      .type{       
        width: 0.35rem; height: 0.23rem;
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
    }
    .price{
      flex: 1;
      font-size: 0.28rem;
      .small{
        font-size: 0.2rem;
      }
      .add{
        img{
          display: inline-block;
          width: 0.59rem;
        }
      }
      .caa{
        font-size: 0.22rem;
        }
        .num{
          color: #AAB2BD;
          float: right;
          font-size: 0.24rem;
        }    
    }
  }
</style>
