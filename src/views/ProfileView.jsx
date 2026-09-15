import { memo } from "react"
import { Slot } from "../components/Slot.jsx"
import { UserIcon } from "../components/Icons.jsx"

const SLOTS = [0, 1]

/** «Профиль» — пустое состояние и два слота. */
function ProfileViewBase() {
	return (
		<section className="view" id="panel-profile" role="tabpanel" aria-labelledby="tab-profile">
			<span className="avatar reveal">
				<UserIcon width="30" height="30" />
			</span>
			<h1 className="title title--sm reveal" style={{ "--i": 1 }}>
				Профиль
			</h1>
			<p className="lede reveal" style={{ "--i": 2 }}>
				Пока ничего нет — ни аккаунта, ни ключей, ни истории запросов.
			</p>
			<div className="slots slots--two">
				{SLOTS.map((index) => (
					<Slot key={index} index={index} tag="блок" />
				))}
			</div>
		</section>
	)
}

export const ProfileView = memo(ProfileViewBase)
