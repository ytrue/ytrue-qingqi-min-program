// pages/riding/index.js
import * as wxApi from "../../utils/asyncWx.js";
import * as setTimer from "../../utils/timer.js";
import * as mapTool from "../../utils/mapTool.js";
import * as lebu from "../../utils/lebu-core";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否暂停
        isSuspend: false,
        // 轻触显示
        touchShow: false,
        // 运动信息数据
        motionInfoData: {
            //实时速度
            realTimeSpeedData: 0,
            //里程
            distanceData: "0.00",
            //时间
            timeData: "00:00",
            //速度
            speedData: "0.00",
        },
        // 经纬度信息
        positionDataInfo: {
            // 上一次的位置维度
            oldLatitude: "",
            // 上一次的位置经度
            oldLongitude: "",

            // 当前位置的纬度
            newLatitude: "",
            // 当前位置的经度
            newLongitude: "",
            // 速度
            speed: ''
        },
    },


    /**
     * 开始运动
     */
    handleStart: function () {
        this.setData({
            isSuspend: false,
            touchShow: false
        })

        // 这里要处理骑行
        setTimer.start();
        const timer = setInterval(() => {

            // 计算两点之间的距离 单位米 里程
            const distance = mapTool.getDistance(
                this.data.positionDataInfo.newLatitude,
                this.data.positionDataInfo.newLongitude,
                this.data.positionDataInfo.oldLatitude,
                this.data.positionDataInfo.oldLongitude
            )

            console.log(distance)

            // 获取时间
            let times = setTimer.getTime();

            // 计算配速
            const speed = lebu.calSpeed(
                this.data.motionInfoData.distanceData,
                times
            )

            // 处理下实际速度
            let speedNum = this.data.positionDataInfo.speed;
            if (speedNum === -1) {
                speedNum = 0
            }


            //
            //设置数据
            this.setData({
                // 运动信息数据
                motionInfoData: {
                    //实时速度
                    realTimeSpeedData: ((speedNum * 60) / 1000).toFixed(2),
                    //里程
                    distanceData: (Number(this.data.motionInfoData.distanceData) + Number(distance / 1000)).toFixed(2),
                    //时间
                    timeData: times,
                    //速度
                    speedData: speed,
                }
            })
            
        }, 1000);


    },

    setIntervalTime: function () {

    },

    /**
     * 暂停运动
     */
    handleStop: function () {
        this.setData({
            isSuspend: true
        })
    },

    /**
     * 轻触事件
     */
    touchStart: function () {
        this.setData({
            touchShow: true
        })

        // 1秒后恢复
        setTimeout(() => {
            this.setData({
                touchShow: false
            })
        }, 1000000)
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //获取经纬度
        wxApi.getLocation().then(result => {

            console.log(result.speed)

            this.setData({
                positionDataInfo: {
                    // 上一次的位置维度
                    oldLatitude: this.data.positionDataInfo.newLatitude || result.latitude,
                    // 上一次的位置经度
                    oldLongitude: this.data.positionDataInfo.newLongitude || result.longitude,

                    // 当前位置的纬度
                    newLatitude: result.latitude,
                    // 当前位置的经度
                    newLongitude: result.longitude,
                    // 当前速度
                    speed: result.speed
                }
            })
            console.log(this.data.positionDataInfo)
        }).catch(error => {
        })

        setInterval(() => {

            let that = this;
            //获取经纬度
            wxApi.getLocation().then(result => {
                this.setData({
                    positionDataInfo: {
                        // 上一次的位置维度
                        oldLatitude: that.data.positionDataInfo.newLatitude || result.latitude,
                        // 上一次的位置经度
                        oldLongitude: that.data.positionDataInfo.newLongitude || result.longitude,

                        // 当前位置的纬度
                        newLatitude: result.latitude,
                        // 当前位置的经度
                        newLongitude: result.longitude,
                        // 当前速度
                        speed: result.speed
                    }
                })

                console.log(this.data.positionDataInfo)
            }).catch(error => {
            })
        }, 1000)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

})