<script lang="ts">
	import lisa from './mona_lisa.jpg'
	
	let isVisible = $state(false)
	let animateElement: SVGAnimateElement | null = null
	let opacityElement: SVGAnimateElement | null = null
	
	function toggleImage() {
		if (!isVisible) {
			// Show and animate in (displacement reducing, opacity increasing)
			isVisible = true
			setTimeout(() => {
				if (animateElement) {
					animateElement.setAttribute('from', '100')
					animateElement.setAttribute('to', '0')
					animateElement.beginElement()
				}
				if (opacityElement) {
					opacityElement.setAttribute('from', '0')
					opacityElement.setAttribute('to', '1')
					opacityElement.beginElement()
				}
			}, 50)
		} else {
			// Animate out (displacement increasing, opacity decreasing) then hide
			if (animateElement) {
				animateElement.setAttribute('from', '0')
				animateElement.setAttribute('to', '100')
				animateElement.beginElement()
			}
			if (opacityElement) {
				opacityElement.setAttribute('from', '1')
				opacityElement.setAttribute('to', '0')
				opacityElement.beginElement()
			}
			setTimeout(() => {
				isVisible = false
			}, 400)
		}
	}
</script>

<div class="grid h-full w-full place-items-center p-32">
	<!-- Simple button -->
	<button
		onclick={toggleImage}
		class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg text-xl border-0"
	>
		Show
	</button>

	<!-- Modal-like floating image -->
	{#if isVisible}
		<div class="fixed inset-0 flex items-center justify-center z-50">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				src={lisa}
				alt="Mona Lisa"
				class="h-96 rounded-lg shadow-2xl cursor-pointer"
				style="filter: url(#displacement-appear)"
				onclick={toggleImage}
			/>
		</div>
	{/if}

	<!-- SVG Filter -->
	<svg xmlns="http://www.w3.org/2000/svg" class="fixed left-[100%]">
		<defs>
			<filter
				id="displacement-appear"
				x="-50%"
				y="-50%"
				width="200%"
				height="200%"
				color-interpolation-filters="sRGB"
			>
				<!-- Generate turbulence with high x-frequency, low y-frequency -->
				<feTurbulence
					type="fractalNoise"
					baseFrequency="0.8 0.02"
					numOctaves="3"
					result="turbulence"
					seed="42"
				/>

				<!-- Apply displacement map -->
				<feDisplacementMap
					in="SourceGraphic"
					in2="turbulence"
					scale="100"
					xChannelSelector="R"
					yChannelSelector="G"
					result="displaced"
				>
					<!-- Animate scale from high displacement to no displacement -->
					<animate
						bind:this={animateElement}
						attributeName="scale"
						from="100"
						to="0"
						dur="400ms"
						fill="freeze"
						begin="indefinite"
					/>
				</feDisplacementMap>

				<!-- Apply opacity transition -->
				<feComponentTransfer in="displaced">
					<feFuncA type="linear" intercept="0" slope="0">
						<animate
							bind:this={opacityElement}
							attributeName="slope"
							from="0"
							to="1"
							dur="400ms"
							fill="freeze"
							begin="indefinite"
						/>
					</feFuncA>
				</feComponentTransfer>
			</filter>
		</defs>
	</svg>
</div>
