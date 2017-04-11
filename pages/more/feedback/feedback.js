var app = getApp()
Page({
    data: {
        // 反馈信息
        title: '',
        comments: '',
        contactInfomation: '',
        // 手机信息
        phoneModel: '',
        pixelRatio: '',
        screenWidth: '',
        screenHeight: '',
        windowWidth: '',
        windowHeight: '',
        wechatVersion: '',
        system: '',
        platform: '',
        sdkVersion: '',

        disabled: false,
        loading: false,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    loadding: function (e) {
        this.setData({
            disabled: !this.data.disabled,
            loading: !this.data.loading
        })
    },
    inputFeedbackTitle: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    inputFeedbackContent: function (e) {
        this.setData({
            comments: e.detail.value
        })
    },
    inputCotactInfomation: function (e) {
        this.setData({
            contactInfomation: e.detail.value
        })
    },
    // 获取手机信息
    getSystemInfo: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                that.setData({
                    phoneModel: res.model,
                    pixelRatio: res.pixelRatio,
                    screenWidth: res.screenWidth,
                    screenHeight: res.screenHeight,
                    windowWidth: res.windowWidth,
                    windowHeight: res.windowHeight,
                    wechatVersion: res.version,
                    system: res.system,
                    platform: res.platform,
                    sdkVersion: res.SDKVersion,
                })
            }
        })
    },
    // 反馈
    sendFeddback: function () {
        var that = this;
        var msg = "";
        var feedbackResult = false;
        that.loadding();
        that.getSystemInfo();
        wx.request({
            url: app.globalData.feedbackUrl,
            data: {
                // 用户信息
                stuId: app.globalData.stuId,
                wechatId: app.globalData.weChatId,
                // 反馈信息
                title: that.data.title,
                comments: that.data.comments,
                contactInfomation: that.data.contactInfomation,
                // 手机信息
                phoneModel: that.data.phoneModel,
                pixelRatio: that.data.pixelRatio,
                screenWidth: that.data.screenWidth,
                screenHeight: that.data.screenHeight,
                windowWidth: that.data.windowWidth,
                windowHeight: that.data.windowHeight,
                wechatVersion: that.data.wechatVersion,
                system: that.data.system,
                platform: that.data.platform,
                sdkVersion: that.data.sdkVersion,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.msg == "success") {
                    feedbackResult = true;
                    msg = "反馈成功";
                } else {
                    msg = "反馈失败，请稍后重试";
                }
            },
            fail: function (res) {
                msg = "请求失败，请稍后重试";
            },
            complete: function (res) {
                app.showToast(msg, feedbackResult);
                that.loadding();
            }
        })
    }
})