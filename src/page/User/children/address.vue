<template>
  <div>
    <mt-header fixed title="地址选择">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
      <mt-button slot="right">
          <a @click="manage = !manage">
            管理
          </a>
        </mt-button>
    </mt-header>
    <div class="bot40 col bet">
      <ul class="flex col list" v-if="data1.length">
        <li v-for="(item, index) in data1" :key="index" @click="act (index)">
          <div class="top flex bet">
            <span>{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
          <div class="bottom caa" v-html="item.address"></div>
          <div class="flex bet edit" v-show="manage">
            <div>
              <a @click="_setaddress(item.id, item.status)" :class="{ caa: item.status }">
                <span>设为默认地址</span>
              </a>
            </div>
            <div>
              <!-- <router-link :to="`/user/addressManage/:2`"> -->
              <router-link :to="{ name: 'addressManage', params: { data: item } }">
                <span>编辑</span>
              </router-link>
              <a style="margin-left:1rem;" @click="_deladdress(item.id)">
                <span>删除</span>
              </a>
            </div>
          </div>
          <b v-show="index == active"></b>
        </li>
      </ul>
      <div class="line-30 center caa f28" v-else>还没有收货地址，去添加一条吧！</div>
      <div class="center">
        <router-link :to="{ name: 'addressManage', params: { data: 1 } }">
                <button-vue :btnData="{
                  size: 'l',
                  text: '新增地址'
                }"></button-vue>
        </router-link>
      </div>
    </div>
  </div>  
</template>

<script>
import { address, setaddress, deladdress } from '../../../api/users'
import { getStore } from '../../../utils/storage'
export default {
  data () {
    return {
      data1: [],
      active: 0,
      manage: 0,
      id: null
    }
  },
  methods: {
    // 获取用户地址
    _address () {
      address({
        params: {
          userid: this.id
        }
      }).then(res => {
        this.data1 = res
      })
    },
    // 设置默认地址
    _setaddress (itemId, status = 0) {
      if (status !== 0) {
        return false
      }
      setaddress({
        params: {
          userid: this.id,
          id: itemId
        }
      }).then(res => {
        this._address()
      })
    },
    // 删除地址
    _deladdress (itemId) {
      deladdress({
        params: {
          id: itemId
        }
      }).then(res => {
        this._address()
      })
    },
    act (index) {
      this.active = index
    }
  },
  created () {
    this.id = JSON.parse(getStore('userInfo')).datas.id
    this._address()
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    margin-bottom: 0.6rem;
  }
  .list {
    padding: 0.2rem 0.2rem;
    li{
      border: 0.04rem solid #8077A0;
      background: #F3F1E0;
      font-size: 0.23rem;
      margin-bottom: 0.2rem;
      padding: 0.35rem;
      position: relative;
    }
    .bottom{
      margin-top: 0.24rem;
    }
    b {
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.4rem;
      height: 0.3rem;
      overflow: hidden;
      background: url(/static/images/selected.png) no-repeat;
      background-size: cover;
    }
    .edit{
      margin-top: 0.24rem
    }
  }
</style>
