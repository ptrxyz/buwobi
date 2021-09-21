import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// import WindiCSS from 'vite-plugin-windicss'
import { windi } from 'svelte-windicss-preprocess'
import svgLoader from './vite-svg-loader.js'
// for sequential processing
// import seqPreprocessor from 'svelte-sequential-preprocessor'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: './docs/',
        base: '/buwobi/'
    },
    plugins: [
        svgLoader({ svgo: true }),
        svelte({
            // preprocess: seqPreprocessor([sveltePreprocess(), windi({ configPath: 'windi.config.mjs' })]),
            preprocess: [
                windi({
                    configPath: 'windi.config.mjs'
                }),
            ],
            emitCss: true,
            compilerOptions: {
                // If true, styles will be included in the JavaScript class and injected at runtime.
                // It's recommended that you set this to false and use the CSS that is statically generated,
                // as it will result in smaller JavaScript bundles and better performance.
                css: false,
            },
        }),
    ],
})
