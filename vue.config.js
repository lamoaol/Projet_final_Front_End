module.exports = {
  chainWebpack: config => {
    config
      .plugin('prefetch')
      .tap(args => {
        return [
          {
            rel: 'prefetch',
            include: 'asyncChunks',
            fileBlacklist: [
              /\.map$/,
              /pdfmake\.[^.]+\.js$/,
              /xlsx\.[^.]+\.js$/,
              /fabric[^.]*\.[^.]+\.js$/,
              /responsivedefaults\.[^.]+\.js$/,
            ]
          }
        ]
      })
  }
}
