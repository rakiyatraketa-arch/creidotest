import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { TopBar } from "./components/TopBar.jsx"
import { Loader } from "./components/Loader.jsx"
import { FxLayer } from "./components/FxLayer.jsx"
import { BottomNav, TABS } from "./components/BottomNav.jsx"
import { HomeView } from "./views/HomeView.jsx"
import { ProfileView } from "./views/ProfileView.jsx"
import { useFxIdle } from "./hooks/useFxIdle.js"
import { usePointerFx } from "./hooks/usePointerFx.js"
import { useReducedMotion } from "./hooks/useReducedMotion.js"
import { useTheme } from "./hooks/useTheme.js"

const orderOf = (id) => TABS.findIndex((tab) => tab.id === id)

export default function App() {
	const shellRef = useRef(null)
	const tabRef = useRef("home")
	const [tab, setTab] = useState("home")
	const [loaderPhase, setLoaderPhase] = useState("loading")
	const [theme, toggleTheme] = useTheme()
	const reducedMotion = useReducedMotion()

	/* Полная пятисекундная заставка. Контент смонтирован заранее, поэтому
	   после ухода лоудера интерфейс появляется без скачков и догрузок. */
	useEffect(() => {
		const leaveAfter = reducedMotion ? 180 : 4600
		const finishAfter = reducedMotion ? 260 : 5000
		const leaveTimer = window.setTimeout(() => setLoaderPhase("leaving"), leaveAfter)
		const finishTimer = window.setTimeout(() => setLoaderPhase("done"), finishAfter)

		return () => {
			window.clearTimeout(leaveTimer)
			window.clearTimeout(finishTimer)
		}
	}, [reducedMotion])

	/* Курсор пишет только CSS-переменные — на движение мыши React не рендерится. */
	usePointerFx(shellRef, !reducedMotion)
	/* Скрытая вкладка или каркас вне экрана — декоративные анимации на паузе. */
	useFxIdle(shellRef)

	const onChangeTab = useCallback(
		(next) => {
			const current = tabRef.current
			if (next === current) return
			tabRef.current = next

			/* Направление перехода забирает CSS: уходим влево или вправо. */
			document.documentElement.dataset.vt =
				orderOf(next) > orderOf(current) ? "fwd" : "back"

			/* Где есть View Transitions — смену панелей считает компоузитор браузера. */
			if (reducedMotion || typeof document.startViewTransition !== "function") {
				setTab(next)
				return
			}
			document.startViewTransition(() => flushSync(() => setTab(next)))
		},
		[reducedMotion],
	)

	return (
		<div
			className={loaderPhase === "done" ? "shell" : "shell is-loading"}
			ref={shellRef}
			aria-busy={loaderPhase !== "done"}
		>
			{loaderPhase !== "done" ? <Loader leaving={loaderPhase === "leaving"} /> : null}
			<FxLayer motion={!reducedMotion} />
			<TopBar theme={theme} onToggleTheme={toggleTheme} />
			<main className="stage">
				{/* key на активном табе запускает ступенчатое появление заново */}
				{tab === "home" ? <HomeView key="home" /> : <ProfileView key="profile" />}
			</main>
			<BottomNav active={tab} onChange={onChangeTab} />
		</div>
	)
}
