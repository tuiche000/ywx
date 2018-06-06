<template>
  <div>
    <mt-header fixed title="订单发票">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-bottom">
      <div class="line-24 caa">
        发票类型：{{$route.params.id}}{{$route.params.uid}}
      </div>
      <div class="type bf">
        <div class="top flex bet">
          <div class="dianzi col" :class="{ act: this.datas.iselectronics==1 }" @click="act_click(0)">
            <span>电子发票</span>
            <span class="caa">最快5分钟开具</span>
            <b></b>
          </div>
          <div class="zhizhi" :class="{ act: this.datas.iselectronics==2 }" @click="act_click(1)">纸质发票<b></b></div>
        </div>
        <div class="bottom center">电子发票与纸质发票具备同等法律效力，可支持报销入账。</div>
      </div>
      <div class="line-24 caa">
        发票详情：
      </div>
      <div class="details">
         <div class="line-80">
           <h3>抬头类型：</h3>
           <div class="right flex">
            <el-radio v-model="datas.istype" label="1">企业抬头</el-radio>
            <el-radio v-model="datas.istype" label="2">个人/非企业单位</el-radio>
           </div>
         </div>
         <div class="line-80">
           <h3>发票抬头：</h3>
           <div class="right flex">
           <input v-model="datas.taitou">
           </div>
         </div>
         <!-- <div class="line-80">
           <h3>税号：</h3>
           <div class="right flex">
           <input v-model="datas.shuihao">
           </div>
         </div> -->
         <div class="line-80">
           <h3>发票内容:</h3>
           <div class="right flex">
           <input v-model="datas.content">
           </div>
         </div>
         <div class="line-80">
           <h3>发票金额:</h3>
           <div class="right flex">
           <input v-model="datas.money">
           </div>
         </div>
         <div class="line-80">
           <h3>更多信息:</h3>
           <div class="right flex">
           <input v-model="datas.contents">
           </div>
         </div>
         
      </div>
      <div class="line-24 caa">
        收件信息：
      </div>
      <div class="line-80" v-if="this.datas.iselectronics == 1">
        <h3>电子邮件:</h3>
        <div class="right flex">
        <input v-model="datas.email" type="email">
        </div>
      </div>
      <div class="line-80" v-if="this.datas.iselectronics == 2">
        <h3>收货地址:</h3>
        <div class="right flex">
        <input v-model="datas.address" type="text">
        </div>
      </div>
      <br>
      <div class="btn center" @click="_stadybill()">
        <button-vue :btnData="{
        size: 'l',
        text: '提交'
      }"></button-vue>
      </div>
    </div>
    
    
  </div>

</template>

<script>
import { stadybill } from '../../../api/shoporder'
export default {
  data () {
    return {
      datas: {
        iselectronics: 1,
        istype: '',
        taitou: '',
        money: '',
        content: '',
        contents: '',
        address: '',
        email: ''
      }
    }
  },
  methods: {
    act_click (index) {
      this.datas.iselectronics = index + 1
      this.datas.address = ''
      this.datas.email = ''
    },
    // 提交发票 stadybill?userid=370&orderid=1&iselectronics=1&istype=370&shuihao=1&taitou=370&money=1&content=370&address=1&email=1
    _stadybill () {
      stadybill({
        params: {
          userid: this.$route.params.uid,
          orderid: this.$route.params.id,
          iselectronics: this.datas.iselectronics,
          istype: this.datas.type,
          taitou: this.datas.taitou,
          money: this.datas.money,
          content: this.datas.content,
          contents: this.datas.contents,
          address: this.datas.address,
          email: this.datas.email
        }
      }).then(res => {
        this.datas = res
        console.log(this.datas)
      })
    }
  },
  created () {
  }
}
</script>

<style>
.el-radio__label{
  font-size: 0.24rem;
}
</style>
<style scoped>
.line-24{
  padding-left: 0.3rem; font-size: 0.24rem;
}
.type{
  padding: 0.3rem 0.6rem;
}
.type .bottom{
  margin-top: 0.24rem;
  color: #AAB2BD;
  font-size: 0.24rem;
  line-height: 0.32rem;
}
.type .top>div{
  width: 2.81rem; height: 1.01rem; background: #F3F1E0;
}
.line-80 h3{
  width: 1.5rem;
}
.line-80 .right{
  flex: 1;
}
.dianzi,.zhizhi{
  display: flex; font-size: 0.24rem; position: relative;
}
.dianzi{
  justify-content: center; align-items: center;
}
.dianzi .caa{
  font-size: 0.18rem;  
}
.zhizhi{
  justify-content: center; align-items: center;
}
.act{
  border: 2px solid #434A54;
}
.act b{
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
</style>

