<template>
  <div>

    <mt-header fixed title="足迹">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
      <!-- <mt-button slot="right">
        <a @click="edit()">
          编辑
        </a>
      </mt-button> -->
    </mt-header>


    <div class="bot40">
      <ul>
        <li class="flex" v-for="(item, index) in list" :key="index">
          <!-- <product-vue row="row" :rowData="item" class="flex1"></product-vue> -->
          <router-link :to="{ name: 'goodsDetails', params: { data: item.goods_id } }" style="width:100%">
            <div class="product">
              <div class="left flex align-center">
                <img v-lazy="item.img" alt="">
              </div>
              <div class="right flex1 flex col bet">                      
                <div class="flex align-center">
                  <img src="../../assets/img/icon/qihuo.png" alt="" class="type">
                  <span class="description">{{item.name}}</span>
                </div>
                <!-- <div class="caa">
                  <span>{{item.name}}</span>
                </div> -->
                <div class="caa">
                  <span class="sold">已售：{{item.sale}}</span>
                  <span class="specification" style="margin-left:0.4rem">600g/箱</span>
                </div>
                <div class="flex price bet">
                  <div>
                    <span class="cf0">¥{{item.price}}</span>
                    <span class="caa">¥900.00/箱</span>
                  </div>
                  <span class="num">x 99</span>
                </div>
              </div>  
            </div>
          </router-link>
        </li>
      </ul>
      <a class="line-30 center caa f28" style="display:block" @click="_footinfo()">{{loadingMsg}}</a>
      
    </div>
    

  </div>
</template>

<script>
import { footinfo } from '../../api/index'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      editDefault: false,
      userInfo: null,
      list: [],
      loadingMsg: '点击加载更多数据'
    }
  },
  methods: {
    _footinfo () {
      if (this.loadingMsg === '已经没有数据啦') {
        return
      }
      let length = this.list ? this.list.length : 0
      footinfo({
        params: {
          userid: this.userInfo.datas.id,
          limit: length
        }
      }).then(res => {
        if (res.datas.length === 0) {
          this.loadingMsg = '已经没有数据啦'
          return
        }
        res.datas.forEach(element => {
          this.list.push(element)
        })
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    this._footinfo()
  }
}
</script>

<style lang="scss" scoped>
.product{
    width: 100%;
    padding: 0.2rem;
    overflow: hidden;
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
      margin-left: 0.1rem;
      & > div{
        margin-top: 0.22rem;
      }
      & > div:first-child{
        margin-top: 0;
      }
      .type{       
        width: 0.35rem; height: 0.23rem;
      }
      .description{
          font-size: 0.23rem; margin-left: 0.15rem;
      }
      .sold {
        font-size: 0.22rem; width: 100%;
      }
      .specification{
        font-size: 0.22rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
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
      }
    }      
  }
</style>
