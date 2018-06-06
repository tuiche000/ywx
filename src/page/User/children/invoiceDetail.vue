<template>
  <div>
    <mt-header fixed title="发票信息">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-bottom">
      <div class="line-24 cd9" v-if="$route.params.state == 1">
        已开票
      </div>
      <div class="line-24 cf1" v-else>
        受理中
      </div>

      <div class="details">
         <div class="line-80">
           <h3>发票类型：</h3>
           <div class="right flex">
           {{datas.iselectronics}}
           </div>
         </div>
         <div class="line-80">
           <h3>开票时间：</h3>
           <div class="right flex">
           {{datas.time}}
           </div>
         </div>

         <div class="line-24 caa">
            发票详情：
         </div>
         <div class="line-80">
           <h3>抬头类型：</h3>
           <div class="right flex">
           {{datas.istype}}
           </div>
         </div>
         <div class="line-80">
           <h3>发票抬头：</h3>
           <div class="right flex">
           {{datas.taitou}}
           </div>
         </div>
         <div class="line-80">
           <h3>税号：</h3>
           <div class="right flex">
           {{datas.shuihao}}
           </div>
         </div>
         <div class="line-80">
           <h3>发票内容:</h3>
           <div class="right flex">
           {{datas.content}}
           </div>
         </div>
         <div class="line-80">
           <h3>发票金额:</h3>
           <div class="right flex">
           {{datas.money}}
           </div>
         </div>
         <div class="line-80">
           <h3>更多信息:</h3>
           <div class="right flex">
           {{datas.contents}}
           </div>
         </div>
         
      </div>
      <div class="line-24 caa">
        收件信息：
      </div>
      <div class="line-80" v-if="this.datas.iselectronics != '纸质发票'">
        <h3>电子邮件:</h3>
        <div class="right flex">
        {{this.datas.email}}
        </div>
      </div>
      <div class="line-80" v-else>
        <h3>收货地址:</h3>
        <div class="right flex">
        {{this.datas.address}}
        </div>
      </div>
    </div>
    
    
  </div>

</template>

<script>
import { billinfo } from '../../../api/shoporder'
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
      },
      btnData: {
        size: 's',
        text: '提交'
      }
    }
  },
  methods: {
    act_click (index) {
      this.data.invoiceType = index + 1
    },
    // 发票详情 ?orderid=22
    _billinfo () {
      billinfo({
        params: {
          orderid: this.$route.params.id
        }
      }).then(res => {
        this.datas = res
      })
    }
  },
  created () {
    this._billinfo()
  }
}
</script>

<style>
.mint-header{
  background-color: #fff; color: #434A54;
}
.mintui{
  font-size: 0.3rem;
}
.mint-header-title{
  font-size: 0.32rem;
}
.el-radio__label{
  font-size: 0.24rem;
}
</style>
<style scoped>
.line-24{
  font-size: 0.24rem; padding-left: 0.3rem;
}
.line-80 h3{
  width: 1.5rem;
}
.line-80 .right{
  flex: 1;
}
.cd9{
  background: #D9F3D5; text-align: center; color: #2ECC71;
}
.cf1{
  background: #F1D6D9; text-align: center; color: #F05F5F;
}
</style>

