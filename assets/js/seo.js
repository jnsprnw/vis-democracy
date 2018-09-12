'use strict'

function get(address, obj) {
	const adr = address.split('.')
	let o = obj
	for (let i = 0; i < adr.length; i++) {
		if (typeof o[adr[i]] === 'undefined') {
			return false
		} else {
			o = o[adr[i]]
		}
	}
	return o
}

module.exports = {
  seo: function (cfg) {
  	const arr = []
  	const tags = [
  		// General
  		[ 'description', 'page.description', 'name' ],
			// OpenGraph
			[ 'og:type', 'page.type', 'property' ],
			[ 'og:title', 'page.title', 'property' ],
			[ 'og:description', 'page.description', 'property' ],
			[ 'og:site_name', 'page.title', 'property' ],
			[ 'og:image', 'page.image.og', 'property' ],
			[ 'og:image:width', 'page.image.width', 'property' ],
			[ 'og:image:height', 'page.image.height', 'property' ],
			[ 'og:url', 'page.url', 'property' ],
			// Twitter
			[ 'twitter:card', 'page.card', 'name' ],
			[ 'twitter:site', 'contact.twitter', 'name' ],
			[ 'twitter:creator', 'contact.twitter', 'name' ],
			[ 'twitter:title', 'page.title', 'name' ],
			[ 'twitter:description', 'page.description', 'name' ],
			[ 'twitter:image', 'page.image.tc', 'name' ],
			// Others
			[ 'application-name', 'page.title', 'property' ]
		]
		tags.forEach(tag => {
			const [attr, key, name] = tag
			const value = get(key, cfg)
			if (value) {
				arr.push( { hid: attr, [name]: attr, content: value })
			}
		})
  	return arr
  }
}
