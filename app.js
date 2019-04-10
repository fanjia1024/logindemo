//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code+'code')
        // var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxce796590a9f0863a&secret=e6322939783531c9ba49388a1c418a6c&js_code=' + res.code + '&grant_type=authorization_code';
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://127.0.0.1:8088/demo/wechat/index?code='+res.code,
          method: "GET",
          
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;
                console.log(obj);
            
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
// App({
//   globalData: {
//     appid: 'wxce796590a9f0863a',//appid需自己提供，此处的appid我随机编写
//     secret: 'e6322939783531c9ba49388a1c418a6c',//secret需自己提供，此处的secret我随机编写

//   },
//   onLaunch: function () {
//     var that = this
//     var user = wx.getStorageSync('user') || {};
//     var userInfo = wx.getStorageSync('userInfo') || {};
//     if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
//       wx.login({
//         success: function (res) {
//           if (res.code) {
//             wx.getUserInfo({
//               success: function (res) {
//                 var objz = {};
//                 objz.avatarUrl = res.userInfo.avatarUrl;
//                 objz.nickName = res.userInfo.nickName;
//                 //console.log(objz);
//                 wx.setStorageSync('userInfo', objz);//存储userInfo
//               }
//             });
//             var d = that.globalData;//这里存储了appid、secret、token串  
//             var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
//             wx.request({
//               url: l,
//               data: {},
//               method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
//               // header: {}, // 设置请求的 header  
//               success: function (res) {
//                 var obj = {};
//                 obj.openid = res.data.openid;
//                 obj.expires_in = Date.now() + res.data.expires_in;
//                 console.log(obj);
//                 wx.setStorageSync('user', obj);//存储openid  
//               }
//             });
//           } else {
//             console.log('获取用户登录态失败！' + res.errMsg)
//           }
//         }
//       });
//     }
//   },
// })