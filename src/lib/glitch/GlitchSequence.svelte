<script>
	import { Slide } from '@animotion/core'
	import GlitchFilter from './GlitchFilter.svelte'
	
	// Scale factor for glitch displacement - adjust this to control intensity
	const glitchScale = 3
	const filterId = 'glitch'
</script>

<style>
	button {
		filter: url(#glitch);
	}
</style>

<Slide class="grid h-full w-full place-items-center p-32">
	<button 
		class="px-12 py-6 text-4xl font-mono font-bold bg-black text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-black transition-colors duration-200 tracking-wider uppercase shadow-lg shadow-green-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
	>
		BUTTON
	</button>

	<GlitchFilter {glitchScale} id={filterId} />
</Slide>
