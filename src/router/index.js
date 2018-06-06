import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const Cart = resolve => require(['/page/Cart/cart'], resolve)
const checkout = resolve => require(['/page/Cart/checkout'], resolve)
const preOrder = resolve => require(['/page/Cart/preOrder'], resolve)
const register = resolve => require(['/page/register/register'], resolve)
const category = resolve => require(['/page/category/category'], resolve)
const area = resolve => require(['/page/area/area'], resolve)
const shopnav = resolve => require(['/page/area/shopnav'], resolve)
const goodsDetails = resolve => require(['/page/Goods/goodsDetails'], resolve)
// user
const user = resolve => require(['/page/User/user'], resolve)
const invoice = resolve => require(['/page/User/children/invoice'], resolve)
const invoiceDetail = resolve => require(['/page/User/children/invoiceDetail'], resolve)
const UserIndex = resolve => require(['/page/User/index'], resolve)
const aboutUs = resolve => require(['/page/User/children/aboutUs'], resolve)
const sxcustomer = resolve => require(['/page/User/children/sxcustomer'], resolve)
const sxhelp = resolve => require(['/page/User/children/sxhelp'], resolve)
const recharge = resolve => require(['/page/User/children/recharge'], resolve)
const address = resolve => require(['/page/User/children/address'], resolve)
const addressManage = resolve => require(['/page/User/children/addressManage'], resolve)
const applySeller = resolve => require(['/page/User/children/applySeller'], resolve)
const col = resolve => require(['/page/User/children/col'], resolve)
const accountDetails = resolve => require(['/page/User/children/accountDetails'], resolve)
// 卖家
const business = resolve => require(['/page/User/business'], resolve)
const businessIndex = resolve => require(['/page/User/index1'], resolve)
const goodsManage = resolve => require(['/page/User/children1/goodsManage'], resolve)
const goodsCreate = resolve => require(['/page/User/children1/goodsCreate'], resolve)
const goodsEdit = resolve => require(['/page/User/children1/goodsEdit'], resolve)
// order
const order = resolve => require(['/page/Order/order'], resolve)
const orderAll = resolve => require(['/page/Order/all'], resolve)
const histroy = resolve => require(['/page/Order/histroy'], resolve)
const daishouhuo = resolve => require(['/page/Order/daishouhuo'], resolve)
const daipingjia = resolve => require(['/page/Order/daipingjia'], resolve)
const daifu = resolve => require(['/page/Order/daifu'], resolve)
const logistics = resolve => require(['/page/Order/logistics'], resolve)
const comment = resolve => require(['/page/Order/comment'], resolve)

Vue.use(Router)
export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', name: 'home', component: Home},
        {path: 'category', name: 'category', component: category},
        {path: 'cart', name: 'cart', component: Cart},
        {path: 'users', name: '个人中心', component: UserIndex}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: register},
    {
      path: '/order',
      name: 'order',
      component: order,
      redirect: '/order/all',
      children: [
        {path: 'all', name: '全部订单', component: orderAll},
        {path: 'histroy', name: 'histroy', component: histroy},
        {path: 'daishouhuo', name: '待收货', component: daishouhuo},
        {path: 'daipingjia', name: '待评价', component: daipingjia},
        {path: 'daifu', name: 'daifu', component: daifu},
        {path: 'logistics', name: '物流', component: logistics},
        {path: 'comment', name: '评论', component: comment}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/users',
      children: [
        {path: 'col', name: '发票管理', component: col},
        {path: 'invoice/:id/:uid', name: '订单发票', component: invoice},
        {path: 'invoiceDetail/:id/state/:state', name: '发票详情', component: invoiceDetail},
        {path: 'aboutUs', name: 'aboutUs', component: aboutUs},
        {path: 'sxhelp', name: 'sxhelp', component: sxhelp},
        {path: 'sxcustomer', name: 'sxcustomer', component: sxcustomer},
        {path: 'recharge', name: '充值中心', component: recharge},
        {path: 'address', name: '地址选择', component: address},
        {path: 'addressManage/:data', name: 'addressManage', component: addressManage},
        {path: 'applySeller', name: '申请成为卖家', component: applySeller},
        {path: 'accountDetails', name: '账单明细', component: accountDetails},
        {
          path: 'business',
          name: 'business',
          component: business,
          redirect: 'business/index',
          children: [
            {path: 'index', name: 'businessIndex', component: businessIndex},
            {path: 'goodsManage', name: 'goodsManage', component: goodsManage},
            {path: 'goodsCreate', name: 'goodsCreate', component: goodsCreate},
            {path: 'goodsEdit/:id', name: 'goodsEdit', component: goodsEdit}
          ]
        }
      ]
    },
    {path: '/area/:data', name: 'area', component: area},
    {path: '/shopnav', name: 'shopnav', component: shopnav},
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '/preOrder/:data', name: 'preOrder', component: preOrder},
    {path: '/goodsDetails/:data', name: 'goodsDetails', component: goodsDetails}
    // {path: '*', redirect: '/home'}
  ]
})
