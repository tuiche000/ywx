import {
  INIT_BUYCART,
  ADD_CART,
  EDIT_CART,
  RECORD_USERINFO,
  GET_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REMOVE_CART
} from './mutation-types'
import { setStore, getStore, removeStore } from '../utils/storage'
import { addcart, editshopgood, recart, editshopgoodnum } from '../api/shoporder'

export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let userInfo = JSON.parse(getStore('userInfo')).datas  // 用户信息
    recart({
      params: {
        userid: userInfo.id
      }
    }).then(res => {
      let cart = []
      res.datas.map(item => {
        cart.push(item)
      })
      state.cartList = cart
    })
    // debugger
    // let initCart = getStore('buyCart')
    // if (initCart) {
    //   state.cartList = JSON.parse(initCart)
    // }
    // console.log(state.cartList)
  },
  // 加入购物车
  [ADD_CART] (state, {productId, productPrice, productName, productImg, productNum = 1, porduct}) {
    let userInfo = JSON.parse(getStore('userInfo')).datas  // 用户信息
    // console.log(userInfo)
    // let cart = state.cartList // 购物车
    // let falg = true
    // let goods = {
    //   id: productId,
    //   price: productPrice,
    //   name: productName,
    //   img: productImg,
    //   More: porduct
    // }

    // if (cart.length >= 1) {        // 有内容
    //   cart.map(item => {
    //     if (item.id === productId && item.More.shuxing2.cid === porduct.shuxing2.cid) {
    //       if (item.productNum >= 0) {
    //         falg = false
    //         item.productNum += productNum
    //       }
    //     }
    //   })
    // }
    // if (falg) {
    //   goods.productNum = productNum
    //   goods.checked = '1'
    //   cart.push(goods)
    // }
    // cart.push(goods)
    // state.cartList = cart
    // debugger
    // 存入接口userid=1&goodid=1shuid=1&catetype=1&number=1&baozhuang=1

    function isFalse (data) {
      if (data) {
        return data
      } else {
        return ''
      }
    }
    addcart({
      userid: userInfo.id,
      good: porduct,
      goodid: porduct.id,
      shuid: isFalse(porduct.shuxing2.shuid),
      number: productNum,
      catetype: isFalse(porduct.fhtime),
      baozhuang: isFalse(porduct.baozhuang2.battrname)
    }).then(res => {
      recart({
        params: {
          userid: userInfo.id
        }
      }).then(res => {
        let cart = []
        res.datas.map(item => {
          cart.push(item)
        })
        state.cartList = cart
      })
    })
    // 存入local
    setStore('buyCart', state.cartList)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 编辑商品
  [EDIT_CART] (state, {type, product, maxNum}) {
    let userInfo = JSON.parse(getStore('userInfo')).datas  // 用户信息
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.biao === product.biao) {
        switch (type) {
          case 'increase':
            if (item.number !== maxNum) {
              editshopgoodnum({
                params: {
                  userid: userInfo.id,
                  biao: product.biao,
                  jia: 2
                }
              }).then(res => {
                item.number++
              })
            }
            break
          case 'reduce':
            if (item.number !== 1) {
              editshopgoodnum({
                params: {
                  userid: userInfo.id,
                  biao: product.biao,
                  jia: 1
                }
              }).then(res => {
                item.number--
              })
            }
            break
          default:
            editshopgood({
              params: {
                userid: userInfo.id,
                biao: product.biao
              }
            }).then(res => {
              cart.splice(i, 1)
            })
        }
      }
    })
    state.cartList = cart
    console.log(cart)
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 清空购物车
  [REMOVE_CART] (state) {
    state.cartList = []
    // 删除localStorage
    removeStore('buyCart')
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
}
