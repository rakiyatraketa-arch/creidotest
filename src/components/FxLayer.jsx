import { memo } from "react"

/**
 * Слой эффектов: световые пятна, сетка, луч, спот за курсором, виньетка, зерно.
 * Рендерится ровно один раз — всё движение живёт в CSS и компоузиторе.
 */
function FxLayerBase({ motion }) {
	return (
		<div className="fx" aria-hidden="true">
			<span className="fx__light fx__light--a">
				<i />
			</span>
			<span className="fx__light fx__light--b">
				<i />
			</span>
			<span className="fx__light fx__light--c">
				<i />
			</span>
			<span className="fx__grid" />
			{motion ? <span className="fx__beam" /> : null}
			{motion ? <span className="fx__spot" /> : null}
			<span className="fx__vignette" />
			<span className="fx__grain" />
		</div>
	)
}

export const FxLayer = memo(FxLayerBase)
