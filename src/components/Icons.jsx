const STROKE = {
	width: 22,
	height: 22,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.6,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": true,
	focusable: false,
}

/** Нижняя навигация: «Главное» */
export function HomeIcon(props) {
	return (
		<svg {...STROKE} {...props}>
			<path d="M3.6 10.4 12 3.9l8.4 6.5" />
			<path d="M5.8 9.2V19a1.3 1.3 0 0 0 1.3 1.3h3.3v-5.1h3.2v5.1h3.3A1.3 1.3 0 0 0 18.2 19V9.2" />
		</svg>
	)
}

/** Нижняя навигация: «Профиль» */
export function UserIcon(props) {
	return (
		<svg {...STROKE} {...props}>
			<circle cx="12" cy="8.4" r="3.5" />
			<path d="M4.9 20c.8-3.6 3.7-5.6 7.1-5.6s6.3 2 7.1 5.6" />
		</svg>
	)
}

/** Логотип: узлы, сходящиеся в центр — мотив агрегатора */
export function BrandMark(props) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			<circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.3" />
			<circle cx="12" cy="12" r="2.7" fill="currentColor" />
			<circle cx="12" cy="3" r="1.7" fill="currentColor" fillOpacity="0.8" />
			<circle cx="19.8" cy="16.5" r="1.7" fill="currentColor" fillOpacity="0.8" />
			<circle cx="4.2" cy="16.5" r="1.7" fill="currentColor" fillOpacity="0.8" />
		</svg>
	)
}

/** Переключатель темы: чёрно-белый контрастный диск */
export function ContrastIcon(props) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
			focusable="false"
			{...props}
		>
			<circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.6" />
			<path d="M12 3.6a8.4 8.4 0 0 0 0 16.8z" fill="currentColor" />
		</svg>
	)
}
