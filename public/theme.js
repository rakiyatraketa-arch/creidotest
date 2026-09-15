/* Тема выставляется до первого кадра — без мигания белым.
   Внешний файл вместо inline-скрипта: CSP в прод-сборке запрещает inline.
   window.__CREIDO_THEME__ — жёсткая фиксация темы для превью и макетов,
   иначе — выбор пользователя из localStorage (ключ синхронен с useTheme.js). */
;(function () {
	const forced = window.__CREIDO_THEME__ || null
	let saved = forced
	try {
		if (!saved) saved = localStorage.getItem("creido-theme")
	} catch {}
	const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
	document.documentElement.dataset.theme = dark ? "dark" : "light"
})()
