<script lang="ts">
	import { Action, Code, Slide } from '@animotion/core'
	import obraDinn from './obra_dinn.jpg'
	import dithering from './dithering.svg'
	import contrast from './contrast.svg'
	import pipeline from './pipeline.svg'
	import davidDithered from './david-dithered.png'

	import ditheringCode1 from './filter_1.txt?raw'
	import ditheringCode2 from './filter_2.txt?raw'
	import ditheringCode3 from './filter_3.txt?raw'
	import ditheringCode4 from './filter_4.txt?raw'

    import TMRNL from './TMRNL.jpg'
    import boards from './boards.png'
    import boardsDithered from './boards_dithered.png'

	let code: ReturnType<typeof Code>
</script>

<Slide class="grid h-full w-full place-items-center p-32">
	<img src={obraDinn} alt="" class="max-h-full w-full max-w-full rounded-lg shadow-2xl" />
</Slide>

<Slide transition="fade" class="grid h-full w-full place-items-center p-32">
	<h1>Dithering ≠ Contrast</h1>
	<img src={contrast} alt="" class="max-h-full w-full max-w-full rounded-lg shadow-2xl" />
</Slide>

<Slide transition="fade" class="grid h-full w-full place-items-center p-32">
	<h1>Dithering ≠ Contrast</h1>
	<img src={dithering} alt="" class="max-h-full w-full max-w-full rounded-lg shadow-2xl" />
</Slide>

<Slide class="grid h-full w-full place-items-center">
	<img src={pipeline} alt="Dithering Pipeline" class="object-fit h-full w-full object-center" />
</Slide>

<Slide class="grid h-full w-full place-items-center">
	<div>
		<Code theme="poimandres" bind:this={code} lang="html" code={ditheringCode1} />
	</div>
	<Action do={() => code.update`${ditheringCode2}`} undo={() => code.update`${ditheringCode1}`} />
	<Action do={() => code.update`${ditheringCode3}`} undo={() => code.update`${ditheringCode2}`} />

	<Action do={() => code.update`${ditheringCode4}`} undo={() => code.update`${ditheringCode3}`} />
</Slide>

<Slide class="grid h-full w-full place-items-center p-32">
	<img
		src={davidDithered}
		alt="Dithered David"
		style="image-rendering: pixelated;"
		class="h-full max-h-full max-w-full rounded-lg shadow-2xl"
	/>
</Slide>

<Slide class="grid h-full w-full place-items-center p-32">
	<h1>Not just for Fun</h1>
    <img src={TMRNL} alt="TMRNL" class="h-96 rounded-lg shadow-2xl" />
</Slide>

<Slide  transition="fade" class="grid h-full w-full place-items-center">
    <img src={boardsDithered} alt="TMRNL" class="w-6xl object-fit object-center rounded-lg shadow-2xl" />
</Slide>
