<script lang="ts">
	import { Slide } from '@animotion/core'
	import lisa from './mona_lisa.jpg'

	let animateElement: SVGAnimateElement | null = null
	let fadeElement: SVGAnimateElement | null = null

    const duration = 0.5;

	function startAnimation() {
		if (animateElement) animateElement.beginElement()
		if (fadeElement) fadeElement.beginElement()
	}
</script>

<Slide transition="fade" class="grid h-full w-full place-items-center p-32">
	<div class="flex flex-row justify-between gap-12">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			src={lisa}
			alt=""
			class="h-96 rounded-lg shadow-2xl"
			style="filter: url(#dissolve-filter)"
			onclick={startAnimation}
		/>
	</div>

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
				<feTurbulence type="fractalNoise" seed="1" baseFrequency="0.004" numOctaves="1" result="bigNoise" />

				<!-- Enhance noise contrast -->
				<feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
					<feFuncR type="linear" slope="3" intercept="-1" />
					<feFuncG type="linear" slope="3" intercept="-1" />
				</feComponentTransfer>

				<!-- Generate fine-grained fractal noise -->
				<feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" result="fineNoise" />

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
