import wepy from 'wepy';
import api from '../API/api';
let that;
import util from '../utils/index';
export default class shopcart extends wepy.mixin {
    events = {
        // 规格被点击
        'labelItemTap': (property, $event) => {
            that.goodsDetail.goods_attr_id = property.goods_attr_id;
            that.goodsDetail.goods_number = property.goods_number;
            that.goodsDetail.property = property;
            that.goodsDetail = that.showPrice(that.goodsDetail)
            that.$apply();
        },
        "numJiaTap": (buy_number, $event) => {
            that.goodsDetail.buy_number = buy_number;
            that.$apply();
        },
        "numJianTap": (buy_number, $event) => {
            that.goodsDetail.buy_number = buy_number;
            that.$apply();
        },
        "buyNow": (goodsDetail) => {
            var goodsDetail = goodsDetail;
            that.buliduBuyNowInfo();
            that.closePopupTap();
            wx.navigateTo({
                url: '/Shop/pages/toPayOrder?orderType=buyNow'
            });
        },
        "closePopupTap": () => {
            that.ishideShopPopup = false;
        },
        /**
         * 加入购物车
         */
        "addShopCar": (goodsDetail) => {

            that.addShopCar3(goodsDetail);

        },
        "addShopCar2": async(goodsDetail) => {
            var goodsDetail = await that.goodsInit(that.userId, goodsDetail);
            //没有规格
            if (that.goodsDetail.properties.length == 0) {
                that.addShopCar3(goodsDetail);
                that.ishideShopPopup = false;
            } else {
                console.log(that);
                that.goodsDetail.shopType = "addShopCar"
                    // that.ishideShopPopup = true
                console.log(that.ishideShopPopup);
                that.$parent.$pages['/Shop/pages/searchList'].ishideShopPopup = true;
                that.$apply();
            }

        },

    };
    methods = {
        callTel() {
            console.log('电话列表-', this.goodsDetail.kefu);
            var kefu = this.goodsDetail.kefu;
            var phoneList = [];

            if (this.goodsDetail.kefu.length == 1) {
                wx.makePhoneCall({
                    phoneNumber: this.goodsDetail.kefu[0].mobile
                });
                return;
            }
            kefu.forEach(function(item, index) {
                phoneList.push(item.kefu_name + ' ' + item.mobile);
            });
            console.log('电话列表', phoneList);
            wx.showActionSheet({
                itemList: phoneList,
                success(res) {
                    wx.makePhoneCall({
                        phoneNumber: phoneList[res.tapIndex]
                    });
                },
                fail(res) {
                    console.log(res.errMsg);
                }
            });
        },
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
            console.log(" tobuy() ")
            var goodsDetail = this.goodsDetail;
            if (goodsDetail.selectSizePrice == 0) {
                wx.showToast({
                    title: '该商品暂无价格不能购买',
                    icon: 'none'
                });
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
            if (goodsDetail.selectSizePrice == 0) {
                wx.showToast({
                    title: '该商品暂无价格不能购买',
                    icon: 'none'
                });
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
            // console.log('直接购买', this.goodsDetail);
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

            goodsList[0].goods_price = this.goodsDetail.selectPrice;
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
            shopCarInfo[0].suppliers_id = this.goodsDetail.suppliers_id;
            shopCarInfo[0].suppliers_name = this.goodsDetail.suppliers_name;
            shopCarInfo[0].goodsList = goodsList;
            shopCarInfo[0].yunfei = this.goodsDetail.yunfei;

            console.log('立即购买：', shopCarInfo);
            wx.setStorageSync('shopCarInfo', shopCarInfo);
        }
        // 列表页面加入购物车
    async addShopCar3(goodsDetail) {
            var goodsDetail = goodsDetail;
            var user_id = this.userId;
            var goods_id = goodsDetail.goods_id;
            var buy_number = goodsDetail.buy_number;
            var goods_name = goodsDetail.goods_name;
            var goods_attr_id = goodsDetail.properties.length ?
                goodsDetail.property.goods_attr_id :
                '';
            var attr_value = goodsDetail.properties.length ?
                goodsDetail.property.attr_value :
                '';
            var attr_price = goodsDetail.selectPrice;
            var suppliers_id = goodsDetail.suppliers_id;

            var res = await wepy
                .request({
                    url: api.addCart,
                    data: {
                        user_id,
                        goods_id,
                        buy_number,
                        goods_name,
                        goods_attr_id,
                        attr_value,
                        attr_price,
                        suppliers_id
                    }
                })

            that.closePopupTap();
            if (res.data.code == 0) {
                console.log("加入购物车成功")
                that.shopNum = res.data.data.gouwuche;
                await that.$parent.$pages['/Shop/pages/searchList'].showCart();
                // 刷新购物车
                await that.$parent.$pages['/Shop/pages/shopCart'].getShopCartInfo(
                    that.userId
                );
                wx.showToast({
                    title: '加入购物车成功',
                    icon: 'success',
                    duration: 1000
                });
            } else {
                wx.showToast({
                    title: res.data.message, //提示的内容,
                    icon: 'none', //图标,
                    duration: 1000, //延迟时间,
                    mask: true //显示透明蒙层，防止触摸穿透,
                });
            }
        }
        // 获取会员状态
    async getSheheStauts(user_id, id = '', suppliers_id = '') {
        var res = await wepy.request({
            url: api.SheheStauts,
            data: {
                goods_id: id,
                suppliers_id,
                user_id
            }
        });
        console.log('shenhe', res.data.data.shenhe);
        // 返回2是会员 1是普通
        return res.data.data.shenhe == 2 ? 2 : 1;
    }
    async onShow() {
            that = this;
            console.log("that", that)

        }
        // 获取商品详情
    async getGoodsInfo(userId, id) {
            var res = await wepy.request({
                url: api.GoodsInfo,
                data: {
                    goods_id: id,
                    user_id: userId
                }
            });

            wx.hideLoading();
            console.log('商品信息', res.data.data);

            this.goodsDetail = res.data.data;

            this.shopNum = res.data.data.gouwuche;
            var userId =
                res.data.data.suppliers_id == this.$parent.globalData.friend_suppliers_id ?
                this.$parent.globalData.friend_id :
                await this.$parent.loginInfo();

            this.goodsInit(userId, this.goodsDetail);


            this.$apply();
        }
        // 
    async goodsInit(userId, goodsDetail) {
        this.goodsDetail = goodsDetail
        var id = goodsDetail.goods_id

        // 2是会员 1不是会员

        this.status = await this.getSheheStauts(userId, id);
        console.log("是否是会员", this.status)
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
        }

        this.goodsDetail.buy_number = 1;
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