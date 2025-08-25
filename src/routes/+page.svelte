<script lang="ts">
	import BasicsSequence from '$lib/basics/BasicsSequence.svelte'
	import DitheringSequence from '$lib/dithering/DitheringSequence.svelte'
	import GlitchSequence from '$lib/glitch/GlitchSequence.svelte'
	import IntroSequence from '$lib/intro/IntroSequence.svelte'
	import OutroSequence from '$lib/outro/OutroSequence.svelte'
	import { Presentation, Slide, Code, Transition, Action } from '@animotion/core'
	import { tween } from '@animotion/motion'

	let text: HTMLParagraphElement
	let code: ReturnType<typeof Code>
	let circle = tween({ x: 0, y: 80, r: 80, fill: '#00ffff' })
	let items = $state([1, 2, 3, 4])
	let layout = $state('flex gap-4')
</script>

<Presentation options={{ history: true, transition: 'slide', controls: true, progress: true }}>
	<IntroSequence />
	<BasicsSequence />
	<GlitchSequence />
	<DitheringSequence />
	<OutroSequence />
</Presentation>
