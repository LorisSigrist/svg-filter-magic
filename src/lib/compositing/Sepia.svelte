<script>
	import { Code, Slide } from '@animotion/core'
	import mona_list from '../intro/mona_lisa.jpg'
</script>

<Slide class="grid h-full w-full place-items-center p-16">
	<svg width="0" height="0" style="position:absolute">
		<defs>
			<filter id="sepia" color-interpolation-filters="sRGB">
				<!-- Classic sepia color matrix -->
				<feColorMatrix
					type="matrix"
					values="
                        0.393 0.769 0.189 0 0
                        0.349 0.686 0.168 0 0
                        0.272 0.534 0.131 0 0
                        0     0     0     1 0"
				/>
			</filter>
		</defs>
	</svg>

	<div class="flex flex-row gap-16">
		<!-- Example usage -->
		<img src={mona_list} class="w-96" style="filter:url(#sepia)" alt="Sepia toned" />

		<div class="w-full flex flex-col justify-center">
			<div>
				<Code
					lang="html"
					theme="poimandres"
					code={`<feColorMatrix
    type="matrix"
    values="
        0.393 0.769 0.189 0 0
        0.349 0.686 0.168 0 0
        0.272 0.534 0.131 0 0
        0     0     0     1 0"
/>`}
				/>
			</div>
		</div>
	</div>
</Slide>
