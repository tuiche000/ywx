import http from './public'

// 首页轮播图（GET）
export const banners = (params) => {
  return http.fetchGet('/index/banner', params)
}
// 热门推荐（GET）
export const ishot = (params) => {
  return http.fetchGet('/index/ishot', params)
}
// 热门推荐（banner图，和数据）（GET）
export const ishotgoods = (params) => {
  return http.fetchGet('/index/ishotgoods', params)
}
// 生鲜区（返回分类名）（GET）
export const fresh = (params) => {
  return http.fetchGet('/index/fresh', params)
}
// 生鲜区（banner图，和数据）（GET）
export const freshinfo = (params) => {
  return http.fetchGet('/index/freshinfo', params)
}
// 冰鲜区（返回分类名）（GET）
export const seafood = (params) => {
  return http.fetchGet('/index/seafood', params)
}
// 冰鲜区（banner图，和数据）（GET）
export const seafoodinfo = (params) => {
  return http.fetchGet('/index/seafoodinfo', params)
}
// 冻品区（返回分类名）（GET）
export const frozen = (params) => {
  return http.fetchGet('/index/frozen', params)
}
// 冻品区（banner图，和数据）（GET）
export const frozeninfo = (params) => {
  return http.fetchGet('/index/frozeninfo', params)
}
// 新品区（返回分类名）（GET）
export const isnew = (params) => {
  return http.fetchGet('/index/isnew', params)
}
// 新品区（banner图，和数据）（GET）
export const newinfo = (params) => {
  return http.fetchGet('/index/newinfo', params)
}
// 分类列表
export const getCategory = (params) => {
  return http.fetchGet('/index/cate', params)
}
// 二级分类
export const getCategory2 = (params) => {
  return http.fetchGet('/index/cateinfo', params)
}
// 限时特价（GET）
export const shopnav = (params) => {
  return http.fetchGet('/index/shopnav', params)
}
// 大区（返回分类名）（GET）
export const large = (params) => {
  return http.fetchGet('/index/large', params)
}
// 大区（banner图，和数据）（GET）
export const largeinfo = (params) => {
  return http.fetchGet('/index/largeinfo', params)
}
// 添加足迹 （GET） userid=1&goodid=1
export const footprint = (params) => {
  return http.fetchGet('/index/footprint', params)
}
// 查看足迹 （GET）
export const footinfo = (params) => {
  return http.fetchGet('/index/footinfo', params)
}
// 详情信息 （GET）
export const infogood = (params) => {
  return http.fetchGet('/index/infogood', params)
}
// 限时特价（三图） （GET） sharttime:开始时间  endtime：结束时间  data：【id：商品id；name：商品名；img：图片】
export const threenav = (params) => {
  return http.fetchGet('/index/threenav', params)
}
// 支付宝接口 （GET）
export const goalipay = (params) => {
  return http.fetchPost('/index/goalipay', params)
}
// 搜索 name:传的值  page：默认传1 第二次下拉传2 （GET）
export const search = (params) => {
  return http.fetchGet('/index/search', params)
}
// 商家已发布的商品 userid:用户id；limit：分页参数 （GET） goodinfo?userid=11&limit=4&goodstatus=0
export const goodinfo = (params) => {
  return http.fetchGet('/index/goodinfo', params)
}
// 更多评论 ?goodid=222&limit=3
export const pinlunall = (params) => {
  return http.fetchGet('/index/pinlunall', params)
}
// 删除图片接口 delpic?imgurl=/uploads/infos/20180208/e505db1aef39027f55ee4ac664d6df1f.jpg
export const delpic = (params) => {
  return http.fetchGet('/index/delpic', params)
}
// 卖家协议
export const seller = (params) => {
  return http.fetchGet('/index/seller', params)
}
// 注册协议
export const agree = (params) => {
  return http.fetchGet('/index/agree', params)
}
// 账户充值 【type：1支付宝，2：微信；3：对公账户】 /chong?userid=22&type=1&money=66
export const chong = (params) => {
  return http.fetchGet('/index/chong', params)
}
// 上下架按钮接口 goodid:商品ID；goodstatus:状态  /goodstatus?goodid=1&goodstatus=1
export const goodstatus = (params) => {
  return http.fetchGet('/index/goodstatus', params)
}
// 支付成功的回调
export const huidiao = (params) => {
  return http.fetchGet('/index/huidiao', params)
}

