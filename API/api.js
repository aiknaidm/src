const host = "https://lmbge.com/wxapi/pifaban"
const host_test = "https://lmbge.com/wxapi"
const api = {
  unfriend: `${host}/jcgx`, //解除关系//取消申请
  removeindex: `${host}/qxxb`, //取消店铺首页
  setIndex: `${host}/swxb`, //设为店铺首页
  cardwxpay: `${host}/cardwxpay`,
  cardpaysuccess: `${host}/cardpaysuccess`,

}
export default api
