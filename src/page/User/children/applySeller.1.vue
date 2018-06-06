<template>
  <div class="vh100 bf">
    <mt-header fixed title="申请成为卖家">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-bottom">
      <mt-navbar v-model="selected">
            <mt-tab-item id="1">个人</mt-tab-item>
            <mt-tab-item id="2">企业</mt-tab-item>
          </mt-navbar>

       <!-- tab-container -->
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <div class="details">
                <div class="line-80"> 
                  <h3>*姓名：</h3>
                  <div class="right flex">
                  <input v-model="data1.username" type="text">
                  </div>
                </div>
                <div class="line-80">
                  <h3>*联系电话：</h3>
                  <div class="right flex">
                  <input v-model="data1.mobile" type="number">
                  </div>
                </div>
                <div class="line-80">
                  <h3>*身份证号:</h3>
                  <div class="right flex">
                  <input v-model="data1.card">
                  </div>
                </div>
                <div class="line-80">
                <h3>家庭住址:</h3>
                  <div class="right flex">
                  <input v-model="data1.address">
                  </div>
                </div>
                <div class="line-80">
                  <h3>邮箱:</h3>
                  <div class="right flex">
                  <input v-model="data1.email" type="email">
                  </div>
                </div>
                <div class="line-80 auto col">
                  <span>*身份证正面照 </span>
                  <el-upload
                      :action="actions"
                      list-type="picture-card"
                      :data="data1.zcard"
                      name="img"
                      :onSuccess="uploadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="limit"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :Ssrc="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="line-80 auto col">
                  <span>*身份证反面照 </span>
                  <el-upload
                      :action="actions"
                      list-type="picture-card"
                      :data="data1.fcard"
                      name="img"
                      :onSuccess="uploadSuccess1"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="limit"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :Ssrc="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                
                <div class="btn center" @click="_personal()" style="margin-top: 1rem;">
                  <button-vue :btnData="{
                    size: 'l',
                    text: '确定'
                  }"></button-vue>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <div class="details">
                <div class="line-80">
                  <h3>*公司名称：</h3>
                  <div class="right flex">
                  <input v-model="data2.name" type="text">
                  </div>
                </div>
                <div class="line-80">
                  <h3>*法人：</h3>
                  <div class="right flex">
                  <input v-model="data2.legal" type="number">
                  </div>
                </div>
                <div class="line-80">
                  <h3>*法人电话:</h3>
                  <div class="right flex">
                  <input v-model="data2.legaltel">
                  </div>
                </div>
                <div class="line-80">
                  <h3>*法人身份:</h3>
                  <div class="right flex">
                  <input v-model="data2.legalcard">
                  </div>
                </div>
                <div class="line-80 auto col">
                  <span>*身份证正面照 </span>
                  <el-upload
                      :action="actions"
                      list-type="picture-card"
                      :data="data2.zcard"
                      name="img"
                      :onSuccess="uploadSuccess2"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="limit"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :Ssrc="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="line-80 auto col">
                  <span>*身份证反面照 </span>
                  <el-upload
                      :action="actions"
                      list-type="picture-card"
                      :data="data2.fcard"
                      name="img"
                      :onSuccess="uploadSuccess3"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="limit"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :Ssrc="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="line-80 auto col">
                  <span>*公司营业执照上传 </span>
                  <el-upload
                      :action="actions"
                      list-type="picture-card"
                      :data="data2.license"
                      name="img"
                      :onSuccess="uploadSuccess4"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :limit="limit"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="line-80">
                  <h3>*实体店地址:</h3>
                  <div class="right flex">
                  <input v-model="data2.address">
                  </div>
                </div>
                <div class="btn center" @click="_enterprise()" style="margin-top: 1rem;">
                  <button-vue :btnData="{
                    size: 'l',
                    text: '确定'
                  }"></button-vue>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>

      </div>
      <div class="center" style="padding: 0.3rem">
        <a @click="_popupVisible()" class="f28 caa">
          {{sellers.title}}
        </a>
      </div>
      <mt-popup
      v-model="popupVisible"
      position="top"
      >
        <div class="pingjiaBox flex col gps">
          <div v-html="sellers.content"></div>
          <a @click="popupVisible = false" style="position: absolute; bottom: 0.2rem;">
            <button-vue :btnData="{
              size: 'l',
              text: '我已阅读卖家协议'
            }" style="display:flex;justify-content:flex-center"></button-vue>
          </a>
        </div>
      </mt-popup>
    
    
  </div>

</template>

<script>
import { personal, enterprise } from '../../../api/users'
import { delpic, seller } from '../../../api/index'
import { getStore } from '../../../utils/storage'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      selected: '1',
      sellers: '',
      actions: 'http://jk.yiwangxian.com/index.php/api/index/image',
      dialogImageUrl: '',
      dialogVisible: false,
      limit: 1,
      userid: null,
      data1: {
        username: null,
        mobile: null,
        card: null,
        address: null,
        email: null,
        zcard: null,
        fcard: null
      },
      data2: {
        name: null,
        legal: null,
        legaltel: null,
        address: null,
        legalcard: null,
        zcard: null,
        fcard: null,
        license: null
      },
      popupVisible: false
    }
  },
  created () {
    this.userid = JSON.parse(getStore('userInfo')).datas.id
    seller().then(res => {
      this.sellers = res
    })
  },
  methods: {
    // 登陆时将本地的添加到用户购物车
    ...mapMutations(['RECORD_USERINFO']),
    _popupVisible () {
      this.popupVisible = true
    },
    // 删除图片回调
    handleRemove (file, fileList) {
      // 删除图片接口 delpic?imgurl=/uploads/infos/20180208/e505db1aef39027f55ee4ac664d6df1f.jpg
      delpic({
        params: {
          imgurl: file.response.datas.path
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 点击放大图片回调
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 个人正面上传成功后的回调
    uploadSuccess (response, file, fileList) {
      this.data1.zcard = response.datas.path
    },
    // 个人反面上传成功后的回调
    uploadSuccess1 (response, file, fileList) {
      this.data1.fcard = response.datas.path
    },
    // 企业反面上传成功后的回调
    uploadSuccess2 (response, file, fileList) {
      this.data2.zcard = response.datas.path
    },
    // 企业反面上传成功后的回调
    uploadSuccess3 (response, file, fileList) {
      this.data2.fcard = response.datas.path
    },
    // 企业反面上传成功后的回调
    uploadSuccess4 (response, file, fileList) {
      this.data2.license = response.datas.path
    },
    _personal () {
      personal({
        userid: this.userid,
        username: this.data1.username,
        mobile: this.data1.mobile,
        card: this.data1.card,
        address: this.data1.address,
        email: this.data1.email,
        zcard: this.data1.zcard,
        fcard: this.data1.fcard
      }).then(res => {
        if (Object.is(res.status, '0')) {
          this.RECORD_USERINFO(res)
        } else {
          alert('提交信息错误')
          return
        }
        this.$router.go(-1)
      })
    },
    _enterprise () {
      enterprise({
        userid: this.userid,
        name: this.data2.name,
        legal: this.data2.legal,
        legaltel: this.data2.legaltel,
        address: this.data2.address,
        legalcard: this.data2.legalcard,
        zcard: this.data2.zcard,
        fcard: this.data2.fcard,
        license: this.data2.license
      }).then(res => {
        this.$router.go(-1)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style>

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
.pingjiaBox{
  width: 100vw;
  height: 100vh;
  background: #F3F1E0;
  padding: 0.3rem;
}
</style>

