<script>
	import { Slide } from '@animotion/core'
	import mesh_gradient from './mesh-gradient.avif'
    import grain_graph from './grain-graph.svg'

	let noiseStrenght = $state(3)
	let animateNoise = $state(false)

	let intercept = $derived(-(noiseStrenght - 1) / 2)
</script>

<Slide class="grid h-full w-full place-items-center p-16">
	<img style="filter: url(#film-grain);" src={mesh_gradient} alt="" class="h-96 rounded-lg" />

	<div>
		<input type="range" min="0" max="5" step="0.1" bind:value={noiseStrenght} class="mt-4 w-48" />
		<label class="ms-4">
			<input type="checkbox" bind:checked={animateNoise} /> Animate Noise
		</label>
	</div>

	<svg class="fixed">
		<defs>
			<filter id="film-grain">
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.8"
					numOctaves="4"
					seed="0"
					result="noise"
				>
					{#if animateNoise}
						<animate
							attributeName="seed"
							values="1;2;3;4;5;6"
							dur="0.2s"
							repeatCount="indefinite"
						/>
					{/if}
				</feTurbulence>
				<feColorMatrix type="saturate" values="0" in="noise" result="desaturatedNoise" />
				<feComponentTransfer in="desaturatedNoise" result="highContrastNoise">
					<feFuncR type="linear" slope={noiseStrenght} {intercept} />
					<feFuncG type="linear" slope={noiseStrenght} {intercept} />
					<feFuncB type="linear" slope={noiseStrenght} {intercept} />
				</feComponentTransfer>
				<feBlend in="SourceGraphic" in2="highContrastNoise" result="overlay" mode="overlay" />
				<!-- Use SourceAlpha to avoid adding grain to transparent areas-->
				<feComposite operator="in" in="overlay" in2="SourceAlpha" />
			</filter>
		</defs>
	</svg>
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={grain_graph} alt="Grain Filter Graph" class="w-full max-h-full max-w-full" />
</Slide>
