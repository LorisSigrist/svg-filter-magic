<script lang="ts">
	import BasicsSequence from '$lib/basics/BasicsSequence.svelte'
	import GlitchSequence from '$lib/glitch/GlitchSequence.svelte'
	import IntroSequence from '$lib/intro/IntroSequence.svelte'
	import OutroSequence from '$lib/outro/OutroSequence.svelte'
	import { Presentation, Slide } from '@animotion/core'
	import TransitionsSequence from '$lib/transitions/TransitionsSequence.svelte'
	import DisplacementSequence from '$lib/displacement/DisplacementSequence.svelte'
	import CompositingSequence from '$lib/compositing/CompositingSequence.svelte'
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<CompositingSequence />
	<IntroSequence />
	<BasicsSequence />
	<Slide class="grid h-full w-full place-items-center p-16">
		<h1>Let's do an Example</h1>
	</Slide>
	<GlitchSequence />
	<TransitionsSequence />
	<DisplacementSequence />
	<OutroSequence />
</Presentation>
