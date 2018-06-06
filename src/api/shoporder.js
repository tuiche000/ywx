import http from './public'

// 物流信息（ 确认收货）：userid（cookie里的id）；orderid（物流信息里的id）；status（物流信息里的order_status） (GET)
export const orderstatus = (params) => {
  return http.fetchGet('/shoporder/orderstatus', params)
}
// 几个订单状态（userid用户id）【待支付:status=-1】【待收货：status=0】【待评价：status=2】【全部订单：status=all】
export const orderstate = (params) => {
  return http.fetchGet('/shoporder/orderstate', params)
}
// 结算 (GET)
export const settlnt = (params) => {
  return http.fetchGet('/shoporder/settlnt', params)
}
// 评论接口 (GET) userid：用户id    goodid：商品id   count：评论内容  orderid：订单id
export const pinlun = (params) => {
  return http.fetchGet('/shoporder/pinlun', params)
}
// 开票信息 (GET) （userId:用户id）【未开票：kaipiao=1】【在开票：kaipiao=2】【开票结束：kaipiao=3】 billing?userid=370&kaipiao=1
export const billing = (params) => {
  return http.fetchGet('/shoporder/billing', params)
}
// 提交发票 stadybill?userid=370&orderid=1&iselectronics=1&istype=370&shuihao=1&taitou=370&money=1&content=370&address=1&email=1
export const stadybill = (params) => {
  return http.fetchGet('/shoporder/stadybill', params)
}
// 发票详情 ?orderid=22
export const billinfo = (params) => {
  return http.fetchGet('/shoporder/billinfo', params)
}
// 预购商品 preorder?userid=22&goodid=22&goodname=22&ispiao=22&bgui=22&cgui=22&isyun=22&number=22&price=22&stadytime=22&endtime=22
export const preorder = (params) => {
  return http.fetchGet('/shoporder/preorder', params)
}
// 结算 preorder?goodid     商品ID
// dprice     商品单价
// xprice     商品箱价

// goodname   商品名
// img        商品图片
// shuid      属性ID
// catetype   发货日期
// number     数量
// isyun      运费
export const addtocart = (params) => {
  return http.fetchPost('/shoporder/addtocart', params)
}
// 拿去购物车信息?userid
export const recart = (params) => {
  return http.fetchGet('/shoporder/recart', params)
}
// 删除购物车信息?
export const editshopgood = (params) => {
  return http.fetchGet('/shoporder/editshopgood', params)
}
// 添加商品到购物车?userid=1&goodid=1shuid=1&catetype=1&number=1&baozhuang=1
export const addcart = (params) => {
  return http.fetchPost('/shoporder/addcart', params)
}
// 结算接口?userid&shibie=0
export const cartgoods = (params) => {
  return http.fetchGet('/shoporder/cartgoods', params)
}
// 编辑商品数量?userid=1&biao=2&jia=1
export const editshopgoodnum = (params) => {
  return http.fetchGet('/shoporder/editshopgoodnum', params)
}
