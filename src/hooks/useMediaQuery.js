import { useSyncExternalStore } from "react"

/**
 * Один MediaQueryList и один слушатель на запрос — сколько бы компонентов
 * его ни спросило. Значение читается через useSyncExternalStore: нет дублей
 * состояния, нет рассинхрона между компонентами и лишних рендеров.
 */
const store = new Map()

function entry(query) {
	const cached = store.get(query)
	if (cached) return cached

	const mq = window.matchMedia(query)
	const listeners = new Set()
	const notify = () => {
		for (const listener of listeners) listener()
	}

	const item = {
		mq,
		getSnapshot: () => mq.matches,
		subscribe: (listener) => {
			listeners.add(listener)
			if (listeners.size === 1) mq.addEventListener("change", notify)
			return () => {
				listeners.delete(listener)
				if (listeners.size === 0) mq.removeEventListener("change", notify)
			}
		},
	}

	store.set(query, item)
	return item
}

/** Реактивный media-запрос. */
export function useMediaQuery(query) {
	const { subscribe, getSnapshot } = entry(query)
	return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** Разовая проверка вне рендера — без подписки. */
export function matchesMedia(query) {
	return entry(query).mq.matches
}
