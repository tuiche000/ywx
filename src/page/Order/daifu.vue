<template>
  <div>

    <mt-header fixed title="待付订单">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>


    <div class="bot40">
      <ul v-if="list.length">
        <li class="flex" v-for="(item, index) in list" :key="index">
          <product-vue row="row" :rowData="item" class="flex1" style="width:80%"></product-vue>
          <div class="flex col flex-center">
            <a class="btn flex-center" @click="href(item)">支付</a>
          </div>
        </li>
      </ul>
      <div class="line-30 center caa f28" v-else>已经没有数据啦！！</div>
      
    </div>
    

  </div>
</template>

<script>
import { orderstate } from '../../api/shoporder'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      editDefault: false,
      userInfo: null,
      list: []
    }
  },
  methods: {
    // edit () {
    //   this.editDefault = !this.editDefault
    // },
    href (data) {
      this.$router.push({
        path: '/checkout',
        query: {
          status: 1,
          shibie: data.shibie
        }
      })
      // this.$router.push({
      //   name: 'checkout',
      //   params: {
      //     status: 1,
      //     shibie: data.shibie
      //   }
      // })
    },
    _orderstate () {
      orderstate({
        params: {
          userid: this.userInfo.datas.id,
          status: -1
        }
      }).then(res => {
        this.list = res
      })
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
</style>
