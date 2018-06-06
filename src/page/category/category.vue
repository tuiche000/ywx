<template>
  <div>
    <header>
      <div class="search">
        <div class="left"><i class="el-icon-arrow-left" style="font-size: 0.3rem"></i></div>
        <div class="mid"><el-input v-model="result" placeholder="请输入内容" size="mini"></el-input></div>
        <div class="right"><a @click="_search()"><i class="el-icon-search" style="font-size: 0.3rem"></i></a></div>
      </div>
    </header>
    <el-row class="tac">
      <el-col :span="6">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#F1F4F7"
          :unique-opened="uniqueOpened"
          text-color="#656D78"
          active-text-color="#656D78">
          <el-submenu :index="`${index}`" v-for="(item, index) in datas.area" :key="index">
            <template slot="title">
              <div class="border"></div>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="`${index}-${index1}`" v-for="(item1, index1) in item.child" :key="index1">
                <div @click="_getCategory2 (item1.id)">{{item1.title}}</div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="rightBox">
          <div class="f28" v-show="datas.title">
            <a v-for="(item, index) in datas.title" 
              :key="index" @click="_getCategory3(item.id)"
              style="margin-right:0.1rem">
              <el-tag size="mini" >
                {{item.title}} 
              </el-tag>
            </a>
          </div>
          
          <div class="items bf">
            <div class="image" v-show="datas.banner">

            <img v-lazy="datas.banner" alt="">
          </div>
            <ul>
                  <li class="li1">
                  
                    <div class="bottom">
                      <ul>
                        <li class="flex align-center li2 gps" v-for="(item, index) in datas.goods" :key="index">
                          <router-link :to="{ name: 'goodsDetails', params: { data: item.id } }">
                          <div class="img">
                            <img v-lazy="item.img" alt="">
                          </div>
                          </router-link>
                          <div class="box flex1 flex col bet">                            
                            <div class="flex">
                              <span class="type">
                                <img src="../../assets/img/icon/xianhuo.png" alt="" style="width:0.36rem;height:0.24rem" v-if="item.cate_type == 1">
                                <img src="../../assets/img/icon/qihuo.png" alt="" style="width:0.36rem;height:0.24rem" v-else>
                                <!-- <img src="../../assets/img/icon/qihuo.png" alt=""> -->
                              </span>
                              <span class="description">{{item.name}}</span>
                            </div>
                            <div class="flex caa align-center">
                              <span class="sold">{{item.sale}}</span>
                              <span class="specification" style="margin-left:0.4rem">{{item.shu}}</span>
                            </div>
                            <div class="flex price align-center">
                              <span class="cf0">{{item.price}}</span>
                              <span class="caa" style="margin-left:0.3rem">{{item.shu_price}}</span>
                            </div>
                          </div>
                          <a @click="addCart(item)" class="add" v-if="item.cate_type == 1">
                            <img src="../../assets/img/icon/add.png" alt="">
                          </a>
                          <router-link class="add" :to="{name: 'preOrder', params: {data: item}}" style="display:block" v-if="item.cate_type != 1">
                            <img src="../../assets/img/icon/add2.png" alt="">
                          </router-link>
                        </li>
                      </ul>
                    </div> 
                  </li>
                </ul>
          </div>
          <a class="line-30 center caa f28" style="display:block" v-if="searched" @click="_search2()">{{loadingMsg}}</a>          
          <a class="line-30 center caa f28" style="display:block" v-else @click="loadingMore()">{{loadingMsg2}}</a>          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory, getCategory2, search } from '/api/index'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      uniqueOpened: true,
      value: '',
      result: '',
      limit: 0,
      limit2: 0, // 商品分类2级菜单加载更多的参数
      preId: null,
      newCate: false, // 判断是否是新点击的分类
      loadingMsg: '点击加载更多数据',
      loadingMsg2: '点击加载更多数据',
      searched: false,
      datas: {
        area: [],
        goods: [],
        productNum: 1,
        title: null,
        banner: null
      },
      start: null
    }
  },
  computed: {
    ...mapState(['showCart'])
  },
  methods: {
    ...mapMutations(['ADD_CART']),
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    loadingMore () {
      this.limit2 = this.datas.goods.length
      console.log(this.limit2)
      this._getCategory2()
    },
    _getCategory () {
      getCategory().then(res => {
        this.start = res[0].child[0].id
        this.datas.area = res
      })
    },
    _getCategory2 (id) {
      if (id) {
        this.preId = id
        this.newCate = true
        this.limit2 = 0
      } else {
        this.newCate = false
      }
      getCategory2({
        params: {
          id: this.preId,
          level: 1,
          limit: this.limit2
        }
      }).then(res => {
        this.searched = false
        if (this.newCate) { // 判断是否是新点击的分类
          if (res.datas.length === 0) { // 分类没有商品
            this.loadingMsg2 = '已经没有数据啦'
            this.datas.goods = null
          }
        }
        this.datas.title = res.title
        this.datas.banner = res.banner
        if (this.limit2 !== 0) { // 分页下的数据
          if (res.datas.length === 0) {
            this.loadingMsg2 = '已经没有数据啦'
          }
          this.datas.goods.push(...res.datas)
        } else { // 首次加载分类数据
          this.datas.goods = res.datas
        }
      })
    },
    _getCategory3 (id) {
      getCategory2({
        params: {
          id: id,
          level: 2
        }
      }).then(res => {
        this.datas.goods = res.datas
      })
    },
    addCart (item) {
      this.ADD_CART({
        productId: item.id,
        productPrice: item.price,
        productName: item.name,
        productImg: item.img,
        productNum: this.productNum,
        porduct: item
      })
    },
    _search () {
      // name:传的值  page：默认传1 第二次下拉传2
      search({
        params: {
          name: this.result,
          page: 1
        }
      }).then(res => {
        console.log(res)
        res.msg === '查询无数据' ? (this.datas.title = `暂时没有 "${this.result}" 的搜索结果`, this.searched = false) : (this.datas.title = `以下是 "${this.result}" 的搜索结果：`, this.searched = true)
        this.datas.banner = null
        this.loadingMsg = '点击加载更多数据'
        this.datas.goods = res.datas
      })
    },
    _search2 () {
      // name:传的值  page：默认传1 第二次下拉传2
      if (this.loadingMsg === '已经没有数据啦！') {
        return
      }
      this.limit = Math.ceil(this.datas.goods.length / 10) + 1
      search({
        params: {
          name: this.result,
          page: this.limit
        }
      }).then(res => {
        if (res.msg === '查询无数据') {
          this.loadingMsg = '已经没有数据啦！'
          return
        }
        console.log(res)
        res.datas.forEach(item => {
          this.datas.goods.push(item)
        })
      })
    }
  },
  watch: {
    start: function (res) {
      this._getCategory2(res)
    }
  },
  created () {
    this._getCategory()
  }
}
</script>

