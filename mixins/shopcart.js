import wepy from 'wepy';
import newapi from '../API/newapi';
let that;
import util from '../utils/index';
export default class shopcart extends wepy.mixin {
    events = {
        closePopupTap: () => {
            that.ishideShopPopup = false;
        },
        /**
         * 加入购物车
         */
        "addShopCar": (goodsDetail) => {

            that.addShopCar3(goodsDetail);

        },
        "addShopCar2": async(goodsDetail, index) => {
            var goodsDetail = await that.goodsInit(goodsDetail, that.friend_id);
            that.goodsListIndex = index;
            //没有规格
            if (that.goodsDetail.properties.length == 0) {
                goodsDetail.buy_number = goodsDetail.buy_number == 0 || !goodsDetail.buy_number ? 1 : goodsDetail.buy_number
                goodsDetail = this.showPrice(that.goodsDetail);
                that.addShopCar3(goodsDetail, true);
                that.ishideShopPopup = false;

            } else {
                that.goodsDetail.shopType = "addShopCar"
                    // that.ishideShopPopup = true
                    // that.goodsDetail.property = that.goodsDetail.properties[0]
                that.$parent.$pages['/Shop/pages/searchList'].ishideShopPopup = true;

            }
            that.$apply();
        },

    };
    methods = {

        closePopupTap() {
            this.ishideShopPopup = false;
        },
        // 店铺详情页面
        viewYiZhanDetails(suppliers_id = '') {
            wx.navigateTo({
                url: '/Shop/pages/index?suppliers_id=' + suppliers_id
            });
        },
        // 跳转购物车
        goShopCar() {
            wx.navigateTo({
                url: '/Shop/pages/shopCart'
            });
        },
        // 直接购买
        tobuy() {
            var goodsDetail = this.goodsDetail;
            if (goodsDetail.selectPrice == 0) {
                util.showToast('该商品暂无价格不能购买');
                return;
            }
            this.goodsDetail.shopType = 'tobuy';
            this.ishideShopPopup = true;
        },
        /**
         * 立即购买
         */
        buyNow(goodsDetail) {
            var goodsDetail = goodsDetail;
            this.buliduBuyNowInfo();
            this.closePopupTap();
            wx.navigateTo({
                url: '/Shop/pages/toPayOrder?orderType=buyNow'
            });
        },
        // 添加购物车
        toAddShopCar() {
            var goodsDetail = this.goodsDetail;
            console.log("goodsDetail", goodsDetail);
            if (goodsDetail.selectPrice == 0) {
                util.showToast('该商品暂无价格不能购买');
                return;
            }
            this.goodsDetail.shopType = 'addShopCar';
            this.ishideShopPopup = true;
        },
    };

