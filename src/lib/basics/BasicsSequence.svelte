<script lang="ts">
	import { Action, Code, Slide } from '@animotion/core'
	import one from './1.svg.txt?raw'
	import two from './2.svg.txt?raw'
	import three from './3.svg.txt?raw'
	import four from './4.svg.txt?raw'

	import graph from './Graph2.svg'
	import mdn_filter_primitives from './mdn_filter_primitives.png'

	let code: ReturnType<typeof Code>
</script>

<Slide class="grid h-full w-full place-items-center">
	<img
		src={mdn_filter_primitives}
		alt=""
		class="max-h-full w-full max-w-full object-contain object-center"
	/>
</Slide>

<Slide class="grid h-full w-full place-items-center">
	<div>
		<Code
			bind:this={code}
			lang="html"
			theme="poimandres"
			code={one}
			class="h-full w-full"
		/>
	</div>

	<Action
		do={() => {
			code.update`${two}`
		}}
		undo={() => code.update`${one}`}
	/>

	<Action
		do={() => {
			code.update`${three}`
		}}
		undo={() => code.update`${two}`}
	/>

	<Action
		do={() => {
			code.update`${four}`
		}}
		undo={() => code.update`${three}`}
	/>
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
	<img src={graph} alt="" class="object-fit max-h-full w-full max-w-full object-center" />
</Slide>

