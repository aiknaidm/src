import wepy from 'wepy'
import newapi from '../API/newapi';
import util from '../utils/index';
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
                if (res.data.code == 0) {
                    this.goodsKind = res.data.data;
                    this.erji = res.data.erji;
                    this.$apply();
                } else {
                    this.text = "获取失败";

                }
            } catch (error) {
                this.text = "获取失败";
            }
        }
        // 我的易站 审核状态 店铺id
    async getShopIndex() {
            let res = await newapi.yizhanIndex();
            var suppliers_id =
                res.data.data && res.data.data.suppliers_id ?
                res.data.data.suppliers_id :
                76;

            this.getShopBanner(suppliers_id);
            this.getMaterialsList(suppliers_id);
            this.getGoodsList(suppliers_id);
            this.getBrandsList(suppliers_id);

            // this.$apply();

        }
        // 活动列表
    async getGoodsList(suppliers_id) {
            let res = await newapi.goodsList({ is_hot: 1, suppliers_id: suppliers_id, sort: '' });
            if (res.data.code) this.goods = res.data.data
            this.$apply()
        }
        // 品牌列表
    async getBrandsList(suppliers_id) {
            let res = await newapi.indexBrand({ suppliers_id: suppliers_id });
            if (res.data.code) this.brands = res.data.data
            this.$apply()
        }
        // 顶部banner 店铺名字
    async getShopBanner(suppliers_id = '') {
        let data = {
            suppliers_id: suppliers_id
        };
        let res = await newapi.yizhanBanner(data);
        wx.hideLoading();
        this.yizhanBanner = res.data.guanggao;
        this.yizhan = res.data.yizhan;
        this.yizhan.suppliers_id = suppliers_id
        this.yizhan.jianjie = util.html_decode(this.yizhan.jianjie)
        this.suppliers_id = suppliers_id
        this.yizhan.markers = [{
            id: 0,
            latitude: this.yizhan.latitude,
            longitude: this.yizhan.longitude,
            width: 50,
            height: 50
        }]
        this.$parent.globalData.yizhan = this.yizhan
        this.$parent.globalData.vip_level = this.yizhan.vip_level
        switch (this.yizhan.vip_level) {
            case 1:
                this.yizhan.vip_level_img = '/images/vip/1.png'
                break;
            case 2:
                this.yizhan.vip_level_img = '/images/vip/2.png'
                break;
            case 3:
                this.yizhan.vip_level_img = '/images/vip/3.png'
                break;
            case 4:
                this.yizhan.vip_level_img = '/images/vip/4.png'
                break;
            case 5:
                this.yizhan.vip_level_img = '/images/vip/5.png'
                break;
            default:
                break;
        }

        this.shenhe = res.data.shenhe

        var activity = res.data.activity
        activity.forEach(function(item, index) {
            var actList = [];
            var goods= item.goods;
            goods.forEach(function(item2, index2) {
                var i = Math.floor(index2/4);
                var j = index2%4;
                if(j==0){
                    actList[i] = []
                }
                actList[i][j] = item2;
            });
            activity[index].actList = actList;
          });
        this.activity = activity;

        wx.setNavigationBarTitle({
            title: res.data.yizhan.suppliers_name
        });
        this.$apply();
        var end_time = this.yizhan.end_time;
        if (end_time !== 0 && new Date().getTime() - end_time * 1000 > 0) {
            this.isguoqi = true;
            this.text = '店铺已关闭，暂时无法购买';
            this.$apply();
        }
    }


}