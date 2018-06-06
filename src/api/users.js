import http from './public'

// 注册接口
export const reg = (params) => {
  return http.fetchGet('/users/register', params)
}
// 注册验证码
export const regYzm = (params) => {
  return http.fetchGet('/users/code', params)
}
// 登录接口
export const login = (params) => {
  return http.fetchGet('/users/login', params)
}
// 短信登录验证码
export const loncode = (params) => {
  return http.fetchGet('/users/loncode', params)
}
// 短信登录（POST）
export const shortlogin = (params) => {
  return http.fetchGet('/users/shortlogin', params)
}
// 忘记密码 forget?mobile=11&password=11&password2=11&code=11 (GET) 【失败：status：  1    msg:()】【成功：status：  0    msg:(密码修改成功)】
export const forget = (params) => {
  return http.fetchGet('/users/forget', params)
}
// 成为卖家个人（POST）
export const personal = (params) => {
  return http.fetchPost('/users/personal', params)
}
// 成为卖家企业（POST）
export const enterprise = (params) => {
  return http.fetchPost('/users/enterprise', params)
}
// 联系我们（GET）
export const contactus = (params) => {
  return http.fetchGet('/users/contactus', params)
}
// 帮助与客服 （GET）
export const sxhelp = (params) => {
  return http.fetchGet('/users/sxhelp', params)
}
// 售后服务（GET）
export const sxcustomer = (params) => {
  return http.fetchGet('/users/sxcustomer', params)
}
// 地址管理 传userid（cookie里的id）（GET）
export const address = (params) => {
  return http.fetchGet('/users/address', params)
}
// 默认地址：传userid（cookie里的id） 地址：id （GET）
export const setaddress = (params) => {
  return http.fetchGet('/users/setaddress', params)
}
// 删除地址： 地址：id（GET）
export const deladdress = (params) => {
  return http.fetchGet('/users/deladdress', params)
}
// 添加地址 （GET） id:地址id   userid：用户id  username：名字   mobile：手机号 ；备用号：mobile2；address ：地址
export const saveress = (params) => {
  return http.fetchGet('/users/saveress', params)
}
// 编辑地址 （GET） id:地址id   userid：用户id  username：名字   mobile：手机号 ；备用号：mobile2；address ：地址
export const upress = (params) => {
  return http.fetchGet('/users/upress', params)
}
// 账单明细 userbill?userid=222
export const userbill = (params) => {
  return http.fetchGet('/users/userbill', params)
}
// 商家去发布商品 userid :用户id （POST） ?userid=22&catetype=22&range=22&pay=22&goodname=22&price=22&starttime=22&cateone=22&catetwo=22&arrivaltime=22&freight=22&specifications=22&hair=22&salenum=22&goodskc=22&norms=22&exemption=22&broken=22&shrinkage=22
export const addgoods = (params) => {
  return http.fetchPost('/users/addgoods', params)
}
// 卖家删除商品 delgood?goodid=22
export const delgood = (params) => {
  return http.fetchGet('/users/delgood', params)
}
// 商家里的分类(1级)（2级）都请求这个接口  分类id （GET）  category?cateid=22
export const category = (params) => {
  return http.fetchGet('/users/category', params)
}
// 卖家商品编辑   （返回的参数见发布商品参数）
export const biangood = (params) => {
  return http.fetchGet('/users/biangood', params)
}
// 余额接口
export const jiage = (params) => {
  return http.fetchGet('/users/jiage', params)
}
