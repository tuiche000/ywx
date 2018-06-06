<template>
  <div class="vh100 f28">
    
    <header>
      <mt-header fixed :title="title">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right">
          <router-link to="/register" v-if="!forget">
            注册
          </router-link>
        </mt-button>
      </mt-header>
    </header>

    <article class="bf" v-if="forget == false">
      <section>
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">账号登陆</mt-tab-item>
            <mt-tab-item id="2">短信登陆</mt-tab-item>
          </mt-navbar>

          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <el-input v-model="users.username" size="small" placeholder="输入手机号码"></el-input>
              <el-input v-model="users.pwd" size="small" placeholder="登录密码"></el-input>
              <div v-show="users.errMsg" style="left: 0;top: 0;margin: 0;color: #d44d44">{{users.errMsg}}
              </div>
              <div style="text-align: center">
                <div @click="_login">
                <button-vue :btnData="{
                  size: 'l',
                  text: '账号登陆'
                }"></button-vue>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <el-input v-model="sms.phone" size="small" placeholder="输入手机号码"></el-input>
              <div class="gps">
                <el-input v-model="sms.pwd" size="small" placeholder="登录密码"></el-input>
                <div @click="_loncode(sms.phone)" class="btn_getYzm">{{yzms}}</div>
              </div>
              
              <div v-show="sms.errMsg" style="left: 0;top: 0;margin: 0;color: #d44d44">{{sms.errMsg}}
              </div>
              <div class="center">
                <div @click="_shortlogin()">
                  <button-vue :btnData="{
                    size: 'l',
                    text: '短信登陆'
                  }"></button-vue>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
          <div style="text-align: right; margin-top: 0.6rem;">
            <router-link to="" class="caa"> <span @click="forgetPassword ()">忘记密码</span> </router-link>
          </div>
          
      </section>
      <section>
        <div style="text-align: center">
          <hr> 第三方登陆 <hr>
        </div>
        <div class="center" style="margin-top:0.3rem" @click="centerDialogVisible = true">
          <img src="../../assets/img/icon/wechat.png" alt="">
        </div>
      </section>
      <el-dialog
        title="二维码"
        :visible.sync="centerDialogVisible"
        :fullscreen="true"
        :center="true">
        <div style="text-align:center;">        <img src="../../assets/img/index/QRcode.png" alt="" style="width:255px;height:255px;">
</div>
      </el-dialog>
    </article>

    <article class="bf" v-else>

        <div>
        <el-input v-model="forgetPwd.phone" size="small" placeholder="输入手机号码"></el-input>
              <el-input v-model="forgetPwd.pwd" size="small" placeholder="请重置密码"></el-input>
              <el-input v-model="forgetPwd.surePwd" size="small" placeholder="请确定密码"></el-input>
              <div class="gps">
                <el-input v-model="forgetPwd.smsNum" size="small" placeholder="短信验证码"></el-input>
                <div @click="_loncode(forgetPwd.phone)" class="btn_getYzm">{{yzms}}</div>
              </div>
              </div>  
              <a style="text-align: center" @click="_forget()">
                <button-vue :btnData="{
                  size: 'l',
                  text: '确定'
                }"></button-vue>
          
            
              </a>
          
    </article>
  </div>
