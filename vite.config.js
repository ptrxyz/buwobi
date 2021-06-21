import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// import WindiCSS from 'vite-plugin-windicss'
import { windi } from 'svelte-windicss-preprocess'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            preprocess: [windi()],
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
