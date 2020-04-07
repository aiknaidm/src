import wepy from 'wepy'
const host = "https://lmbge.com/wxapi/pifaban2"
const host_chk = "https://lmbge.com/wxapi/pifabanchk"
const host_pay = "https://lmbge.com/wxapi/pifabanpay"
const newapi = {
    login: (data) => fetch(`${host}/denglu`, 'GET', data), //登录
    message: () => fetch(`${host}/zixun`, 'GET'), //资讯
    carousel: (data) => fetch(`${host}/lunbo`, 'GET', data), //轮播图
    articleDetail: (data) => fetch(`${host}/ggnr`, 'GET', data), //文章详情
    newsKind: () => fetch(`${host}/ggfl`, 'GET'), //新闻分类
    newsList: (data) => fetch(`${host}/gglb`, 'GET', data), //新闻列表
    helpList: () => fetch(`${host}/bangzhu`, 'GET'), //帮助中心

    cardwxpay: (data) => fetch(`${host_pay}/cardwxpay`, 'GET', data),
    cardpaysuccess: (data) => fetch(`${host_pay}/cardpaysuccess`, 'GET', data),
    wxpay1: (data) => fetch(`${host_pay}/wxpay1`, 'GET', data),
    wxpay2: (data) => fetch(`${host_pay}/wxpay2`, 'GET', data),
    paysuccess: (data) => fetch(`${host_pay}/paysuccess`, 'GET', data),
    paysuccess2: (data) => fetch(`${host_pay}/paysuccess2`, 'GET', data),

    getUserInfo: () => fetch(`${host_chk}/get_user_info`, 'GET'), //用户信息
    upUserInfo: (data) => fetch(`${host_chk}/up_user_info`, 'GET', data),
    yizhanIndex: () => fetch(`${host_chk}/wdyz`, 'GET'), //商城首页
    yizhanBanner: (data) => fetch(`${host_chk}/yzgg`, 'GET', data), //首页广告
    orderList: (data) => fetch(`${host_chk}/orderlist`, 'GET', data), //进货记录（已完成订单）
    yizhanList: () => fetch(`${host_chk}/yzlb_my`, 'GET'), //易站列表
    goodsKind: (data) => fetch(`${host_chk}/categorys`, 'GET', data), //商品分类
    goodsBrand: (data) => fetch(`${host_chk}/pinpai`, 'GET', data), //商品品牌
    indexBrand: (data) => fetch(`${host_chk}/shouye_pinpai`, 'GET', data), //商品品牌
    goodsList: (data) => fetch(`${host_chk}/search`, 'GET', data), //商品列表
    unfriend: (data) => fetch(`${host_chk}/jcgx`, 'GET', data), //解除关系//取消申请
    setIndex: (data) => fetch(`${host_chk}/swxb`, 'GET', data), //设为店铺首页
    removeindex: (data) => fetch(`${host_chk}/qxxb`, 'GET', data), //取消店铺首页
    cancelOrder: (data) => fetch(`${host_chk}/cancelorder`, 'GET', data), //取消订单
    cancelOrderPt: (data) => fetch(`${host_chk}/pintuan_cancel`, 'GET', data), //取消订单
    confirmOrder: (data) => fetch(`${host_chk}/confirmorder`, 'GET', data), //确认收货
    confirmOrderPt: (data) => fetch(`${host_chk}/pintuan_shouhuo`, 'GET', data), //确认收货
    confirmOrderPttk: (data) => fetch(`${host_chk}/pintuan_refund`, 'GET', data), //退款
    orderDetail: (data) => fetch(`${host_chk}/orderinfo`, 'GET', data), //订单详情
    applyMember: (data) => fetch(`${host_chk}/sqhy`, 'GET', data), //申请会员
    SheheStauts: (data) => fetch(`${host_chk}/shenhe`, 'GET', data), //判断审核状态
    GoodsInfo: (data) => fetch(`${host_chk}/goodinfo`, 'GET', data), //商品详情
    addCart: (data) => fetch(`${host_chk}/addcart`, 'GET', data), //加入购物车
    showCart: (data) => fetch(`${host_chk}/showcart_new`, 'GET', data), //购物车列表
    getAddress: () => fetch(`${host_chk}/dizhi`, 'GET'), //获取上一次地址
    createOrder: (data) => fetch(`${host_chk}/order_new`, 'POST', data), //创建订单
    updateCart: (data) => fetch(`${host_chk}/updatecart`, 'GET', data),
    delCart: (data) => fetch(`${host_chk}/delcart`, 'POST', data),
    zlyd: (data) => fetch(`${host_chk}/zlyd`, 'GET', data), //再来一单
    orderNum: () => fetch(`${host_chk}/order_num`, 'GET'), //订单数量
    catlist: (data) => fetch(`${host_chk}/cat_list`, 'GET', data), //订单数量
    renzheng: (data) => fetch(`${host_chk}/renzheng`, 'POST', data), //订单数量
    friend_list: (data) => fetch(`${host_chk}/friend_list`, 'GET', data), //工长列表
    xianxiaorder: (data) => fetch(`${host_chk}/xianxiaorder`, 'GET', data), //修改订单支付状态
    getQRCodeImg: (data) => fetch(`${host_chk}/getQRCode1`, 'GET', data),
    tjdd: (data) => fetch(`${host_chk}/tjdd`, 'GET', data),
    cardlist: () => fetch(`${host_chk}/cardlist`, 'GET'),
    cardinfo: (data) => fetch(`${host_chk}/cardinfo`, 'GET', data),
    card_promotion: (data) => fetch(`${host_chk}/card_promotion`, 'GET', data),
    cardpay: (data) => fetch(`${host_chk}/cardpay`, 'GET', data),
    cardxxpay: (data) => fetch(`${host_chk}/cardxxpay`, 'GET', data),
    yzm: (data) => fetch(`${host_chk}/yzm`, 'GET', data),
    set_unionid: (data) => fetch(`${host_chk}/set_unionid`, 'GET', data),
    pintuan_search: (data) => fetch(`${host_chk}/pintuan_search`, 'GET', data),
    pintuan_goodinfo: (data) => fetch(`${host_chk}/pintuan_goodinfo`, 'GET', data),
    pintuan_order: (data) => fetch(`${host_chk}/pintuan_order`, 'POST', data),
    pintuan_orderlist: (data) => fetch(`${host_chk}/pintuan_orderlist`, 'GET', data),
    pintuan_orderinfo: (data) => fetch(`${host_chk}/pintuan_orderinfo`, 'GET', data),
    faxiaoxi: (data) => fetch(`${host_chk}/faxiaoxi`, 'POST', data),

    signin: (data) => fetch(`${host_chk}/signin`, 'POST', data),
    signin_list: (data) => fetch(`${host_chk}/signin_list`, 'POST', data),
    duijie: (data) => fetch(`${host_chk}/duijie`, 'POST', data),
    orderinfo1: (data) => fetch(`${host_chk}/orderinfo1`, 'POST', data),


    pintuan_search: (data) => fetch(`${host_chk}/pintuan_search`, 'GET', data), //
    share_log: (data) => fetch(`${host_chk}/share_log`, 'GET', data), //
    zhibo_list: (data) => fetch(`${host_chk}/zhibo_list`, 'GET', data), //
    huifang_list: (data) => fetch(`${host_chk}/huifang_list`, 'GET', data), //
    zhibo_remind: (data) => fetch(`${host_chk}/zhibo_remind`, 'GET', data), //


}
const fetch = async function(url, method, data) {
    return new Promise((resolve, reject) => {
        let token = wx.getStorageSync('Token');
        wx.request({
            url,
            method,
            data,
            header: {
                'content-type': 'application/json',
                'Token': token,
            },
            success: function(res) {
                if (!res.data) {
                    wx.clearStorageSync();
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示', //提示的标题,
                        content: '登录超时，请关闭后重试', //提示的内容,
                    });
                    return;
                }
                if (res.statusCode < 400) {
                    resolve(res);
                } else {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示', //提示的标题,
                        content: '未知错误', //提示的内容,
                    });
                }
            },
            // complete(res) {
            //   if (res.statusCode != 200) {
            //     reject(res.statusCode);
            //   }
            // }
        });
    });
    // let res = await wepy.request({
    //   url,
    //   method,
    //   data,
    //   header: {
    //     'content-type': 'application/json',
    //     'Token': 'waiting_for_set',
    //   },
    // });
    // return res;
}

export default newapi