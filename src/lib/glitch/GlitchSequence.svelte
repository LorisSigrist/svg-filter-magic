<script>
	import { Slide } from '@animotion/core'
	import GlitchFilterDisplacement from './GlitchFilterDisplacement.svelte'
	import GlitchFilterNoise from './GlitchFilterNoise.svelte'

	import pipeline from './pipeline.svg'
	import hackerman from './hackerman.webp'
	import CodeWalkthoughSlide from './CodeWalkthoughSlide.svelte'

	// Scale factor for glitch displacement - adjust this to control intensity
	const displacementFilterId = 'glitch-displacement'
	const noiseFilterId = 'glitch-noise'

	let staticAbberationScale = $state(0)

	const walkthroughModules = import.meta.glob('./walkthrough/*.txt', { query: '?raw', eager: true })
	const animationModules = import.meta.glob('./with-animation/*.txt', {
		query: '?raw',
		eager: true
	})
</script>

<Slide class="grid h-full w-full place-items-center p-32">
	<label>
		<span>Chromatic Aberration</span> <br />
		<input type="range" min="0" max="10" step="1" bind:value={staticAbberationScale} />
	</label>
	<img
		src={hackerman}
        alt=""
		style="image-rendering: pixelated; filter: url(#static-abberation);"
		class="h-96 rounded-lg shadow-2xl"
	/>

	<GlitchFilterDisplacement glitchScale={staticAbberationScale} id="static-abberation" />
</Slide>

<Slide class="grid h-full w-full place-items-center p-32">
	<img src={pipeline} alt="Glitch Pipeline" class="object-fit h-full w-full object-center" />
</Slide>
<CodeWalkthoughSlide lang="html" modules={walkthroughModules} />

<Slide class="grid h-full w-full place-items-center p-32">
	<img
		src={hackerman}
		alt=""
		style="image-rendering: pixelated; filter: url(#static-abberation-2);"
		class="h-96 rounded-lg shadow-2xl"
	/>

	<GlitchFilterDisplacement glitchScale={5} id="static-abberation-2" />
</Slide>

<CodeWalkthoughSlide lang="html" modules={animationModules} />

<Slide class="grid h-full w-full place-items-center p-32">
	<img
		src={hackerman}
		alt=""
		style="image-rendering: pixelated; filter: url(#{displacementFilterId});"
		class="h-96 rounded-lg shadow-2xl"
	/>

	<button
		style="filter: url(#{displacementFilterId});"
		class="border-2 border-gray-200 bg-black px-12 py-6 font-mono text-4xl font-bold tracking-wider text-gray-200 uppercase shadow-lg shadow-gray-200/20 transition-colors duration-200 hover:bg-gray-200 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
	>
		BUTTON
	</button>

	<GlitchFilterDisplacement animate glitchScale={3} id={displacementFilterId} />
</Slide>

<Slide class="grid h-full w-full place-items-center p-32">
	<img
		src={hackerman}
		alt=""
		style="image-rendering: pixelated; filter: url(#{noiseFilterId});"
		class="h-96 rounded-lg shadow-2xl"
	/>

	<button
		style="filter: url(#{noiseFilterId});"
		class="border-2 border-gray-200 bg-black px-12 py-6 font-mono text-4xl font-bold tracking-wider text-gray-200 uppercase shadow-lg shadow-gray-200/20 transition-colors duration-200 hover:bg-gray-200 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
	>
		BUTTON
	</button>

	<GlitchFilterNoise glitchScale={15} id={noiseFilterId} />
</Slide>
