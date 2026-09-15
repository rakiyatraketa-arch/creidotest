import { useEffect } from "react"
import { matchesMedia } from "./useMediaQuery.js"

const HOVER = "(hover: hover) and (pointer: fine)"
const FOLLOW = 0.18 /* насколько кадр догоняет курсор: инерция спота */
const STOP = 0.35 /* догнали ближе этого — кадры больше не нужны */
const TILT = 6 /* максимальный наклон карточки, градусы */
const DEG = 180 / Math.PI

/**
 * Курсор → CSS-переменные. React на движение мыши не рендерится вообще.
 *
 * Оптимизации:
 * - один requestAnimationFrame с инерцией и авто-остановкой (догнал — уснул);
 * - переменные читают только transform/opacity, никаких reflow-свойств;
 * - наклон карточек через делегирование pointerover: один rect на наведение,
 *   ни одного getBoundingClientRect в кадре и ни одного листенера на карточку;
 * - passive-листенеры, снятие через AbortController, пауза на скрытой вкладке.
 */
export function usePointerFx(ref, enabled = true) {
	useEffect(() => {
		const shell = ref.current
		if (!shell || !enabled) return
		if (!matchesMedia(HOVER)) return

		const controller = new AbortController()
		const { signal } = controller
		const style = shell.style

		let frame = 0
		let tx = window.innerWidth / 2
		let ty = window.innerHeight / 2
		let x = tx
		let y = ty
		let card = null
		let rect = null

		const dropCard = () => {
			if (!card) return
			card.classList.remove("is-lit")
			card.style.removeProperty("--tx")
			card.style.removeProperty("--ty")
			card = null
			rect = null
		}

		const tick = () => {
			const dx = tx - x
			const dy = ty - y
			x += dx * FOLLOW
			y += dy * FOLLOW

			const speed = Math.min(1, Math.hypot(dx, dy) / 70)
			style.setProperty("--px", `${x.toFixed(1)}px`)
			style.setProperty("--py", `${y.toFixed(1)}px`)
			style.setProperty("--mx", ((x / window.innerWidth - 0.5) * 2).toFixed(3))
			style.setProperty("--my", ((y / window.innerHeight - 0.5) * 2).toFixed(3))
			style.setProperty("--speed", speed.toFixed(3))
			if (speed > 0.05) {
				style.setProperty("--angle", `${(Math.atan2(dy, dx) * DEG).toFixed(1)}deg`)
			}

			if (rect) {
				const nx = (x - rect.left) / rect.width - 0.5
				const ny = (y - rect.top) / rect.height - 0.5
				card.style.setProperty("--cx", `${(x - rect.left).toFixed(1)}px`)
				card.style.setProperty("--cy", `${(y - rect.top).toFixed(1)}px`)
				card.style.setProperty("--tx", (-ny * TILT).toFixed(2))
				card.style.setProperty("--ty", (nx * TILT).toFixed(2))
			}

			if (Math.abs(tx - x) > STOP || Math.abs(ty - y) > STOP) {
				frame = requestAnimationFrame(tick)
				return
			}
			/* Курсор догнан — спот успокаивается, кадры прекращаются. */
			frame = 0
			style.setProperty("--speed", "0")
		}

		const wake = () => {
			if (!frame && document.visibilityState !== "hidden") {
				frame = requestAnimationFrame(tick)
			}
		}

		const onMove = (event) => {
			tx = event.clientX
			ty = event.clientY
			if (!shell.classList.contains("is-pointing")) {
				shell.classList.add("is-pointing")
				style.setProperty("--spot", "1")
			}
			wake()
		}

		const onOver = (event) => {
			const next = event.target.closest?.(".slot") ?? null
			if (next === card) return
			dropCard()
			if (!next) return
			card = next
			rect = next.getBoundingClientRect()
			next.classList.add("is-lit")
			wake()
		}

		const onLeave = () => {
			shell.classList.remove("is-pointing")
			style.setProperty("--spot", "0")
			style.setProperty("--speed", "0")
			dropCard()
		}

		const onReflow = () => {
			if (card) rect = card.getBoundingClientRect()
		}

		const onVisibility = () => {
			if (document.visibilityState === "hidden" && frame) {
				cancelAnimationFrame(frame)
				frame = 0
			}
		}

		window.addEventListener("pointermove", onMove, { passive: true, signal })
		window.addEventListener("pointerover", onOver, { passive: true, signal })
		window.addEventListener("scroll", onReflow, { passive: true, signal })
		window.addEventListener("resize", onReflow, { passive: true, signal })
		document.addEventListener("pointerleave", onLeave, { passive: true, signal })
		document.addEventListener("visibilitychange", onVisibility, { signal })

		return () => {
			controller.abort()
			cancelAnimationFrame(frame)
			dropCard()
		}
	}, [ref, enabled])
}
