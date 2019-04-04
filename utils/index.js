import wepy from 'wepy'
const formatTime = function (d) {
  var date = new Date(); 
  if (d) {
    date.setTime(d * 1000); 
  }

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = function (d) {
  var date = new Date(); 
  if (d) {
    date.setTime(d * 1000); 
  }

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = function (n) {
  n = n.toString()
  return n[1]?n:'0' + n
}

// orderId 订单id redirectUrl 跳转url failUrl 失败跳转
var wxpay1 = async function (orderId) {
  //   let remark = "在线充值";
  //   let nextAction = {};
  //   if (orderId != 0) {
  //    let remark = "支付订单 ：" + orderId;
  //    let nextAction = {
  //       type: 0,
  //       id: orderId
  //     };
  //   }
  var res0 = await wepy.login()
  var code = res0.code
  if ( ! code) {
    return {
      code:0, 
      msg:"登录失败"
    }; 
  }
  var res = await wepy.request( {
    url:'https://lmbge.com/wxapi/jicai/wxpay1',
data: {
      weixin:res0.code, 
      id:orderId
    }, 
  })
  var result = res.data.data; 
  if (res.data.code == 0) {
    //  通知用
    var prepay_id = result.package.replace("prepay_id=", ""); 
    // 发起支付

    try {
      var payres = await wepy.requestPayment( {
        timeStamp:result.timeStamp, 
        nonceStr:result.nonceStr, 
        package:result.package, 
        signType:result.signType, 
        paySign:result.paySign, 

      })
      wepy.request( {
        url:'https://lmbge.com/wxapi/jicai/paysuccess',
data: {
          id:orderId
        }, 
      })

      // wx.redirectTo({
      //     url: redirectUrl
      // });
      return {

        code:1, 
        msg:"支付成功"
      }; 

    }catch (err) {
      // 取消支付 
      return {
        code:2, 
        msg:"取消支付"
      }; 

    }
  }else {
    return {
      code:3, 
      msg:"服务器忙"
    }; 
  }
}
const pay = async function (data, data2, url, sucessUrl) {
  wx.showLoading( {
    title:'支付中...', //提示的内容,
mask:true, //显示透明蒙层，防止触摸穿透,
}); 

  var res = await wepy.request( {
    url, 
    data, 
  })
  wx.hideLoading(); 
  data2.order_id = res.data.orderId
  var result = res.data.data; 
  if (res.data.code == 0) {
    //  通知用
    var prepay_id = result.package.replace("prepay_id=", ""); 
    // 发起支付
    try {
      var payres = await wepy.requestPayment( {
        timeStamp:result.timeStamp, 
        nonceStr:result.nonceStr, 
        package:result.package, 
        signType:result.signType, 
        paySign:result.paySign, 
      })


    }catch (err) {
      // 取消支付 
      return {
        code:2, 
        msg:"取消支付"
      }; 

    }

    if (sucessUrl)
      wepy.request( {
        url:sucessUrl, 
        data:data2, 
      })
    return {
      code:1, 
      msg:"支付成功"
    }; 
  }else {
    return {
      code:3, 
      msg:"服务器忙"
    }; 
  }
}
//邮箱以及手机的正则表达式
const regexConfig = function () {
  var reg =  {
    email:/^(\w -  * \. * ) + @(\w -?) + (\.\w {2, }) + $/, 
    phone:/^1(3 | 4 | 5 | 7 | 8)\d {9}$/
  }
  return reg; 
}
const html_decode = function (str) {
  var s = ""; 
  if (str.length == 0)return ""; 
  // s = str.replace(/&gt;/g, "&");
  s = str.replace(/\r/g, ""); 
  s = s.replace(/\n/g, "<br/>"); 
  s = s.replace(/& amp; /g, "&"); 
  s = s.replace(/& amp; /g, "&"); 
  s = s.replace(/& lt; /g, "<"); 
  s = s.replace(/& gt; /g, ">"); 
  s = s.replace(/& nbsp; /g, " "); 
  s = s.replace(/& #39; /g, "\'"); 
  s = s.replace(/& quot; /g, "\"");

  return s;
}
const showLoading = function (title = '加载中') {
  wx.showLoading({
    title: title, //提示的内容,
    mask: true, //显示透明蒙层，防止触摸穿透,
  });
}
const hideLoading = function () {
  wx.hideLoading();
}
const showToast = async function (title, icon = 'none', duration = 2000) {
  wx.showToast({
    title: title, //提示的内容,
    icon: 'none', //图标,
    duration: 2000, //延迟时间,
    mask: true, //显示透明蒙层，防止触摸穿透,
  });
}
const showModal = async function (content, title = '提示') {
  let res = await wepy.showModal({
    title: title, //提示的标题,
    content: content, //提示的内容,
    showCancel: false, //是否显示取消按钮,
    confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
    confirmColor: '#e50012', //确定按钮的文字颜色,
  });
  return res;
}
const showModalBig = async function (content, title = '提示') {
  let res = await wepy.showModal({
    title: title, //提示的标题,
    content: content, //提示的内容,
    showCancel: true, //是否显示取消按钮,
    cancelText: '取消', //取消按钮的文字，默认为取消，最多 4 个字符,
    cancelColor: '#000000', //取消按钮的文字颜色,
    confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
    confirmColor: '#e50012' //确定按钮的文字颜色,
  });
  return res;
}
const showActionSheet = async function (itemList) {
  return new Promise((resolve, reject) => {
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        console.log('用户取消');
        resolve(null);
      }
    });
  })
}
export default {
  formatTime,
  formatDate,
  formatNumber,
  wxpay1,
  regexConfig,
  html_decode,
  pay,
  showLoading,
  hideLoading,
  showToast,
  showModal,
  showModalBig,
  showActionSheet,
}
