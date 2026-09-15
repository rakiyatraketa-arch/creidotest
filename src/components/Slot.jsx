import { memo } from "react"

/**
 * Пустой слот под будущую карточку модели: скелетоны и блик за курсором.
 * Наклон и позицию блика пишет общий rAF из usePointerFx — в CSS-переменные.
 */
function SlotBase({ index, tag = "слот" }) {
	return (
		<article className="slot reveal" style={{ "--i": index + 2 }}>
			<span className="slot__sheen" aria-hidden="true" />
			<span className="slot__tag">{tag}</span>
			<span className="sk sk--w70" style={{ "--i": index }} />
			<span className="sk sk--w45" style={{ "--i": index + 1 }} />
		</article>
	)
}

export const Slot = memo(SlotBase)
