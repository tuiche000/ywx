<template>
  <div>

    <mt-header fixed title="待评价订单">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>


    <div class="bot40">
      <ul v-if="list.length">
        <li class="flex" v-for="(item, index) in list" :key="index">
          <product-vue row="row" :rowData="item" class="flex1" style="width:80%"></product-vue>
          <div class="flex col flex-center">
            <a class="btn flex-center" @click="_popupVisible(item)">评价</a>
          </div>
        </li>
        
      </ul>
      <div class="line-30 center caa f28" v-else>已经没有数据啦！！</div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="top"
      >
      <div class="pingjiaBox flex col">
        <textarea v-model="idList.count"></textarea>
        <a @click="_pinlun()">
          <button-vue :btnData="{
            size: 'l',
            text: '发布'
          }" style="display:flex;justify-content:flex-center"></button-vue>
        </a>
      </div>
    </mt-popup>

  </div>
</template>

<script>
import { orderstate, pinlun } from '../../api/shoporder'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      editDefault: false,
      userInfo: null,
      list: [],
      popupVisible: false,
      idList: {
        userid: '',
        goodid: '',
        orderid: '',
        count: ''
      }
    }
  },
  methods: {
    // edit () {
    //   this.editDefault = !this.editDefault
    // },
    _orderstate () {
      orderstate({
        params: {
          userid: this.userInfo.datas.id,
          status: 2
        }
      }).then(res => {
        this.list = res
      })
    },
    _pinlun () {
      pinlun({
        params: {
          userid: this.userInfo.datas.id,
          goodid: this.idList.goodid,
          orderid: this.idList.orderid,
          count: this.idList.count
        }
      }).then(res => {
        alert('评价好了')
        this._orderstate()
        this.popupVisible = false
      })
    },
    _popupVisible (item) {
      this.idList.goodid = item.goods.goods_id
      this.idList.orderid = item.id
      this.popupVisible = true
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    this._orderstate()
  }
}
</script>

<style lang="scss" scoped>
.bot40{
  background: #fff;
  li{
    padding: 0.2rem 0.3rem;
    .btn{
      background: #f1f4f7;
      width: 1.5rem;
      height: 0.44rem;
      border-radius: 0.22rem;
    }
  }
}
.pingjiaBox{
  width: 100vw;
  height: 50vh;
  background: #F3F1E0;
  padding: 0.3rem;
  textarea{
    flex: 1;
    background: #F3F1E0;
  }
}
</style>
