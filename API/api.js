const host = "https://lmbge.com/wxapi"
const api = {
    login: `${host}/pifaban/denglu`, //登录
    getUserInfo: `${host}/pifaban/get_user_info`, //用户信息
    ad: `${host}/pifaban/guanggao`,
    message: `${host}/pifaban/zixun`, //资讯
    carousel: `${host}/pifaban/lunbo`, //轮播图
    yizhanIndex: `${host}/jicai/wdyz`, //商城首页
    yizhanBanner: `${host}/jicai/yzgg`, //首页广告
    orderList: `${host}/jicai/orderlist?order_status=4`, //进货记录（已完成订单）
    yizhanList: `${host}/jicai/yzlb_my`, //进货记录（已完成订单）

}
export default api