import { memo, useCallback } from "react"
import { HomeIcon, UserIcon } from "./Icons.jsx"

/** Конфиг табов живёт на уровне модуля — не создаётся заново на каждый рендер. */
export const TABS = [
	{ id: "home", label: "Главное", Icon: HomeIcon },
	{ id: "profile", label: "Профиль", Icon: UserIcon },
]

function BottomNavBase({ active, onChange }) {
	const activeIndex = TABS.findIndex((tab) => tab.id === active)

	/* Один делегированный обработчик на весь dock вместо замыкания на кнопку. */
	const onClick = useCallback(
		(event) => {
			const id = event.target.closest("[data-tab]")?.dataset.tab
			if (id) onChange(id)
		},
		[onChange],
	)

	/* Стрелки влево/вправо переключают табы, как в нативном tablist. */
	const onKeyDown = useCallback(
		(event) => {
			const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
			if (!step) return
			event.preventDefault()
			const index = TABS.findIndex((tab) => tab.id === active)
			const next = TABS[(index + step + TABS.length) % TABS.length]
			onChange(next.id)
			document.getElementById(`tab-${next.id}`)?.focus()
		},
		[active, onChange],
	)

	return (
		<nav className="dock" aria-label="Основная навигация">
			<div className="dock__inner">
				{/* Стекло — отдельный статичный слой: блюр считается один раз и кэшируется,
				    бегунок ездит уже над ним и не заставляет его перерисовываться. */}
				<span className="dock__glass" aria-hidden="true" />
				<div
					className="dock__track"
					role="tablist"
					aria-orientation="horizontal"
					onClick={onClick}
					onKeyDown={onKeyDown}
					style={{ "--i": activeIndex }}
				>
					<span className="dock__pill" aria-hidden="true">
						{/* key перемонтирует слой — «сквош» играет заново без JS-таймеров */}
						<i key={active} />
					</span>
					{TABS.map(({ id, label, Icon }) => {
						const isActive = id === active
						return (
							<button
								key={id}
								id={`tab-${id}`}
								data-tab={id}
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-controls={`panel-${id}`}
								tabIndex={isActive ? 0 : -1}
								className={isActive ? "dock__btn is-active" : "dock__btn"}
							>
								<span className="dock__icon" key={isActive ? "on" : "off"}>
									<Icon />
								</span>
								<span className="dock__label">{label}</span>
							</button>
						)
					})}
				</div>
			</div>
		</nav>
	)
}

export const BottomNav = memo(BottomNavBase)
