console.log(`配置API位置：${process.env.VUE_APP_SERVER_URL}`)

module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production',
  outputDir: process.env.outputDir, // 打包輸出目錄
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_SERVER_URL,
        charngOrigin: true,
        ws: false,
        patRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
