<template>
  <div>

    <mt-header fixed title="待收货订单">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>


    <div class="bot40">
      <ul v-if="orders.length">
        <li class="flex" v-for="(item, index) in orders" :key="index">
          <el-row style="width:100%">
            <el-col :span="18"><product-vue row="row" class="flex1" :rowData="item"></product-vue></el-col>
            <el-col :span="6"><div class="flex col flex-center">
              <router-link to="/order/logistics">
                <a class="btn flex-center">查看物流</a>
              </router-link>
              <br>
              <a class="btn flex-center" @click="_orderstatus(item.id, item.order_status)">确认收货</a>
            </div>
            </el-col>
          </el-row>
        </li>
      </ul>
      <div class="line-30 center caa f28" v-else>已经没有数据啦！！</div>
    </div>
    

  </div>
</template>

<script>
import { orderstatus, orderstate } from '../../api/shoporder'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
export default {
  data () {
    return {
      orders: [],
      userInfo: null
    }
  },
  methods: {
    // 物流信息（ 确认收货）：userid（cookie里的id）；orderid（物流信息里的id）；status（物流信息里的order_status） (GET)
    _orderstatus (itemId, itemStatus) {
      orderstatus({
        params: {
          userid: this.userInfo.datas.id,
          orderid: itemId,
          status: itemStatus
        }
      }).then(res => {
        this._order()
      })
    },
    _order () {
      orderstate({
        params: {
          userid: this.userInfo.datas.id,
          status: 0
        }
      }).then(res => {
        this.orders = res
      })
    }
  },
  created () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    this._order()
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
