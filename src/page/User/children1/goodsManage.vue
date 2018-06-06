<template>
  <div>
    <mt-header fixed title="商品管理">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
      <mt-button slot="right">
        <a @click="_manage()">
          {{manage.text}}
        </a>
      </mt-button>
    </mt-header>
    <div class="bf">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">上架商品</mt-tab-item>
        <mt-tab-item id="2">下架商品</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul>
            <!-- <div class="flex flex-center" v-show="datas.length === 0" style="color:RGB(46,204,113)">
              <mt-spinner type="snake" color="RGB(46,204,113)"></mt-spinner>&nbsp;&nbsp;&nbsp;加载中。。
            </div> -->

            <li class="li1" v-for="(i, index) in datas" :key="index"> 
              <div class="top flex align-center" style="background: #F1F4F7">
                <div>{{i.title}}</div>
              </div>
              <div class="bottom">
                <ul>
                  <li class="flex align-center li2" v-for="(item, index1) in i.goods" :key="index1">
                    <div class="zhezhao" v-if="item.shenhe === 0">
                      <div>审核中！</div>
                    </div>
                    <div class="zhezhao" v-if="item.shenhe === 2">
                      <div>未通过！</div>
                    </div>
                    <div class="img">
                      <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                        <img v-lazy="item.img" alt="">
                      </router-link>
                    </div>
                    <div class="box flex1 flex col bet">
                      
                      <div class="flex">
                        <span class="type">
                          <img src="../../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.cate_type === 1">
                          <img src="../../../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                        </span>
                        <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                          <span class="description">{{item.name}}</span>
                        </router-link>
                      </div>
                      <!-- <div class="flex">
                        <span class="sold">已售：{{item.sale}}</span>
                        <span class="specification">{{item.shu_price}}</span>
                      </div> -->
                      <div class="flex price bet align-center">
                        <span class="cf0">￥{{item.price}}</span>
                        <span class="caa">已售：{{item.sale}}</span>
                      </div>
                      <div class="flex bet edit" v-show="manage.state">
                        <div>
                          <!-- <router-link :to="`/user/addressManage/:2`"> -->
                          <a @click="_goodstatus(item.id, 0)">
                            <span>下架</span>
                          </a>
                          <router-link style="margin-left:0.5rem;" :to="{ name: 'goodsEdit', params: { id: item.id } }">
                            <span>编辑</span>
                          </router-link>
                          <a style="margin-left:0.5rem;" @click="_delgood(item.id)">
                            <span>删除</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> 
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul>
            <!-- <div class="flex flex-center" v-show="datas.length === 0" style="color:RGB(46,204,113)">
              <mt-spinner type="snake" color="RGB(46,204,113)"></mt-spinner>&nbsp;&nbsp;&nbsp;加载中。。
            </div> -->

            <li class="li1" v-for="(i, index) in datas1" :key="index"> 
              <div class="top flex align-center" style="background: #F1F4F7">
                <div>{{i.title}}</div>
              </div>
              <div class="bottom">
                <ul>
                  <li class="flex align-center li2" v-for="(item, index1) in i.goods" :key="index1">
                    <div class="zhezhao" v-if="item.shenhe === 0">
                      <div>审核中！</div>
                    </div>
                    <div class="zhezhao" v-if="item.shenhe === 2">
                      <div>未通过！</div>
                    </div>
                    <div class="img">
                      <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                        <img v-lazy="item.img" alt="">
                      </router-link>
                    </div>
                    <div class="box flex1 flex col bet">
                      
                      <div class="flex">
                        <span class="type">
                          <img src="../../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.cate_type === 1">
                          <img src="../../../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                        </span>
                        <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                          <span class="description">{{item.name}}</span>
                        </router-link>
                      </div>
                      <!-- <div class="flex">
                        <span class="sold">已售：{{item.sale}}</span>
                        <span class="specification">{{item.shu_price}}</span>
                      </div> -->
                      <div class="flex price bet align-center">
                        <span class="cf0">￥{{item.price}}</span>
                        <span class="caa">已售：{{item.sale}}</span>
                      </div>
                      <div class="flex bet edit" v-show="manage.state">
                        <div>
                          <!-- <router-link :to="`/user/addressManage/:2`"> -->
                          <a @click="_goodstatus(item.id, 1)">
                            <span>上架</span>
                          </a>
                          <router-link style="margin-left:0.5rem;" :to="{ name: 'goodsEdit', params: { id: item.id } }">
                            <span>编辑</span>
                          </router-link>
                          <a style="margin-left:0.5rem;" @click="_delgood(item.id)">
                            <span>删除</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> 
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
    <footer>
      <router-link to="/user/business/goodsCreate">
        <el-button type="success" class="sucbtn">添加产品</el-button>
      </router-link>
    </footer>
  </div>
  

</template>

<script>
import { goodinfo, goodstatus } from '../../../api/index'
import { delgood } from '../../../api/users'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      selected: '1',
      manage: {
        state: false,
        text: '管理'
      },
      // 当前登录用户信息
      userInfo: [],
      // 页码，默认页码1，1页10条数据
      limit: 1,
      // 已发布上架数据
      datas: [],
      // 已发布下架数据
      datas1: []
    }
  },
  methods: {
    //  goodid:商品ID；goodstatus:状态  /goodstatus?goodid=1&goodstatus=1
    _goodstatus (id, status) {
      goodstatus({
        params: {
          goodid: id,
          goodstatus: status
        }
      }).then(res => {
        this._goodinfo(0)
        this._goodinfo(1)
      })
    },
    _manage () {
      this.manage.state = !this.manage.state
      this.manage.text === '管理' ? this.manage.text = '取消' : this.manage.text = '管理'
    },
    // 商家已发布的商品 userid:用户id；limit：分页参数 （GET） goodinfo?userid=11&limit=4&goodstatus=0
    _goodinfo (goodstatus) {
      goodinfo({
        params: {
          userid: this.userInfo.datas.id,   // 用户id
          limit: this.limit,
          goodstatus
        }
      }).then(res => {
        goodstatus === 0 ? this.datas = res.datas : this.datas1 = res.datas
      })
    },
    // 卖家删除商品 delgood?goodid=22
    _delgood (id) {
      delgood({
        params: {
          goodid: id
        }
      }).then(res => {
        this._goodinfo()
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    this._goodinfo(0)
    this._goodinfo(1)
  }
}
</script>

<style scoped lang="scss">
.sucbtn{
  width: 100%; border-radius: 0; position: fixed; bottom: 0;
}
.bf {
  margin-top: 40px;
  margin-bottom: calc(40px + 0.3rem)
}
.li1{
        .top{
          padding: 0.25rem 0.3rem;
        }
        .bottom {
          margin: 0 0.3rem;
        } 
      }
      .li2{
        padding: 0.2rem 0;
        position: relative;
        .img img{
          width: 1.56rem;
          height: 1.14rem;
        }
        .zhezhao{
          height: 100%;
          z-index: 999;
          width: 100%;
          background: #000;
          opacity: 0.2;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          & >div{
            font-size: 0.5rem;
            color: red;
          }
        }
        .edit {
          z-index: 99;
          justify-content: flex-end;
          font-size: 0.24rem;
          a {
            color: #656D78;
          }
        }
      }
      .box{
        // height: 1.14rem;
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
</style>
