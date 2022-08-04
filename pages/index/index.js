// 0 引入 用来发送请求的 方法 一定要把路径补全
import {request} from "../../request/index.js";
import * as wxApi from "../../utils/asyncWx.js";

Page({


    onShow: function () {
       // this.handleLoginAuthorization()
    },

    // 开始跑步
    handleStart: function () {
        wx.redirectTo({
            url: `/pages/time/index`
        })
    },

    // 登录授权处理
    handleLoginAuthorization: function () {
        wxApi
            .showModal({
                title: '温馨提示',
                content: '亲，授权微信登录后才能骑行！',
                showCancel: false
            })
            .then(result => {
                if (result.confirm) {
                    wxApi
                        .getUserProfile({desc: "登录"})
                        .then(result => {
                            console.log(result)
                        }).catch(error => this.handleLoginAuthorization())
                } // 不能拒绝授权
            })
    }
})
