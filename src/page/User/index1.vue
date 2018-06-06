<template>
  <div>
    <article>
      <section class="flex-center col">
        <div class="face">
          <img src="../../assets/img/user/face1.png" alt="">
        </div>
        <br>
        <div class="center">螯龙虾(先生)</div>
      </section> 
     <div>
       <router-link to="/user/business/goodsManage">
        <div class="line-80 flex bet">
          <span> 商品管理</span>
          <span class="caa">更多 ></span>
        </div>
       </router-link>
       <!-- <div class="productManage bf ">
         <ul class="flex">
           <li v-for="(item, index) in sellerproduct" :key="index">
             <div class="top">
               <img :src="item.src" alt="">
             </div>
             <div class="bottom center">{{item.title}}</div>
           </li>
         </ul>
       </div> -->
     </div>
      <div>
        <router-link :to="item.to" v-for="(item, index) in sellerList" :key="index">
          <div class="line-80 more">
            <span>{{item.title}}</span>           
          </div>
        </router-link>
      </div>
    </article>  
  </div>  
</template>

<script>
export default {
  data () {
    return {
      sellerList: [
        {title: '联系客服', to: '/user/sxhelp'},
        {title: '返回个人', to: '/users'}
      ],
      sellerproduct: [
        {src: require('../../assets/img/user/2.png'), title: '魔芋'},
        {src: require('../../assets/img/user/3.png'), title: '刺身拼盘'},
        {src: require('../../assets/img/user/4.png'), title: '鸡尾虾'},
        {src: require('../../assets/img/user/5.png'), title: '贝壳'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.face{
  text-align: center
}
.face img{
  width: 1.7rem; height: 1.7rem;
}
section{
  background: #f8feff;
  height: 3.9rem;
}
/* seller */
.productManage{
  border-bottom: 0.03rem solid #F1F4F7;
}
.productManage li{
  width: 25%;
}
.productManage li img{
  width: 100%;
}
</style>
