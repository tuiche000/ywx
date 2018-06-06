<template>
  <div class="vh100 f28">
    
    <header>
      <mt-header fixed title="注册">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
        <mt-button slot="right">
          <router-link to="/login">
            登陆
          </router-link>
        </mt-button>
      </mt-header>
    </header>

    <article class="bf">
      <section>
          
              <el-input v-model="datas.phone" size="small" placeholder="输入手机号码"></el-input>
              <el-input v-model="datas.name" size="small" placeholder="请输入昵称"></el-input>
              <div class="gps">
                <el-input v-model="datas.yzmNum" size="small" placeholder="短信验证码"></el-input>
                <div @click="_regYzm(datas.phone)" class="btn_getYzm">{{yzms}}</div>
              </div>
              <el-input v-model="datas.pwd" size="small" placeholder="设置密码"></el-input>
              <div v-show="datas.errMsg" style="left: 0;top: 0;margin: 0;color: #d44d44">{{datas.errMsg}}</div>

              <div style="text-align: center">
                <a @click="_reg">
                  <button-vue :btnData="{
                    size: 'l',
                    text: '注册'
                  }"></button-vue>
                </a>
              </div>
           
              
           
          <div style="text-align: center; margin-top: 0.6rem;">
            <a class="caa" @click="_popupVisible()">协议</a>
          </div>
          <mt-popup
            v-model="popupVisible"
            position="top"
          >
            <div class="pingjiaBox flex col gps">
              <div v-html="agrees.content"></div>
              <a @click="popupVisible = false" style="position: absolute; bottom: 0.2rem;">
                <button-vue :btnData="{
                  size: 'l',
                  text: '我已阅读协议'
                }" style="display:flex;justify-content:flex-center"></button-vue>
              </a>
            </div>
          </mt-popup>


      </section>
     
    </article>

  </div>
</template>
<script>
  import { reg, regYzm } from '/api/users.js'
  import { agree } from '/api/index.js'
  export default {
    data () {
      return {
        agrees: '',
        datas: {
          phone: '',
          name: '',
          yzmNum: '',
          pwd: '',
          errMsg: null
        },
        selected: '1',
        timingDetail: 60,
        yzms: '获取验证码',
        popupVisible: false
      }
    },
    created () {
      agree().then(res => {
        this.agrees = res
        console.log(this.agrees)
      })
    },
    methods: {
      _popupVisible () {
        this.popupVisible = true
      },
      _regYzm (phone) {
        if (phone.length !== 11) {
          this.datas.errMsg = '手机号必须是11位'
          return false
        }
        if (this.yzms !== '获取验证码') {
          return false
        }
        regYzm({
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
      _reg () {
        let username = this.datas.phone
        let name = this.datas.name
        let password = this.datas.pwd
        let yzm = this.datas.yzmNum
        if (!username || !password || !yzm) {
          this.datas.errMsg = '手机，验证码，密码不能为空'
          return false
        } else if (username.length !== 11) {
          this.datas.errMsg = '手机号必须是11位'
          return false
        } else {
          this.datas.errMsg = null
          reg({
            params: {
              username, name, password, yzm
            }
          }).then(res => {
            if (res.status === 0) {
              alert(`${res.datas}注册成功！`)
              this.$router.go(-1)
            } else {
              this.datas.errMsg = res.msg
            }
          })
        }
      }
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

  header{
    height: 40px;
  }

  article {
    height: calc(100vh - 40px);
    padding: 0.9rem 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  .pingjiaBox{
  width: 100vw;
  height: 100vh;
  background: #F3F1E0;
  padding: 0.3rem;
}
</style>
