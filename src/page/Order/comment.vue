<template>
  <div class="vh100 f28">
    
    <header>
      <mt-header fixed title="发表评论">
        <a slot="left" @click="$router.go(-1)">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
    </header>

    <article>
      <section>
        <div class="box">
          <p>评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价评价</p>
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">添加图片</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>    
        </div>
      </section>
      <div class="center" style="margin-bottom:0.4rem">
                <button-vue :btnData="{
                  size: 'l',
                  text: '发布'
                }"></button-vue>
      </div>
    </article>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        selected: '1'
      }
    }
  }
</script>

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
      padding: 0.2rem;
      .box {
        width: 100%;
        background-color: #f3f1e0;
        border: solid 2px #544c72;
        padding: 0.3rem;
        p{
          font-size: 0.23rem;
          line-height: 0.32rem;
          color: #434a54;
          margin-bottom: 1rem;
        }
      }
    }
  }


</style>
