/**
 * 获取当前位置信息
 * @param desc
 * @returns {Promise<unknown>}
 */
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        wx.getLocation({
            type: "gcj02 ",
            // 传入true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
            altitude: true,
            // 开启高精度定位
            isHighAccuracy: true,
            // 高精度定位超时时间(ms)，指定时间内返回最高精度，该值3000ms以上高精度定位才有效果
            highAccuracyExpireTime: 3000,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}


/**
 *  promise 形式  showModal
 * @param {object} param0 参数
 */
export const showModal = ({title, content, showCancel}) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: title,
            content: content,
            showCancel: showCancel,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}


/**
 *  promise 形式  getUserProfile
 * @param {object} param0 参数
 */
export const getUserProfile = ({desc}) => {
    return new Promise((resolve, reject) => {
        // 获取用户资料
        wx.getUserProfile({
            lang: "zh_CN",
            desc: desc,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

