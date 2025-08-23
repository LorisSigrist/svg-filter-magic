<script lang="ts">
	import '../styles/app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Svg Filter Magic</title>
</svelte:head>

{@render children()}