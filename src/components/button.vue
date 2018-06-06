<template>
  <div class="btn">
    <div class="l" v-if="btnData.size == 'l'">
      <!-- <img src="../assets/img/button/l.png" alt=""> -->
      {{btnData.text}}
    </div>
    <div class="s" v-if="btnData.size == 's'">
      <!-- <img src="../assets/img/button/s.png" alt=""> -->
      {{btnData.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'btnData'
  ]
}
</script>

<style scoped>
.btn{
  display: inline-block;
}
.l,.s{
  display: flex; justify-content: center; align-items: center; color: #434A54;
}
.l{
  width: 6.85rem; height: 1.06rem;
  background: url(../assets/img/button/l.png) no-repeat;
  background-size: 100% 100%; font-size: 0.28rem; 
}
.s{
  width: 1.5rem; height: 0.62rem;
  background: url(../assets/img/button/s.png) no-repeat;
  background-size: 100% 100%; font-size: 0.22rem; 
}
</style>
