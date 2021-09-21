const fs = require('fs').promises
const svelte = require('svelte/compiler')
const { optimize: optimizeSvg } = require('svgo')

module.exports = function svgLoader(options = {}) {
    const { svgoConfig, svgo } = options
    const svgRegex = /\.svg(\?(raw|url|component))?$/
    const splitRegex = /(<svg.*?)(\/?>.*)/

    return {
        name: 'svelte-svg-loader',
        enforce: 'pre',

        resolveid(id) {
            return id.match(svgRegex) ? id : null
        },

        async load(id) {
            if (!id.match(svgRegex)) {
                return
            }

            const [path, query] = id.split('?', 2)

            if (query === 'url') {
                return path
            } else if (query === 'raw') {
                return await fs.readFile(path, 'utf-8')
            }
        },

        async transform(src, id) {
            if (!id.match(svgRegex)) {
                return
            }

            const [path, query] = id.split('?', 2)
            let svg = await fs.readFile(path, 'utf-8')

            if (svgo !== false) {
                svg = optimizeSvg(svg, svgoConfig).data
            }

            const parts = splitRegex.exec(svg)
            if (parts === null) {
                console.error("[vite-plugin-svelte-svg] Failed to parse:", idWithoutQuery)
            } else {
                const [_, head, body] = parts
                svg = `${head} {...$$props}${body}`
            }

            const { js: { code }, } = svelte.compile(svg, {})
            return `${code}`
        }
    }
}

module.exports.default = module.exports
