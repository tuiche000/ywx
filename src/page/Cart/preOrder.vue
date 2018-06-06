<template>
  <div class="vh100 bf">
    <mt-header fixed title="预购">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-bottom">
      <div class="details">
        <ul>
            <li class="line-80">
              <h3>商品信息</h3>
              <div class="right flex">
                <span>{{$route.params.data.name}}</span>
              </div>
            </li>
            <li class="line-80">
              <h3>是否要发票</h3>
              <div class="right flex">
                <el-radio v-model="formData.ispiao" label="1">是</el-radio>
                <el-radio v-model="formData.ispiao" label="2">否</el-radio>
              </div>
            </li>
            <li class="line-80" v-if="goods.datas[0].baozhuang">
              <h3>包装规格</h3>
              <div class="right flex">
                <el-radio-group v-model="formData.bgui">
                  <el-radio :label="item.bid" v-for="(item, index) in goods.datas[0].baozhuang" :key="index">{{item.battrname}}</el-radio>
                </el-radio-group>
                <!-- <el-radio v-model="formData.bgui" label="1">40/箱</el-radio> -->
              </div>
            </li>
            <li class="line-80" v-if="goods.datas[0].shuxing">
              <h3>产品规格</h3>
              <div class="right flex">
                <el-radio-group v-model="formData.cgui">
                  <el-radio :label="item.cid" v-for="(item, index) in goods.datas[0].shuxing" :key="index">{{item.cattrname}}</el-radio>
                </el-radio-group>
              </div>
            </li>
            <li class="line-80">
              <h3>到货日期</h3>
              <div class="right flex">
                <div class="block">
                  <i class="el-icon-date" @click="openPicker()"> 选择日期</i>
                  <mt-datetime-picker
                    v-model="formData.stadytime"
                    ref="picker"
                    type="date"
                    :startDate="new Date()"
                  >
                  </mt-datetime-picker>
                  {{formData.stadytime ? calcTime : null}}
                </div>
              </div>
            </li>
            <li class="line-80">
              <h3>要求最晚 应价日期</h3>
              <div class="right flex">
                <div class="block">
                  <i class="el-icon-date" @click="openPicker1()"> 选择日期</i>
                  <mt-datetime-picker
                    v-model="formData.endtime"
                    ref="picker1"
                    type="date"
                    :startDate="new Date()"
                  >
                  </mt-datetime-picker>
                  {{formData.endtime ? calcTime2 : null}}
                </div>
              </div>
            </li>
            <li class="line-80">
              <h3>运输方式</h3>
              <div class="right flex">
                <el-radio v-model="formData.isyun" label="1" value="1">自提</el-radio>
                <el-radio v-model="formData.isyun" label="2" value="2">第三方物流</el-radio>
                <el-radio v-model="formData.isyun" label="3" value="3">平台配送</el-radio>
              </div>
            </li>
            <li class="line-80">
              <h3>我的出价</h3>
              <div class="right flex">
                <input v-model="formData.price" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>购买数量</h3>
              <div class="right flex">
                <input v-model="formData.nubmer" type="text">
              </div>
            </li>
            <a @click="_preorder()">
              <el-button type="success" class="sucbtn">预购</el-button>
            </a>
          </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { preorder } from '../../api/shoporder'
import { infogood } from '../../api/index'
import { getStore } from '../../utils/storage'
export default {
  data () {
    return {
      id: '',
      goods: null,
      formData: {
        stadytime: '',
        endtime: ''
      }
    }
  },
  methods: {
    openPicker () {
      this.$refs.picker.open()
    },
    openPicker1 () {
      this.$refs.picker1.open()
    },
    // ?userid=22&goodid=22&goodname=22&ispiao=22&bgui=22&cgui=22&isyun=22&number=22&price=22&stadytime=22&endtime=22
    _preorder () {
      preorder({
        params: {
          userid: this.id,
          shopid: this.$route.params.data.shopid,
          goodid: this.$route.params.data.id,
          goodname: this.$route.params.data.name,
          sipiao: this.formData.sipiao,
          bgui: this.formData.bgui,
          cgui: this.formData.cgui,
          isyun: this.formData.isyun,
          number: this.formData.number,
          price: this.formData.price,
          stadytime: Date.parse(this.formData.stadytime),
          endtime: Date.parse(this.formData.endtime)
        }
      }).then(res => {
        this.$router.go(-1)
        console.log(res)
      })
    }
  },
  computed: {
    calcTime () {
      let stadytime = Date.parse(this.formData.stadytime)
      let date = new Date(stadytime)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ' - '
      let D = date.getDate() + ''
      return Y + M + D + '日'
    },
    calcTime2 () {
      let endtime = Date.parse(this.formData.endtime)
      let date = new Date(endtime)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + ' - '
      let D = date.getDate() + ''
      return Y + M + D + '日'
    },
    _infogood () {
        // 详情信息 （GET）data（id:商品id；name：商品名；img：商品图；price：价格；sale：销量；shu_price：属性价格；shu:属性名；create_time：添加时间；重量：weight）data【’pinglun‘】(id：评论id；name：用户名称；头像：h_img；content：评论内容；create_time：时间)
      infogood({
        params: {
          goodid: this.$route.params.data.id
        }
      }).then(res => {
        this.goods = res
      })
    }
  },
  created () {
    this._infogood()
    this.id = JSON.parse(getStore('userInfo')).datas.id
  }
}
</script>

<style>
.el-radio+.el-radio{
  margin-left: 0.3rem;
}
</style>
<style scoped>
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
.sucbtn{
  width: 100%; border-radius: 0;
}
</style>

