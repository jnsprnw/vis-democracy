'use strict'

module.exports = {
  links: function (config) {
    return [
      { rel: 'license', href: config.page.url + config.page.imprint }
    ]
  }
}
