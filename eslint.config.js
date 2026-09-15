import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"

export default [
	{ ignores: ["dist/", "node_modules/"] },
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: "module",
			},
		},
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			...js.configs.recommended.rules,
			/* Пустой catch — штатный приём: localStorage может кидать в приватных режимах */
			"no-empty": ["error", { allowEmptyCatch: true }],
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
	{
		files: ["vite.config.js"],
		languageOptions: { globals: globals.node },
	},
]
