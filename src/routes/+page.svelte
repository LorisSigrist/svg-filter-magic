<script lang="ts">
	import BasicsSequence from '$lib/basics/BasicsSequence.svelte'
	import GlitchSequence from '$lib/glitch/GlitchSequence.svelte'
	import IntroSequence from '$lib/intro/IntroSequence.svelte'
	import OutroSequence from '$lib/outro/OutroSequence.svelte'
	import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'
	import TransitionsSequence from '$lib/transitions/TransitionsSequence.svelte'

	let text: HTMLParagraphElement
	let code: ReturnType<typeof Code>
	let circle = tween({ x: 0, y: 80, r: 80, fill: '#00ffff' })
	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<TransitionsSequence />
	<IntroSequence />
	<BasicsSequence />
	<Slide class="grid h-full w-full place-items-center p-16">
		<h1>Let's do an Example</h1>
	</Slide>
	<GlitchSequence />
	<OutroSequence />
</Presentation>
