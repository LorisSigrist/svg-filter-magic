<script>
	import { Slide } from '@animotion/core'
	import AwesomeSvgFilterQR from './QR Code.svg'
</script>

<Slide transition="slide" class="grid h-full w-full items-center p-32">
	<div>
        <h1 class="mb-12 text-9xl">Thank You</h1>

		<div
			class="justify-left flex flex-row items-center gap-12 border border-white/20 bg-slate-900/50 p-4 rounded-lg"
		>
			<img
				src={AwesomeSvgFilterQR}
				alt="QR Code to the awesome-svg-filters repository"
				class="h-48 w-48 rounded-md"
			/>
			<div class="text-left">
				<h2>Code & More Demos</h2>
				<span >github.com/LorisSigrist/awesome-svg-filters</span>
			</div>
		</div>
	</div>
</Slide>
