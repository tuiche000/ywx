<template>
  <div class="bf">
    <mt-header fixed title="编辑商品">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
      <mt-button slot="right">
        <a @click="_addgoods()">完成</a>
      </mt-button>
      
    </mt-header>
    <div class="header-bottom">
      <div class="details">
        <ul>
            <li class="line-30">
              <span>上传商品图片</span>
              <br>
              <br>
              <!-- {{formData.goodsimg}} -->
              <el-upload
                :action="formData.actions"
                :show-file-list="true"
                :file-list="[{name: 'food.jpg', url: formData.goodsimg[0]}]" 
                list-type="picture-card"
                :multiple="true"
                :data="formData.license"
                name="img"
                :onSuccess="uploadSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="limit"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </li>
            <li class="line-80">
              <h3>期货现货</h3>
              <div class="right flex">
                <el-radio v-model="formData.catetype" label="1">期货</el-radio>
                <el-radio v-model="formData.catetype" label="2">现货</el-radio>
              </div>
            </li>
            <li class="line-80">
              <h3>配送范围</h3>
              <div class="right flex">
                <el-radio v-model="formData.range" label="1">上海</el-radio>
                <el-radio v-model="formData.range" label="2">外地</el-radio>
              </div>
            </li>
            <li class="line-80">
              <h3>预付</h3>
              <div class="right flex">
                <el-radio v-model="formData.pay" label="1">不可预付</el-radio>
                <el-radio v-model="formData.pay" label="2">预付10%</el-radio>
              </div>
            </li>
            <li class="line-80">
              <h3>产品标题</h3>
              <div class="right flex">
                <input v-model="formData.goodname" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>产品价格</h3>
              <div class="right flex">
                <input v-model="formData.price" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>上线时间</h3>
              <div class="right flex">
                <div class="block">
                  <div class="right flex">
                    <el-date-picker
                      v-model="formData.starttime"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </li>
            <li class="line-80">
              <h3>产品类型</h3>
              <div class="right flex">
              <el-select v-model="formData.cateone" size="mini" placeholder="请选择" @change="_change">
                <el-option
                  v-for="item in cate1"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
              </div>
            </li>
            <li class="line-80">
              <h3>产品类型2</h3>
              <div class="right flex">
                <el-select v-model="formData.catetwo" size="mini" placeholder="请选择" @change="_change1">
                  <el-option
                    v-for="item in cate2"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>  
              </div>
            </li>
            <li class="line-80">
              <h3>到货日期</h3>
              <div class="right flex">
                <el-date-picker
                  v-model="formData.arrivaltime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </li>
            <li class="line-80">
              <h3>运费</h3>
              <div class="right flex">
                <input v-model="formData.freight" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>起发量</h3>
              <div class="right flex">
                <input v-model="formData.hair" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>成单数</h3>
              <div class="right flex">
                <input v-model="formData.salenum" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>库存量</h3>
              <div class="right flex">
                <input v-model="formData.goodskc" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>规格</h3>
              <div class="right flex">
                <input v-model="formData.specifications" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>免赔率</h3>
              <div class="right flex">
                <input v-model="formData.exemption" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>破壳率</h3>
              <div class="right flex">
                <input v-model="formData.broken" type="text">
              </div>
            </li>
            <li class="line-80">
              <h3>缩水率</h3>
              <div class="right flex">
                <input v-model="formData.shrinkage" type="text">
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { addgoods, category, biangood } from '../../../api/users'
import { getStore } from '../../../utils/storage'
import { delpic } from '../../../api/index'
export default {
  data () {
    return {
      id: '',
      formData: {
        actions: 'http://jk.yiwangxian.com/index.php/api/index/image',
        goodsimg: [],
        stadytime: '',
        catetype: '',
        range: '',
        pay: '',
        goodname: '',
        price: '',
        cateone: '',
        catetwo: '',
        freight: '',
        specifications: '',
        hair: '',
        salenum: '',
        goodskc: '',
        exemption: '',
        broken: '',
        shrinkage: ''
      },
      // 上传组件配置
      limit: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      cate1: [],
      cate2: []
    }
  },
  methods: {
    // 上传成功后的回调
    uploadSuccess (response, file, fileList) {
      this.formData.goodsimg = []
      this.formData.goodsimg.push(`http://shop.moqimedia.com${response.datas.path}`)
      console.log(this.formData.goodsimg[0])
    },
    // 删除图片回调
    handleRemove (file, fileList) {
      this.formData.goodsimg = null
      // 删除图片接口 delpic?imgurl=/uploads/infos/20180208/e505db1aef39027f55ee4ac664d6df1f.jpg
      delpic({
        params: {
          imgurl: file.response.datas.path
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 放大图片回调
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 限制用户上传的图片格式和大小。
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // userid=22&catetype=22&range=22&pay=22&goodname=22&price=22&starttime=22&cateone=22&catetwo=22&arrivaltime=22&freight=22&specifications=22&hair=22&salenum=22&goodskc=22&norms=22&exemption=22&broken=22&shrinkage=22
    _addgoods () {
      let starttime = Date.parse(this.formData.starttime) / 1000
      let arrivaltime = Date.parse(this.formData.arrivaltime) / 1000
      let index = this.formData.goodsimg[0].indexOf('/uploads')
      console.log(index)
      let img = this.formData.goodsimg[0].substring(index)
      console.log(img)
      addgoods({
        goodid: this.$route.params.id,
        shopid: this.id,
        img,
        catetype: this.formData.catetype,
        range: this.formData.range,
        pay: this.formData.pay,
        goodname: this.formData.goodname,
        price: this.formData.price,
        starttime: starttime,
        cateone: this.formData.cateone,
        catetwo: this.formData.catetwo,
        arrivaltime: arrivaltime,
        freight: this.formData.freight,
        specifications: this.formData.specifications,
        hair: this.formData.hair,
        salenum: this.formData.salenum,
        goodskc: this.formData.goodskc,
        exemption: this.formData.exemption,
        broken: this.formData.broken,
        shrinkage: this.formData.shrinkage
      }).then(res => {
        this.$router.go(-1)
      }).catch(err => {
        console.log(err)
      })
    },
    // 商家里的分类(1级)（2级）都请求这个接口  分类id （GET）  category?cateid=22
    _category (id) {
      category({
        params: {
          cateid: id
        }
      }).then(res => {
        if (id) {
          this.cate2 = []
          res.forEach(item => {
            this.cate2.push(item)
          })
          console.log(this.cate2)
        } else {
          console.log(res)
          res.forEach(item => {
            this.cate1.push(item)
          })
        }
      })
    },
    _biangood () {
      biangood({
        params: {
          goodid: this.$route.params.id
        }
      }).then(res => {
        // shopid: this.id,
        this.formData.goodsimg.push(res.img)
        this.formData.catetype = res.catetype
        this.formData.range = res.range
        this.formData.pay = res.pay
        this.formData.goodname = res.goodname
        this.formData.price = res.price
        this.formData.starttime = res.starttime * 1000
        this.formData.cateone = res.cateone.id
        this.formData.catetwo = res.catetwo.id
        this.formData.arrivaltime = res.arrivaltime * 1000
        this.formData.freight = res.freight
        this.formData.specifications = res.specifications
        this.formData.hair = res.hair
        this.formData.salenum = res.salenum
        this.formData.goodskc = res.goodskc
        this.formData.exemption = res.exemption
        this.formData.broken = res.broken
        this.formData.shrinkage = res.shrinkage
        this._category(this.formData.cateone)
      })
    },
    _change () {
      console.log(this.formData.cateone)
      this._category(this.formData.cateone)
    },
    _change1 () {
      console.log(this.formData.catetwo)
    }
  },
  created () {
    this.id = JSON.parse(getStore('userInfo')).datas.id
  },
  mounted () {
    this._biangood()
    this._category()
  }
}
</script>

<style>
.el-input__inner{
  border: none;
  height: 100%;
}
.el-input__icon{
  line-height: inherit;
}
</style>

<style scoped>
.line-24{
  padding-left: 0.3rem; font-size: 0.24rem;
}
.line-30{
  padding: 0.3rem;
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
.pingjiaBox{
  width: 100vw;
  background: #fff;
  padding: 0.3rem;
}
</style>

