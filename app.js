App({
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
  },
  onShow() {
    this.globalData.sysInfo = dd.getSystemInfoSync()
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    sysInfo: {}
  },
});
