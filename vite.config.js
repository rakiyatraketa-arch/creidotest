import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

/* CSP вставляется только в прод-сборку: dev-режим Vite сам использует
   inline-скрипты (Fast Refresh), метa-CSP с nonce не работает. */
const injectCsp = () => ({
	name: "inject-csp",
	apply: "build",
	transformIndexHtml(html) {
		return html.replace(
			"</title>",
			`</title>\n\t\t<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'">`,
		)
	},
})

export default defineConfig({
	plugins: [react(), injectCsp()],
	/* На GitHub Pages сайт живёт в подпапке /creidotest/, локально — в корне. */
	base: process.env.CI ? "/creidotest/" : "/",
	server: { port: 5173, open: true },
	build: {
		outDir: "dist",
		target: "es2020",
		cssMinify: "lightningcss",
		reportCompressedSize: true,
	},
})
