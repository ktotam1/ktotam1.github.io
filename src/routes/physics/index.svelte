<script>
	import { page } from '$app/stores';
	import '../../app.css'
</script>
    <nav>    
    <ul>
    <li class:active={$page.path === '/physics/particles'}><a sveltekit:prefetch href="/physics/particles"><p>Particles</p></a></li>
    <li class:active={$page.path === '/physics/threebody'}><a sveltekit:prefetch href="/physics/threebody"><p>Three Body</p></a></li>

</ul>
</nav>



<style>




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
