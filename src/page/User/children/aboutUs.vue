<template>
  <div class="vh100 bf">
    <mt-header fixed title="联系我们">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="bot40 flex col bet">
      
      <div class="top">
        <!-- <img src="../../../assets/img/user/aboutUs.png" alt="" width="100%" style="display:block"> -->
        <img v-lazy="value.image" alt="" width="100%" style="display:block">
        <div class="content">
          <div class="f28">{{value.title}}</div>
          <br>
          <p class="caa f23" v-html="value.content"></p>
        </div>
      </div>
      <div class="bottom">
        <div class="center">
                <button-vue :btnData="{
                  size: 'l',
                  text: '在线客服'
                }"></button-vue>
              </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { contactus } from '../../../api/users'
export default {
  data () {
    return {
      value: []
    }
  },
  methods: {
    _contactus () {
      contactus().then(res => {
        this.value = res
      })
    }
  },
  created () {
    this._contactus()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .top{
    .content{
      padding: 0.5rem 0.4rem;
    }
  }
  .bottom{
    margin-bottom: 0.7rem;
  }
</style> 
