'use strict'

module.exports = {
  favicon: function (base) {
    return [
      { rel: 'apple-touch-icon-precomposed', sizes: '57x57', href: base + '/apple-touch-icon-57x57.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '114x114', href: base + '/apple-touch-icon-114x114.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '72x72', href: base + '/apple-touch-icon-72x72.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '144x144', href: base + '/apple-touch-icon-144x144.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '60x60', href: base + '/apple-touch-icon-60x60.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '120x120', href: base + '/apple-touch-icon-120x120.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '76x76', href: base + '/apple-touch-icon-76x76.png' },
      { rel: 'apple-touch-icon-precomposed', sizes: '152x152', href: base + '/apple-touch-icon-152x152.png' },
      { rel: 'icon', type: 'image/png', href: base + '/favicon-196x196.png', sizes: '196x196' },
      { rel: 'icon', type: 'image/png', href: base + '/favicon-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: base + '/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: base + '/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: base + '/favicon-128.png', sizes: '128x128' }
    ]
  },
  msapplication: function (base) {
    return [
      { name: 'msapplication-TileColor', content: '#FFFFFF' },
      { name: 'msapplication-TileImage', content: base + '/mstile-144x144.png' },
      { name: 'msapplication-square70x70logo', content: base + '/mstile-70x70.png' },
      { name: 'msapplication-square150x150logo', content: base + '/mstile-150x150.png' },
      { name: 'msapplication-wide310x150logo', content: base + '/mstile-310x150.png' },
      { name: 'msapplication-square310x310logo', content: base + '/mstile-310x310.png' }
    ]
  }
}
