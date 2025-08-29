<script lang="ts">
	import BasicsSequence from '$lib/basics/BasicsSequence.svelte'
	import GlitchSequence from '$lib/glitch/GlitchSequence.svelte'
	import IntroSequence from '$lib/intro/IntroSequence.svelte'
	import OutroSequence from '$lib/outro/OutroSequence.svelte'
	import { Presentation, Slide } from '@animotion/core'
	import TransitionsSequence from '$lib/transitions/TransitionsSequence.svelte'
	import DisplacementSequence from '$lib/displacement/DisplacementSequence.svelte'
	import CompositingSequence from '$lib/compositing/CompositingSequence.svelte'
	import Sepia from '$lib/compositing/Sepia.svelte'
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<IntroSequence />
	<BasicsSequence />
	<Sepia />
	<Slide class="grid h-full w-full place-items-center p-16">
		<h1>Let's do an Example</h1>
	</Slide>
	<GlitchSequence />
	<!--
	<CompositingSequence />
	-->

	<Slide class="grid h-full w-full place-items-center p-16">
		<div class="text-left">
			<h1>Let's Recap</h1>
			<p>1. Filters do <i>Post Processing</i></p>
			<p>2. Affects are implemented by arranging Primitive Filters in a Graph</p>
			<p>4. Use filters from CSS using <code class="text-nowrap">filter: url(/url/to/file.svg#name)</code></p>
		</div>
	</Slide>

	<TransitionsSequence />
	<DisplacementSequence />
	<OutroSequence />
</Presentation>
