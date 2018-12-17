const host = "https://lmbge.com/wxapi/pifaban"
const host_test = "https://lmbge.com/wxapi"
const api = {
    login: `${host}/denglu`, //登录
    getUserInfo: `${host}/get_user_info`, //用户信息
    upUserInfo: `${host}/up_user_info`,
    ad: `${host}/guanggao`,
    message: `${host}/zixun`, //资讯
    carousel: `${host}/lunbo`, //轮播图
    yizhanIndex: `${host}/wdyz`, //商城首页
    yizhanBanner: `${host}/yzgg`, //首页广告
    orderList: `${host}/orderlist`, //进货记录（已完成订单）
    yizhanList: `${host}/yzlb_my`, //易站列表
    goodsKind: `${host}/hyfl`, //商品分类
    goodsList: `${host}/search`, //商品列表
    helpList: `${host}/bangzhu`, //帮助中心
    articleDetail: `${host}/ggnr`, //文章详情
    newsKind: `${host}/ggfl`, //新闻分类
    newsList: `${host}/gglb`, //新闻列表
    unfriend: `${host}/jcgx`, //解除关系//取消申请
    setIndex: `${host}/swxb`, //设为店铺首页
    removeindex: `${host}/qxxb`, //取消店铺首页
    cancelOrder: `${host}/cancelorder`, //取消订单
    confirmOrder: `${host}/confirmorder`, //确认收货
    orderDetail: `${host}/orderinfo`, //订单详情
}
export default api