</template>
<script>
  import { login, loncode, shortlogin, forget } from '/api/users.js'
  // import { getStore } from '/utils/storage.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        centerDialogVisible: false, // dialog
        users: {
          username: '',
          pwd: '',
          errMsg: ''
        },
        sms: {
          phone: '',
          pwd: '',
          errMsg: ''
        },
        forgetPwd: {},
        forget: false,
        title: '登陆',
        selected: '1',
        yzms: '获取短信验证码',
        timingDetail: 60
      }
    },
    methods: {
      ...mapMutations(['RECORD_USERINFO', 'INIT_BUYCART']),
      // 登陆时将本地的添加到用户购物车
      login_addCart (data) {
        this.INIT_BUYCART()
        // let cartArr = []
        // let locaCart = JSON.parse(getStore('buyCart'))
        // recart({
        //   params: {
        //     userid: data.datas.id
        //   }
        // }).then(res => {
        //   res.datas.map(item => {
        //     this.ADD_CART({
        //       productId: item.More.id,
        //       productPrice: item.More.price,
        //       productName: item.More.name,
        //       productImg: item.More.img,
        //       productNum: item.productNum,
        //       porduct: item.More
        //     })
        //   })
        // })
        // if (locaCart && locaCart.length) {
        //   locaCart.forEach(item => {
        //     cartArr.push({
        //       'productId': item.productId,
        //       'productNum': item.productNum
        //     })
        //   })
        // }
        // this.cart = cartArr
      },
      _login () {
        let username = this.users.username
        let password = this.users.pwd
        if (!username || !password) {
          this.users.errMsg = '手机，密码不能为空'
          return false
        } else if (username.length !== 11) {
          this.users.errMsg = '手机号必须是11位'
        } else {
          this.users.errMsg = null
          login({
            params: {
              username, password
            }
          }).then(res => {
            this.RECORD_USERINFO(res)
            if (res.status === 0) {
              this.login_addCart(res)
              alert(`${res.datas.mobile}登陆成功`)
              this.$router.push('/home')
            } else {
              this.users.errMsg = res.msg
            }
          })
        }
      },
      _loncode (phone) {
        if (phone.length !== 11) {
          this.sms.errMsg = '手机号必须是11位'
          return false
        }
        if (this.yzms !== '获取短信验证码') {
          return false
        }
        loncode({
          params: {
            username: phone
          }
        }).then(res => {
          let init = this.timingDetail
          this.yzms = `请稍等${init}秒`
          let _setInterval = setInterval(() => {
            init--
            this.yzms = `请稍等${init}秒`
            if (init < 1) {
              this.yzms = `获取验证码`
              clearInterval(_setInterval)
            }
          }, 1000)
        })
      },
      _shortlogin () {
        let username = this.sms.phone
        let yzm = this.sms.pwd
        if (!username || !yzm) {
          this.sms.errMsg = '手机，密码不能为空'
          return false
        } else if (username.length !== 11) {
          this.sms.errMsg = '手机号必须是11位'
          return false
        } else {
          this.sms.errMsg = null
          shortlogin({
            params: {
              username, yzm
            }
          }).then(res => {
            this.RECORD_USERINFO(res)
            if (res.status === 0) {
              alert(`${res.datas.mobile}短信登陆成功`)
              this.$router.push('/home')
            } else {
              this.users.errMsg = res.msg
            }
          })
        }
      },
      forgetPassword () {
        this.forget = true
        this.title = '忘记密码'
      },
      //  forget?mobile=11&password=11&password2=11&code=11
      _forget () {
        forget({
          params: {
            mobile: this.forgetPwd.phone,
            password: this.forgetPwd.pwd,
            password2: this.forgetPwd.surePwd,
            code: this.forgetPwd.smsNum
          }
        }).then(res => {
          alert(res.msg)
          this.forget = false
        })
      }
    },
    mounted () {
      this.login_addCart()
    },
    computed: {
      ...mapState(['userInfo'])
    }
  }
</script>
<style>
.el-input__inner{
border-radius: 0.37rem;
    background: #F1F4F7;
    border: none;
}
.el-input--small{
  margin-top: 0.5rem;
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  .vh100 {
    overflow: auto;
  }
  header{
    height: 40px;
  }

  article {
    height: calc(100vh - 40px);
    padding: 0.9rem 10px;
    display: flex;
    flex-direction: column;
    .btn {
      margin-top: 1.5rem;
    }
    hr{
      display: inline-block; width: 2rem;
    }
    img{
      width: 0.9rem; height: 0.9rem;
    }
  }

  .btn_getYzm{
    font-size: 0.28rem;
    color: #2ecc71;
    position: absolute;
    top: 0.6rem;
    right: 0.5rem;
  }

</style>
