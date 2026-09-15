import { useMediaQuery } from "./useMediaQuery.js"

const QUERY = "(prefers-reduced-motion: reduce)"

/** Системная настройка «уменьшить движение». Слушатель общий с другими хуками. */
export function useReducedMotion() {
	return useMediaQuery(QUERY)
}
