import { memo } from "react"
import { Slot } from "../components/Slot.jsx"

const SLOTS = [0, 1, 2]

/** «Главное» — hero и три пустых слота под модели. */
function HomeViewBase() {
	return (
		<section className="view" id="panel-home" role="tabpanel" aria-labelledby="tab-home">
			<span className="chip reveal">
				<span className="chip__dot" />
				агрегатор моделей
			</span>
			<h1 className="title reveal" style={{ "--i": 1 }}>
				creido
			</h1>
			<p className="lede reveal" style={{ "--i": 2 }}>
				Одно окно для всех моделей. Каркас пуст: слоты ждут контента.
			</p>
			<div className="slots">
				{SLOTS.map((index) => (
					<Slot key={index} index={index} />
				))}
			</div>
		</section>
	)
}

export const HomeView = memo(HomeViewBase)
