<template>
  <div class="vh100">
    <mt-header fixed title="充值中心">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="bot40 flex col bet">
      <div class="top">
        <div class="flex col">
          <div class="balance">
            <span>余额</span>
            <!-- <h4>{{_toFixed(userInfo.datas.money, 2)}}</h4> -->
            <h4>{{jiage}}</h4>
          </div>
        
        </div>
        <div class="flex rechargePrice bf">
          充值金额： <input type="number" placeholder="输入金额" class="caa price" style="font-size:0.4rem" v-model="formData.money">
        </div>
        <div>
          <div class="line-30">支付方式</div>
          <ul>
            <li class="line-80">
              <el-radio v-model="formData.type" label="1">支付宝</el-radio>
            </li>
            <li class="line-80">
              <el-radio v-model="formData.type" label="2">微信</el-radio>
            </li>
            <li class="line-80">
              <el-radio v-model="formData.type" label="3">对公账号</el-radio>
            </li>
          </ul>
        </div>
        
      </div>
      <div class="bottom">
        <div class="center">
          <a @click="_chong">
                <button-vue :btnData="{
                  size: 'l',
                  text: '充值'
                }"></button-vue>
          </a>
              </div>
              
      </div>
       
    </div>
    
      
    <el-dialog
  title="充值"
  :visible.sync="dialogVisible"
  width="70%">
  <span>
    <div v-if="chongData.status == 1">
      金额： <span style="color:red">{{chongData.datas.money}}</span>
      <img :src="chongData.datas.url" alt="" width="100%">
    </div>
    <div v-else>
      错误：<span style="color:red">{{chongData.msg}}</span>
    </div>
  </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


  </div>  
</template>

<script>
import { mapMutations } from 'vuex'
import { getStore } from '/utils/storage.js'  // 缓存的用户信息
import { chong, huidiao } from '../../../api/index'
import { jiage } from '../../../api/users'
export default {
  data () {
    return {
      dialogVisible: false, // 充值接口弹出框
      chongData: { // 充值接口回调数据
        msg: null, // 接口信息
        datas: null, // 接口数九
        status: null // 充值接口返回状态：1成功
      },
      jiage: null,
      userInfo: '',
      formData: {
        type: '',
        money: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    _chong () {
      // 账户充值 【type：1支付宝，2：微信；3：对公账户】 /chong?userid=22&type=1&money=66
      chong({
        params: {
          userid: this.userInfo.datas.id,
          type: this.formData.type,
          money: this.formData.money
        }
      }).then(res => {
        // const patt = /"orderurl":"\d*"/i
        // const orderurl = patt.exec(res)[0].split(':')[1]
        if (this.formData.type === '1') {
          const div = document.createElement('div')
          div.style.display = 'none'
          div.innerHTML = res
          document.body.appendChild(div)
          document.forms.alipaysubmit.submit()
          return
        }
        this.chongData = res
        this.dialogVisible = true
        const dingshi = setInterval(() => {
          if (!this.dialogVisible === true) {
            clearInterval(dingshi)
          }
          huidiao({
            params: {
              orderno: this.chongData.datas.order
            }
          }).then(res => {
            if (res.status === '1') {
              clearInterval(dingshi)
              clearTimeout(dingshi2)
              alert('充值成功！')
              this.dialogVisible = false
              // this.userInfo.datas.money = parseFloat(this.userInfo.datas.money) + parseFloat(this.formData.money)
              this.RECORD_USERINFO(this.userInfo)
              this.$router.push('/users')
            }
          })
        }, 3000)
        const dingshi2 = setTimeout(() => {
          alert('充值超时。')
          clearInterval(dingshi)
        }, 1000 * 60 * 2)
      }).catch(err => {
        alert('数据库错误')
        console.log(err)
      })
    },
    _toFixed (data, num) {
      return parseFloat(data).toFixed(num)
    }
  },
  mounted () {
    this.userInfo = JSON.parse(getStore('userInfo'))
    jiage({
      params: {
        userid: this.userInfo.datas.id
      }
    }).then(res => {
      this.jiage = res.money
    })
    console.log(this.userInfo)
  }
}
</script>

<style lang="scss" scoped>
.top>div:first-child{
  height: 2rem; justify-content: center; background: RGB(42,186,102); color: #fff; font-size: 0.24rem; align-items: center; text-align: center
}
.balance h4{
  font-size: 0.6rem;
}
.recharge{
  margin-top: 0.3rem;
}
.rechargePrice{
  align-items: center; padding: 0.5rem 0.3rem;
}
.rechargePrice .price{
  margin-left: 0.3rem;
}
.bottom{
    margin-bottom: 0.7rem;
}
.line-30{
  padding-left: 0.3rem;
}
</style>
