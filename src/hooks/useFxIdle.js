import { useEffect } from "react"

/**
 * Снимает декор с кадров, когда смотреть на него некому: вкладка скрыта
 * (visibilitychange) или каркас ушёл из вьюпорта (IntersectionObserver).
 * Атрибут data-fx="paused" гасит анимации в CSS через animation-play-state —
 * без размонтирования слоёв и без рендеров React.
 */
export function useFxIdle(ref) {
	useEffect(() => {
		const el = ref.current
		if (!el) return

		let visible = document.visibilityState !== "hidden"
		let onScreen = true

		const apply = () => {
			const next = visible && onScreen ? "live" : "paused"
			if (el.dataset.fx !== next) el.dataset.fx = next
		}

		const controller = new AbortController()
		document.addEventListener(
			"visibilitychange",
			() => {
				visible = document.visibilityState !== "hidden"
				apply()
			},
			{ signal: controller.signal },
		)

		let observer = null
		if (typeof IntersectionObserver === "function") {
			observer = new IntersectionObserver(
				([entry]) => {
					onScreen = entry.isIntersecting
					apply()
				},
				{ threshold: 0 },
			)
			observer.observe(el)
		}

		apply()

		return () => {
			controller.abort()
			observer?.disconnect()
		}
	}, [ref])
}
