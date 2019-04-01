import wepy from 'wepy'
const host = "https://lmbge.com/wxapi/pifaban"
const host_test = "https://lmbge.com/wxapi"
const newapi = {
  login: (data) => fetch(`${host}/denglu`, 'GET', data), //登录
  getUserInfo: (data) => fetch(`${host}/get_user_info`, 'GET', data), //用户信息
  upUserInfo: (data) => fetch(`${host}/up_user_info`, 'GET', data),
  message: () => fetch(`${host}/zixun`, 'GET'), //资讯
  carousel: (data) => fetch(`${host}/lunbo`, 'GET', data), //轮播图
  yizhanIndex: (data) => fetch(`${host}/wdyz`, 'GET', data), //商城首页
  yizhanBanner: (data) => fetch(`${host}/yzgg`, 'GET', data), //首页广告
  orderList: (data) => fetch(`${host}/orderlist`, 'GET', data), //进货记录（已完成订单）
  yizhanList: (data) => fetch(`${host}/yzlb_my`, 'GET', data), //易站列表
  goodsKind: (data) => fetch(`${host}/categorys`, 'GET', data), //商品分类
  goodsBrand: (data) => fetch(`${host}/pinpai`, 'GET', data), //商品品牌
  goodsList: (data) => fetch(`${host}/search`, 'GET', data), //商品列表
  helpList: () => fetch(`${host}/bangzhu`, 'GET'), //帮助中心
  articleDetail: (data) => fetch(`${host}/ggnr`, 'GET', data), //文章详情
  newsKind: () => fetch(`${host}/ggfl`, 'GET'), //新闻分类
  newsList: (data) => fetch(`${host}/gglb`, 'GET', data), //新闻列表
  unfriend: (data) => fetch(`${host}/jcgx`, 'GET', data), //解除关系//取消申请
  setIndex: (data) => fetch(`${host}/swxb`, 'GET', data), //设为店铺首页
  removeindex: (data) => fetch(`${host}/qxxb`, 'GET', data), //取消店铺首页
  cancelOrder: (data) => fetch(`${host}/cancelorder`, 'GET', data), //取消订单
  confirmOrder: (data) => fetch(`${host}/confirmorder`, 'GET', data), //确认收货
  orderDetail: (data) => fetch(`${host}/orderinfo`, 'GET', data), //订单详情
  applyMember: (data) => fetch(`${host}/sqhy`, 'GET', data), //申请会员
  SheheStauts: (data) => fetch(`${host}/shenhe`, 'GET', data), //判断审核状态
  GoodsInfo: (data) => fetch(`${host}/goodinfo`, 'GET', data), //商品详情
  addCart: (data) => fetch(`${host}/addcart`, 'GET', data), //加入购物车
  showCart: (data) => fetch(`${host}/showcart_new`, 'GET', data), //购物车列表
  getAddress: (data) => fetch(`${host}/dizhi`, 'GET', data), //获取上一次地址
  createOrder: (data) => fetch(`${host}/order_new`, 'POST', data), //创建订单
  updateCart: (data) => fetch(`${host}/updatecart`, 'GET', data),
  delCart: (data) => fetch(`${host}/delcart`, 'POST', data),
  zlyd: (data) => fetch(`${host}/zlyd`, 'GET', data), //再来一单
  orderNum: (data) => fetch(`${host}/order_num`, 'GET', data), //订单数量
  catlist: (data) => fetch(`${host}/cat_list`, 'GET', data), //订单数量
  renzheng: (data) => fetch(`${host}/renzheng`, 'POST', data), //订单数量
  friend_list: (data) => fetch(`${host}/friend_list`, 'GET', data), //工长列表
  xianxiaorder: (data) => fetch(`${host}/xianxiaorder`, 'GET', data), //修改订单支付状态
  getQRCodeImg: (data) => fetch(`${host}/getQRCode1`, 'GET', data),
  tjdd: (data) => fetch(`${host}/tjdd`, 'GET', data),
  cardlist: (data) => fetch(`${host}/cardlist`, 'GET', data),
  cardinfo: (data) => fetch(`${host}/cardinfo`, 'GET', data),
  card_promotion: (data) => fetch(`${host}/card_promotion`, 'GET', data),
  cardwxpay: (data) => fetch(`${host}/cardwxpay`, 'GET', data),
  cardpaysuccess: (data) => fetch(`${host}/cardpaysuccess`, 'GET', data),
  cardpay: (data) => fetch(`${host}/cardpay`, 'GET', data),
  cardxxpay: (data) => fetch(`${host}/cardxxpay`, 'GET', data),
  set_unionid: (data) => fetch(`${host}/set_unionid`, 'GET', data),

}
const fetch = async function (url, method, data) {
  let ret = await wepy.request({
    url,
    method,
    data,
    header: {
      'content-type': 'application/json',
      'Token': 'waiting_for_set',
    },
  });
  return ret;
}

export default newapi
