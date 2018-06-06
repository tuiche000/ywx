<template>
  <div>
    <mt-header fixed :title="title">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="bot40 col bet"> 
      <div class="details">
                <div class="line-80"> 
                  <h3>联系人</h3>
                  <div class="right flex">
                  <input v-model="data1.username" type="text" class="caa" v-html="$route.params.data.name">
                  </div>
                </div>
                <div class="line-80">
                  <h3>手机号</h3>
                  <div class="right flex">
                  <input v-model="data1.mobile" type="number" class="caa">
                  </div>
                </div>
                <!-- <div class="line-80">
                  <h3>备用电话</h3>
                  <div class="right flex">
                  <input v-model="data1.card">
                  </div>
                </div> -->
                <div class="line-80" style="margin-top:0.3rem">
                  <h3>收货地址</h3>
                  <div class="right flex"> 
                  <input v-model="data1.address" class="caa">
                  </div>
                </div>
                <br>
                <div class="btn center">
                  <a @click="_fn()">
                    <button-vue :btnData="{
                      size: 'l',
                      text: '保存'
                    }"></button-vue>
                  </a>
                </div>
    
              </div>
      
    </div>
  </div>  
</template>

<script>
import { saveress, upress } from '../../../api/users'
import { getStore } from '../../../utils/storage'
export default {
  data () {
    return {
      id: '',
      id1: '',
      data1: {
        username: '',
        mobile: '',
        address: ''
      },
      title: '',
      fn: '',
      num: 1
    }
  },
  methods: {
    _fn () {
      // userid：用户id  username：名字   mobile：手机号 ；备用号：mobile2；address ：地址
      this.fn({
        params: {
          id: this.id1,
          userid: this.id,
          username: this.data1.username,
          mobile: this.data1.mobile,
          address: this.data1.address
        }
      }).then(res => {
        this.$router.go(-1)
      })
    }
  },
  created () {
    this.$route.params.data === 1 ? (this.title = '新增地址', this.fn = saveress) : (this.title = '编辑地址', this.fn = upress, this.id1 = this.$route.params.data.id, this.data1.username = this.$route.params.data.name, this.data1.mobile = this.$route.params.data.mobile, this.data1.address = this.$route.params.data.address)
    this.id = JSON.parse(getStore('userInfo')).datas.id
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    margin-bottom: 0.6rem;
  }
  .line-24{
  padding-left: 0.3rem; font-size: 0.24rem;
}
.line-80.auto{
  padding: 0.3rem;
  height: auto; align-items: flex-start;
}
.line-80.auto>*{
  margin-bottom:0.4rem;
}
.line-80 h3{
  width: 1.5rem;
}
.line-80 .right{
  flex: 1;
}
.details{
  margin-top: 0.3rem;
}
</style>
