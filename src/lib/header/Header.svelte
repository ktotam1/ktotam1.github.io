<script>
	import { page } from '$app/stores';
	import '../../app.css'
</script>

<header>
	<nav>
		<ul>
			<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/"><p>Home</p></a></li>
			<li class:active={$page.path === '/experience'}><a sveltekit:prefetch href="/experience"><p>Experience</p></a></li>
			<li class:active={$page.path === '/projects'}><a sveltekit:prefetch href="/projects"><p>Projects</p></a></li>
			<li class:active={$page.path === '/contact'}><a sveltekit:prefetch href="/contact"><p>Contact</p></a></li>
			<li class:active={$page.path === '/physics'}><a sveltekit:prefetch href="/physics"><p>Physics</p></a></li>

		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}



	nav {
		justify-content: center;
		align-items: center;
		--background: rgba(0, 0, 0, 0);
	}



	ul {
		align-self: center;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}


	a:hover {
		color: var(--accent-color);
	}
</style>
