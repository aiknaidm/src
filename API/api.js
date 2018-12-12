const host = "https://lmbge.com/wxapi/pifaban"
const host_test = "https://lmbge.com/wxapi"
const api = {
    login: `${host}/denglu`, //登录
    getUserInfo: `${host}/get_user_info`, //用户信息
    ad: `${host}/guanggao`,
    message: `${host}/zixun`, //资讯
    carousel: `${host}/lunbo`, //轮播图
    yizhanIndex: `${host}/wdyz`, //商城首页
    yizhanBanner: `${host}/yzgg`, //首页广告
    orderList: `${host}/orderlist?order_status=4`, //进货记录（已完成订单）
    yizhanList: `${host}/yzlb_my`, //易站列表
    goodsKind: `${host}/hyfl` //商品分类


}
export default api