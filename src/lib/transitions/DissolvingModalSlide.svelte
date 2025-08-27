<script lang="ts">
	import { Slide } from '@animotion/core'
	import { tick } from 'svelte'
	import lisa from './mona_lisa.jpg'

	let animateElement: SVGAnimateElement | null = null
	let fadeElement: SVGAnimateElement | null = null
	let isModalOpen = $state(false)
	let bigNoiseSeed = $state(1)
	let fineNoiseSeed = $state(2)

	const duration = 0.4

	function randomizeSeeds() {
		bigNoiseSeed = Math.floor(Math.random() * 1000)
		fineNoiseSeed = Math.floor(Math.random() * 1000)
	}

	async function openModal() {
		randomizeSeeds()
		isModalOpen = true
		await tick()

		const dur = 0.2

		// Play reverse animation (dissolve in)
		if (animateElement) {
			animateElement.setAttribute('from', '1000')
			animateElement.setAttribute('to', '0')
			animateElement.setAttribute('dur', `${dur}s`)
			animateElement.beginElement()
		}
		if (fadeElement) {
			fadeElement.setAttribute('from', '0')
			fadeElement.setAttribute('to', '1')
			fadeElement.setAttribute('dur', `${dur}s`)
			fadeElement.beginElement()
		}
	}

	function closeModal() {
		randomizeSeeds()

        const dur = 0.4

		// Play forward animation (dissolve out)
		if (animateElement) {
			animateElement.setAttribute('from', '0')
			animateElement.setAttribute('to', '1000')
            animateElement.setAttribute('dur', `${dur}s`)
			animateElement.beginElement()
		}
		if (fadeElement) {
			fadeElement.setAttribute('from', '1')
			fadeElement.setAttribute('to', '0')
            fadeElement.setAttribute('dur', `${dur}s`)
			fadeElement.beginElement()
		}
		// Close modal after animation completes
		setTimeout(() => {
			isModalOpen = false
		}, duration * 1000)
	}
</script>

<Slide transition="fade" class="grid h-full w-full place-items-center p-32">
	<!-- Trigger button -->
	<button
		onclick={openModal}
		class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg text-xl border-0"
	>
		Show
	</button>

	<!-- Modal overlay -->
	{#if isModalOpen}
		<div class="fixed inset-0 z-50 flex items-center justify-center">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				src={lisa}
				alt="Mona Lisa"
				class="h-96 rounded-lg shadow-2xl cursor-pointer"
				style="filter: url(#dissolve-filter)"
				onclick={closeModal}
			/>
		</div>
	{/if}

	<svg xmlns="http://www.w3.org/2000/svg" class="fixed left-[100%]">
		<defs>
			<filter
				id="dissolve-filter"
				x="-200%"
				y="-200%"
				width="500%"
				height="500%"
				color-interpolation-filters="sRGB"
				overflow="visible"
			>
				<!-- Generate large-scale fractal noise -->
				<feTurbulence
					type="fractalNoise"
					seed={bigNoiseSeed}
					baseFrequency="0.004"
					numOctaves="1"
					result="bigNoise"
				/>

				<!-- Enhance noise contrast -->
				<feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
					<feFuncR type="linear" slope="3" intercept="-1" />
					<feFuncG type="linear" slope="3" intercept="-1" />
				</feComponentTransfer>

				<!-- Generate fine-grained fractal noise -->
				<feTurbulence
					type="fractalNoise"
					seed={fineNoiseSeed}
					baseFrequency="1"
					numOctaves="1"
					result="fineNoise"
				/>

				<!-- Merge the adjusted big noise and fine noise -->
				<feMerge result="mergedNoise">
					<feMergeNode in="bigNoiseAdjusted" />
					<feMergeNode in="fineNoise" />
				</feMerge>

				<!-- Apply displacement map to distort the image -->
				<feDisplacementMap
					in="SourceGraphic"
					in2="mergedNoise"
					scale="0"
					xChannelSelector="R"
					yChannelSelector="G"
					result="displaced"
				>
					<animate
						bind:this={animateElement}
						attributeName="scale"
						from="0"
						to="1000"
						dur="{duration}s"
						fill="freeze"
						begin="indefinite"
					/>
				</feDisplacementMap>

				<!-- Add fade out effect -->
				<feComponentTransfer in="displaced" result="fadedOut">
					<feFuncA type="linear" slope="1" intercept="0">
						<animate
							bind:this={fadeElement}
							attributeName="slope"
							from="1"
							to="0"
							dur="{duration}s"
							fill="freeze"
							begin="indefinite"
						/>
					</feFuncA>
				</feComponentTransfer>
			</filter>
		</defs>
	</svg>
</Slide>

<style>
	button {
		border: none;
	}
</style>