    // 显示价格
    showPrice(goodsDetail) {
            var goodsDetail = goodsDetail;
            var property = goodsDetail.property;
            if (goodsDetail.properties.length == 0) {
                // 没有规格的价格
                var price =
                    goodsDetail.status == 2 &&
                    goodsDetail.qidingliang <= goodsDetail.buy_number ?
                    goodsDetail.shop_price :
                    goodsDetail.floor_price;
                goodsDetail.selectPrice = price;
            } else if (property) {
                // 有规格的

                var price =
                    goodsDetail.status == 2 &&
                    goodsDetail.qidingliang <= goodsDetail.buy_number ?
                    property.attr_price :
                    property.floor_price;
                goodsDetail.selectPrice = price;
            }
            return goodsDetail
        }
        /**
         * 规格选择弹出框
         */
    bindGuiGeTap() {
            this.ishideShopPopup = true;
        }
        /**
         * 规格选择弹出框隐藏
         */
    closePopupTap() {
        this.ishideShopPopup = false;
    }
    showPopupTap() {
        this.ishideShopPopup = false;
    }
    buliduBuyNowInfo() {
            var shopCarInfo = [{}];
            var goodsList = [{}];
            goodsList[0] = this.goodsDetail;
            goodsList[0].goods_id = this.goodsDetail.goods_id;
            if (
                this.goodsDetail.original_img == '' &&
                this.goodsDetail.original_img1 == ''
            ) {
                goodsList[0].goods_imgs = 'http://wsc.jicaizx.com/images/no_picture.gif';
            } else {
                goodsList[0].goods_imgs =
                    this.goodsDetail.original_img != '' ?
                    'http://maijia.jicaizx.com/' + this.goodsDetail.original_img :
                    this.goodsDetail.original_img1;
            }
            goodsList[0].weight = this.goodsDetail.properties.length ?
                this.goodsDetail.property.weight :
                goodsList[0].weight;
            goodsList[0].goods_price = this.goodsDetail.selectPrice;
            goodsList[0].goods_sn = this.goodsDetail.goods_sn;
            goodsList[0].buy_number = this.goodsDetail.buy_number;
            goodsList[0].goods_name = this.goodsDetail.goods_name;
            goodsList[0].goods_attr_id = this.goodsDetail.properties.length ?
                this.goodsDetail.property.goods_attr_id :
                '';
            goodsList[0].goods_attr = this.goodsDetail.properties.length ?
                this.goodsDetail.property.attr_value :
                '';
            goodsList[0].suppliers_name = this.goodsDetail.suppliers_name;
            goodsList[0].yunfei = this.goodsDetail.yunfei;
            goodsList[0].hdky = this.goodsDetail.hdky;
            shopCarInfo[0].suppliers_id = this.goodsDetail.suppliers_id;
            shopCarInfo[0].suppliers_name = this.goodsDetail.suppliers_name;
            shopCarInfo[0].goodsList = goodsList;
            shopCarInfo[0].yunfei = this.goodsDetail.yunfei;
            wx.setStorageSync('shopCarInfo', shopCarInfo);
        }
        // 列表页面加入购物车
    async addShopCar3(goodsDetail, isShowToast) {
            var goodsDetail = goodsDetail;
            var goods_id = goodsDetail.goods_id;
            var buy_number = goodsDetail.buy_number == 0 || !goodsDetail.buy_number ? 1 : goodsDetail.buy_number;
            var goods_name = goodsDetail.goods_name;
            var goods_attr_id = goodsDetail.properties.length ?
                goodsDetail.property.goods_attr_id :
                '';
            var attr_value = goodsDetail.properties.length ?
                goodsDetail.property.attr_value :
                '';
            var attr_price = goodsDetail.selectPrice;
            var suppliers_id = goodsDetail.suppliers_id;
            var goods_sn = goodsDetail.goods_sn;
            var weight = goodsDetail.properties.length ?
                goodsDetail.property.weight :
                goodsDetail.weight;

            let data = {
                goods_id,
                buy_number,
                goods_name,
                goods_attr_id,
                attr_value,
                attr_price,
                suppliers_id,
                weight
            };
            let res = await newapi.addCart(data);

            that.closePopupTap();
            if (res.data.code == 0) {
                that.shopNum = res.data.data.gouwuche;
                try {
                    await that.$parent.$pages['/Shop/pages/searchList'].showCart();
                } catch (error) {}
                // 刷新购物车
                try {
                    await that.$parent.$pages['/Shop/pages/shopCart'].getShopCartInfo();
                } catch (error) {

                }

                if (isShowToast) {
                    wx.hideLoading();
                    return
                }
                that.ishideShopPopup = false;
                util.showToast('加入购物车成功');
                this.$apply();
            } else {
                util.showToast(res.data.message);
            }
        }
        // 获取会员状态
    async getSheheStauts(id = '', suppliers_id = '', friend_id = '') {
        let data = {
            goods_id: id,
            suppliers_id,
            friend_id
        };
        let res = await newapi.SheheStauts(data);
        // 返回2是会员 1是普通
        return res.data.data.shenhe == 2 ? 2 : 1;
    }
    async onShow() {
        that = this;

    }

    // 
    async goodsInit(goodsDetail, friend_id = "") {
        this.goodsDetail = goodsDetail
        var id = goodsDetail.goods_id

        // 2是会员 1不是会员

        this.status = await this.getSheheStauts(id, '', friend_id);

        if (this.goodsDetail.goods_desc) {
            this.articleDetail.post_content = this.goodsDetail.goods_desc;
            this.articleDetail.post_content = util.html_decode(
                this.articleDetail.post_content
            );

            this.articleDetail.post_content = this.articleDetail.post_content.replace(
                /\<img/gi,
                '<img style="max-width:100%;height:auto" '
            );
            this.articleDetail.post_content = this.articleDetail.post_content.replace(
                /src="\//gi,
                'src="http://maijia.jicaizx.com/'
            );
            this.articleDetail.post_content = this.articleDetail.post_content.replace(
                /style=""/gi,
                ''
            );
        }

        if (
            this.status == 2 &&
            this.goodsDetail.qidingliang <= this.goodsDetail.buy_number
        )
            this.goodsDetail.selectPrice = this.goodsDetail.shop_price;
        else this.goodsDetail.selectPrice = this.goodsDetail.floor_price;
        this.goodsDetail.property = {};
        this.goodsDetail.property.goods_attr_id = this.goodsDetail.goods_attr_id;
        this.goodsDetail.property.goods_number = this.goodsDetail.goods_number;
        this.goodsDetail.status = this.status;
        this.$apply();
        return this.goodsDetail

    }

}