import { useCallback, useEffect, useState } from "react"
import { useMediaQuery } from "./useMediaQuery.js"

export const THEME_KEY = "creido-theme"

/* window.__CREIDO_THEME__ — жёсткая фиксация темы для превью и макетов,
   иначе берём выбор пользователя из localStorage. */
function readChoice() {
	const forced = window.__CREIDO_THEME__
	if (forced === "dark" || forced === "light") return forced
	try {
		const saved = localStorage.getItem(THEME_KEY)
		if (saved === "dark" || saved === "light") return saved
	} catch {}
	return null
}

/**
 * Чёрная / белая тема. Пока пользователь не выбрал сам — следуем за системой,
 * подписка на prefers-color-scheme общая (useMediaQuery). Первый кадр уже
 * покрашен inline-скриптом в <head>, поэтому мигания нет.
 */
export function useTheme() {
	const systemDark = useMediaQuery("(prefers-color-scheme: dark)")
	const [choice, setChoice] = useState(readChoice)
	const theme = choice ?? (systemDark ? "dark" : "light")

	useEffect(() => {
		document.documentElement.dataset.theme = theme
	}, [theme])

	useEffect(() => {
		if (!choice) return
		try {
			localStorage.setItem(THEME_KEY, choice)
		} catch {}
	}, [choice])

	const toggle = useCallback(() => {
		setChoice((current) =>
			(current ?? (systemDark ? "dark" : "light")) === "dark" ? "light" : "dark",
		)
	}, [systemDark])

	return [theme, toggle]
}
