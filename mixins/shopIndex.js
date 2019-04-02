import wepy from 'wepy'
import api from '../API/api'
import newapi from '../API/newapi';
export default class testMixin extends wepy.mixin {
  config = {
    navigationBarTitleText: '吉采易站'
  };

  // 分类
  async getMaterialsList(suppliers_id = 76) {
    try {
      let data = {
        suppliers_id
      };
      let res = await newapi.goodsKind(data);
      this.isLoading = false;
      if (res.data.code == "0") {
        this.goodsKind = res.data.data;
        this.erji = res.data.erji;
        console.log("goodsKind", this.erji);
        this.$apply();
      } else {
        this.text = "获取失败";

      }
    } catch (error) {
      this.text = "获取失败";
    }
  }
  // 我的易站 审核状态 店铺id
  async getShopIndex(userId) {
    let data = {
      user_id: userId
    };
    let res = await newapi.yizhanIndex(data);
    // this.yizhanIndex = res.data.data;
    var suppliers_id =
      res.data.data && res.data.data.suppliers_id ?
      res.data.data.suppliers_id :
      76;

    this.getShopBanner(userId, suppliers_id);
    this.getMaterialsList(suppliers_id);
    // this.$apply();

  }
  // 顶部banner 店铺名字
  async getShopBanner(userId, suppliers_id = '') {
    let data = {
      user_id: userId,
      suppliers_id: suppliers_id
    };
    let res = await newapi.yizhanBanner(data);
    wx.hideLoading();
    this.yizhanBanner = res.data.data;
    this.yizhan = res.data.yizhan;
    this.yizhan.suppliers_id = suppliers_id
    this.suppliers_id = suppliers_id

    this.$parent.globalData.yizhan = this.yizhan
    this.shenhe = res.data.shenhe
    wx.setNavigationBarTitle({
      title: res.data.yizhan.suppliers_name
    });
    this.$apply();
    var end_time = this.yizhan.end_time;
    if (end_time !== 0 && new Date().getTime() - end_time * 1000 > 0) {
      console.log('店铺已过期');
      this.isguoqi = true;
      this.text = '店铺已关闭，暂时无法购买';
      this.$apply();
    }
    console.log('yizhanBanner', this.yizhanBanner);
    console.log('yizhan', this.yizhan);
  }


}