<style>
.el-submenu .el-menu-item{
  min-width: initial; text-align: center; height: 0.8rem; line-height: 0.8rem;
}
.el-submenu__title{
  font-size: 0.23rem; color: #AAB2BD!important;
}
.el-menu-item{
  font-size: 0.28rem;
}
.el-menu-item, .el-submenu__title{
  padding: 0!important; height: 1rem; line-height: 1rem;
}
.el-submenu__icon-arrow{
  display: none;
}
</style>
<style lang="scss" scoped>
.search{
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  justify-content: space-between;
  -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    color: #737373;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 0.22rem;
    height: 40px;
    line-height: 1;
    padding: 0 0.4rem;
    position: relative;
    text-align: center;
    white-space: nowrap;
    .left{

    }
    .mid{
      flex: 1; padding: 0 0.4rem;
    }
    .right{

    }
}
.description{
    height: 0.48rem;
    line-height: 0.24rem;
    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
    width: 100%;
  }
  .border{
    height: 0.23rem; border-left: 0.05rem solid #2ABA66; display: inline-block; margin-left: 0.25rem;
  }
  .rightBox{
    padding: 0.3rem 0.2rem;
    .image{
      height: 2.4rem; width: 100%;margin-top: 0.25rem;
      img{
        width: 100%; height: 100%; display: block;
      }
    }
  }
  .items{
    height: 70vh;
    overflow: scroll;
      .li1{
        .top{
          padding: 0.2rem 0;
        }
        
      }
      .li2{
        padding: 0.3rem 0;
        .img img{
          width: 1.56rem;
          height: 1.14rem;
        }
        .add{
          position: absolute; right: 0; bottom: 0; 
          img{
            width: 0.62rem; height: 0.4rem; display: block;
          }
        }
      }
      .box{
        height: 1.14rem;
        width: 100%;
        overflow: hidden;
        margin-left: 0.1rem;
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
          .caa{
            font-size: 0.22rem
          }
        }
      }
      
    }
</style>

