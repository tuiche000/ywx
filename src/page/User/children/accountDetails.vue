<template>
  <div class="f28">
    
    <header>
      <mt-header fixed title="账单明细">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </header>

    <article class="bf">
      <section>
          <mt-navbar v-model="selected">
            <mt-tab-item id="1">账单</mt-tab-item>
            <mt-tab-item id="2">保证金</mt-tab-item>
          </mt-navbar>

          <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <ul>
                <li class="item" v-for="(item, index) in datas" :key="index">
                  <div class="top flex bet">
                    <div class="left">{{item.name}}</div>
                    <div class="right flex-center">
                      <span>{{item.money}}</span>
                    </div>
                  </div>
                  <div class="bottom caa">
                    <span>{{item.time}}</span>
                  </div>
                </li>
              </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <ul>
                <li class="item" v-for="(item, index) in datas1" :key="index">
                  <div class="top flex bet">
                    <div class="left">保证金</div>
                    <div class="right flex-center">
                      <span>{{item.money}}</span>
                    </div>
                  </div>
                  <div class="bottom caa">
                    <span>{{item.time}}</span>
                  </div>
                </li>
              </ul>
            </mt-tab-container-item>
          </mt-tab-container>
         
          
      </section>

    </article>

  </div>
</template>
<script>
  import { userbill } from '../../../api/users'
  import { getStore } from '/utils/storage.js'
  export default {
    data () {
      return {
        selected: '1',
        datas: [],
        datas1: [],
        userInfo: ''
      }
    },
    methods: {
      // userid=222
      _userbill (id) {
        userbill({
          params: {
            userid: id
          }
        }).then(res => {
          this.datas = res.datas
          this.datas1 = res.msg
        })
      }
    },
    created () {
      this.userInfo = JSON.parse(getStore('userInfo')).datas.id
      this._userbill(this.userInfo)
    }
  }
</script>
<style>
.el-input__inner{
border-radius: 0.37rem;
    background: #F1F4F7;
    border: none;
    margin-top: 0.5rem;
}
</style>

<style lang="scss" rel="stylesheet/scss" scoped>

  header{
    height: 40px;
  }

  article {
    height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    section{
      .item{
        padding: 0.3rem;
        box-shadow: 0px 1px 1px 0px rgba(1, 1, 1, 0.04);
      }
      .bottom{
        margin-top: 0.3rem
      }
    }
  }


</style>
