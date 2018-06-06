<template>
  <div>

    <mt-header fixed title="全部订单">
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
          <!-- <div class="radio flex flex-center" v-show="editDefault">
            <el-radio v-model="radio"></el-radio>
          </div> -->
          <product-vue row="row" :rowData="item" class="flex1"></product-vue>
        </li>
      </ul>
      
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
    _orderstate () {
      orderstate({
        params: {
          userid: this.userInfo.datas.id,
          status: 'all'
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
  }
}
</style>
