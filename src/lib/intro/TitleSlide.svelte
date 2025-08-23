<script lang="ts">
	import background from './balatro_square.jpg'
	import title from './title.png'
</script>

<!-- SVG with filter definitions -->
<svg
	viewBox="0 0 800 600"
	preserveAspectRatio="xMidYMid slice"
	class="fixed inset-0 block h-full w-full"
>
	<defs>
		<filter id="turbulentDisplacement">
			<!-- Generate the noise -->
			<feTurbulence
				id="turbulence"
				type="turbulence"
				baseFrequency="0.01 0.02"
				numOctaves="2"
				result="turbulence"
			/>

			<!-- Animate baseFrequency for slow, smooth change -->
			<animate
				href="#turbulence"
				attributeName="baseFrequency"
				values="0.01 0.02; 0.02 0.01; 0.01 0.02"
				dur="30s"
				repeatCount="indefinite"
			/>

			<!-- Displace the source graphic with the noise -->
			<feDisplacementMap
				in="SourceGraphic"
				in2="turbulence"
				scale="50"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>

		<filter id="dualTurbulence">
			<!-- First turbulence -->
			<feTurbulence
				id="turb1"
				type="turbulence"
				baseFrequency="0.005"
				numOctaves="1"
				result="turb1"
			/>

			<!-- Animate 1: frequency grows -->
			<animate
				href="#turb1"
				attributeName="baseFrequency"
				values="0.02; 0.04; 0.02"
				dur="120s"
				repeatCount="indefinite"
			/>

			<!-- Second turbulence -->
			<feTurbulence
				id="turb2"
				type="turbulence"
				baseFrequency="0.005"
				numOctaves="1"
				result="turb2"
				seed="5"
			/>

			<!-- Animate 2: frequency shrinks -->
			<animate
				href="#turb2"
				attributeName="baseFrequency"
				values="0.04; 0.02; 0.04"
				dur="120s"
				repeatCount="indefinite"
			/>

			<!-- Blend both -->
			<feBlend in="turb1" in2="turb2" mode="average" result="blendedNoise" />

			<!-- Displace the source graphic with the blended noise -->
			<feDisplacementMap
				in="SourceGraphic"
				in2="blendedNoise"
				scale="40"
				xChannelSelector="A"
				yChannelSelector="R"
			/>
		</filter>
	</defs>
</svg>

<!-- Background with turbulence filter -->
<div
	class="fixed overflow-visible bg-red-600"
	style="inset: -100px; filter: url(#dualTurbulence); background-color: #bc3f37;"
>
	<img
		class="rotate-single always-cover fixed top-1/2 left-1/2"
		src={background}
		alt="Background texture"
		style="transform: translate(-50%, -50%);"
	/>
</div>

<!-- Title image centered -->
<div class="fixed inset-0 z-10 grid place-items-center">
	<img src={title} alt="Title" class="wobble-3d h-[70vh]" />
</div>

<style>
	:global(html, body) {
		margin: 0;
		height: 100%;
		background: #000;
	}

	.always-cover {
		width: hypot(100vmin, 100vmax);
		height: hypot(100vmin, 100vmax);
	}

	.rotate-single {
		animation: rotate 240s linear infinite;
		transform-origin: center;
	}

	.wobble-3d {
		animation: wobble3d 8s ease-in-out infinite;
		transform-style: preserve-3d;
	}

	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes wobble3d {
		0% {
			transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
		12.5% {
			transform: perspective(1000px) rotateX(2deg) rotateY(-1deg) rotateZ(0.5deg);
		}
		25% {
			transform: perspective(1000px) rotateX(0deg) rotateY(-2deg) rotateZ(-0.5deg);
		}
		37.5% {
			transform: perspective(1000px) rotateX(-1deg) rotateY(-1deg) rotateZ(0deg);
		}
		50% {
			transform: perspective(1000px) rotateX(-2deg) rotateY(0deg) rotateZ(0.5deg);
		}
		62.5% {
			transform: perspective(1000px) rotateX(-1deg) rotateY(1deg) rotateZ(-0.5deg);
		}
		75% {
			transform: perspective(1000px) rotateX(0deg) rotateY(2deg) rotateZ(0deg);
		}
		87.5% {
			transform: perspective(1000px) rotateX(1deg) rotateY(1deg) rotateZ(0.5deg);
		}
		100% {
			transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
		}
	}
</style>
