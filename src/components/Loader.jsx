import { memo } from "react"
import { BrandMark } from "./Icons.jsx"

/** Пятисекундная заставка: одна визуальная система с остальным интерфейсом. */
function LoaderBase({ leaving = false }) {
	return (
		<div
			className={leaving ? "loader is-leaving" : "loader"}
			role="status"
			aria-live="polite"
			aria-label="Загрузка creido"
		>
			<span className="loader__grid" aria-hidden="true" />
			<span className="loader__halo" aria-hidden="true" />

			<div className="loader__core">
				<div className="loader__orbit" aria-hidden="true">
					<i className="loader__node loader__node--a" />
					<i className="loader__node loader__node--b" />
					<i className="loader__node loader__node--c" />
					<span className="loader__mark">
						<BrandMark width="30" height="30" />
					</span>
				</div>

				<span className="loader__name">creido</span>
				<span className="loader__meta">
					<i>инициализация пространства</i>
					<i>подключение моделей</i>
					<i>почти готово</i>
				</span>

				<span className="loader__track" aria-hidden="true">
					<i />
				</span>
				<span className="loader__foot" aria-hidden="true">
					<span>единое пространство моделей</span>
					<span className="loader__counter" />
				</span>
			</div>
		</div>
	)
}

export const Loader = memo(LoaderBase)
