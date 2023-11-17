import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
                <img src="/public/spin.gif" alt="Rat spinning horizontally" style="max-width:100px"/>
				<p> Rat Mapper </p>
			</nav>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
			</nav>
		</header>
	);
}
