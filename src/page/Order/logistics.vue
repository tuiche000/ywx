<template>
  <div>

    <mt-header fixed title="我的物流">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>


    <div class="bot40">
      <ul>
        <li class="flex">
          <product-vue class="flex1"></product-vue>
        </li>
      </ul>
      <div>
        <div class="caa">最新物流</div>
        <div>
          <el-steps direction="vertical" :active="1">
            <el-step title="2017/12/7" description="到达某市某地"></el-step>
            <el-step title="2017/12/7" description="到达某市某地到达某市某地"></el-step>
            <el-step title="2017/12/7" description="到达某市某地到达某市某地到达某市某地"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
.el-step.is-vertical{
  min-height: 1rem;
}
</style>

<style lang="scss" scoped>
.bot40{
  background: #fff;
  padding: 0.2rem 0.3rem;
  li{
    padding: 0.2rem 0.3rem;
    .btn{
      background: #f1f4f7;
      width: 1.5rem;
      height: 0.44rem;
      border-radius: 0.22rem;
    }
  }
  .caa{
    margin: 0.4rem 0;
  }
}
</style>
