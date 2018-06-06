<template>
  <div class="vh100">
    
    <header>
      <mt-header fixed title="发票管理">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right">
          <a>
            <i class="el-icon-search"></i>
          </a>
        </mt-button>
      </mt-header>
    </header>

    <article>
      <section>
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">
              <a @click="_billing (1)">
                待开票
              </a>
            </mt-tab-item>
            <mt-tab-item id="2">
              <a @click="_billing (2)">
                已索要
              </a>
            </mt-tab-item>
            <mt-tab-item id="3">
              <a @click="_billing (3)">
                已结束
              </a>
            </mt-tab-item>
          </mt-navbar>

          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="i" v-for="(i, index) in list" :key="index">
              <div class="line-30">请在确认后一个月内索要发票</div>
              <div class="bf">
                <ul>
                  <div class="flex flex-center" v-show="datas.length === 0" style="color:RGB(46,204,113)">
                    <mt-spinner type="snake" color="RGB(46,204,113)"></mt-spinner>&nbsp;&nbsp;&nbsp;加载中。。
                  </div>
                  
                  <li class="li1" v-for="(item, index) in datas" :key="index">
                    <div class="top flex bet align-center">
                      <div>订单编号：{{item.order_no}}</div>
                      <div>{{item.time}}</div>
                    </div>
                    <div class="bottom">
                      <ul>
                        <li class="flex align-center li2">
                          <div class="img">
                            <router-link to="">
                              <img v-lazy="item.goods.image" alt="">
                            </router-link>
                          </div>
                          <div class="box flex1 flex col bet">
                            
                            <div class="flex">
                              <span class="type">
                                <img src="../../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.goods.cate_type === 1">
                                <img src="../../../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                              </span>
                              <router-link to="">
                                <span class="description">{{item.goods.name}}</span>
                              </router-link>
                            </div>
                            <!-- <div class="flex">
                              <span class="sold">已售：{{item.goods.sola}}</span>
                              <span class="specification">{{item.goods.shu_price}}</span>
                            </div> -->
                            <div class="flex price bet align-center">
                              <span class="cf0">￥{{item.goods.goods_price}}</span>
                              <span class="caa">x {{item.goods.number}}</span>
                            </div>
                          </div>
                          <div class="flex col flex-center" v-show="i == 1">
                            <router-link :to="{ path: `/user/invoice/${item.id}/${userInfo.datas.id}` }">开票</router-link>
                          </div>
                          <div class="flex col flex-center" v-show="i == 2">
                            <router-link :to="{ path: `invoiceDetail/${item.id}/state/2` }">详情</router-link>
                          </div>
                          <div class="flex col flex-center" v-show="i == 3">
                            <router-link :to="{ path: `invoiceDetail/${item.id}/state/1` }">详情</router-link>
                          </div>
                        </li>
                      </ul>
                    </div> 
                  </li>
                </ul>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
          
      </section>
     <!-- <footer v-show="selected == '1'">
       <div class="left flex bet f23">
        <div><el-radio v-model="radio" label="1">全选</el-radio></div>
        <div>合计：<span class="total cf0">¥ 90</span></div>
       </div>
       <div class="right flex-center">
         索要发票(<span>1</span>)
       </div>
     </footer> -->
    </article>  
  </div>
</template>
<script>
  import { billing } from '../../../api/shoporder'
  import { getStore } from '/utils/storage.js'  // 缓存的用户信息
  export default {
    data () {
      return {
        userInfo: '',
        selected: '1',
        radio: '1',
        list: ['1', '2', '3'],
        datas: []
      }
    },
    methods: {
      // 开票信息 (GET) （userId:用户id）【未开票：kaipiao=1】【在开票：kaipiao=2】【开票结束：kaipiao=3】 billing?userid=370&kaipiao=1
      _billing (i) {
        this.datas = []
        billing({
          params: {
            userid: this.userInfo.datas.id,
            kaipiao: i
          }
        }).then(res => {
          this.datas = res
          console.log(this.datas)
        })
      }
    },
    created () {
      this.userInfo = JSON.parse(getStore('userInfo'))
      this._billing(1)
    }
  }
</script>
<style>
.el-radio__inner{
  width: 0.38rem;
  height: 0.38rem;
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>

  header{
    height: 40px;
  }

  article {
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .line-30{
      padding-left: 0.4rem; font-size: 0.2rem; color: #656D78;
    }
    section{
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
    footer {
      height: 1rem; display: flex;
      .left{
        background: #F9F9F9; flex: 1; align-items: center; padding: 0 0.2rem;
        .total{
          font-size: 0.28rem;
        }
      }
      .right{
        background: #79EE4B; width: 2rem; font-size: 0.28rem;
      }
    }
  }


</style>
