import { memo } from "react"
import { BrandMark, ContrastIcon } from "./Icons.jsx"

/** Шапка: логотип, статус и переключатель белая/чёрная тема. */
function TopBarBase({ theme, onToggleTheme }) {
	const isDark = theme === "dark"

	return (
		<header className="topbar">
			<div className="brand">
				<span className="brand__mark">
					<BrandMark />
				</span>
				<span>
					<span className="brand__name">creido</span>
					<span className="brand__meta">&nbsp;/ агрегатор моделей</span>
				</span>
			</div>

			<div className="bar-tools">
				<span className="status">
					<span className="status__dot" />
					каркас без контента
				</span>
				<button
					type="button"
					className="toggle"
					onClick={onToggleTheme}
					aria-pressed={isDark}
					aria-label={isDark ? "Включить белую тему" : "Включить чёрную тему"}
					title={isDark ? "Белая тема" : "Чёрная тема"}
				>
					<span className="toggle__icon" key={theme}>
						<ContrastIcon />
					</span>
				</button>
			</div>
		</header>
	)
}

export const TopBar = memo(TopBarBase)
