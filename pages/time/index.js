// pages/time/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 定义定时器
        timer: undefined, // 剩余时间（秒）
        timeRemainingInSeconds: 4
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.setData({
            timer: setInterval(() => {
                this.decrementTimeRemaining();
            }, 1000)
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        // 清除定时器
        clearInterval(this.data.timer)
    },


    /**
     * 减少剩余时间
     */
    decrementTimeRemaining: function () {
        if (this.data.timeRemainingInSeconds > 1) {
            // 减去
            this.setData({
                timeRemainingInSeconds: this.data.timeRemainingInSeconds - 1
            })
        } else {
            // 清除定时器
            clearInterval(this.data.timer)
            // 跳转页面
            this.nextGo()
        }
    },

    /**
     * 跳转到运动页面
     */
    nextGo: function () {
        wx.redirectTo({
            url: `/pages/riding/index`,
        })
    }

})