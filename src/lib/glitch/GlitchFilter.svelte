<script>
	// Svelte 5 props syntax
	let { glitchScale = 3, id = 'glitch' } = $props()
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	class="fixed"
>
	<defs>
		<filter {id} color-interpolation-filters="sRGB">
			<feComponentTransfer in="SourceGraphic" result="red">
				<feFuncR type="identity" />
				<feFuncG type="discrete" tableValues="0" />
				<feFuncB type="discrete" tableValues="0" />
				<feFuncA type="identity" />
			</feComponentTransfer>
			<feComponentTransfer in="SourceGraphic" result="green">
				<feFuncR type="discrete" tableValues="0" />
				<feFuncG type="identity" />
				<feFuncB type="discrete" tableValues="0" />
				<feFuncA type="identity" />
			</feComponentTransfer>
			<feComponentTransfer in="SourceGraphic" result="blue">
				<feFuncR type="discrete" tableValues="0" />
				<feFuncG type="discrete" tableValues="0" />
				<feFuncB type="identity" />
				<feFuncA type="identity" />
			</feComponentTransfer>

			<feOffset in="red" dy="0" result="red-offset">
				<animate
					attributeName="dx"
					values="0;0;0;0;{-2 * glitchScale};{1 * glitchScale};0;0;0;{-1 * glitchScale};0;0;0;0;{2 * glitchScale};0;0;{-2 * glitchScale};0;0;0;0;{1 * glitchScale};0"
					dur="2.4s"
					repeatCount="indefinite"
					calcMode="discrete"
				/>
			</feOffset>
			<feOffset in="green" dy="0" result="green-offset">
				<animate
					attributeName="dx"
					values="0;0;0;{2 * glitchScale};0;0;{-1 * glitchScale};0;0;0;0;{1 * glitchScale};0;0;0;{-2 * glitchScale};0;0;0;{1 * glitchScale};0;0;0;0"
					dur="3.0s"
					repeatCount="indefinite"
					calcMode="discrete"
				/>
			</feOffset>
			<feOffset in="blue" dy="0" result="blue-offset">
				<animate
					attributeName="dx"
					values="0;0;{1 * glitchScale};0;0;0;{-2 * glitchScale};0;0;0;{2 * glitchScale};0;0;0;0;{-1 * glitchScale};0;0;0;0;{1 * glitchScale};0;0;0"
					dur="2.7s"
					repeatCount="indefinite"
					calcMode="discrete"
				/>
			</feOffset>

			<feComposite
				in="red-offset"
				in2="green-offset"
				result="red-green"
				operator="arithmetic"
				k1="0"
				k2="1"
				k3="1"
				k4="0"
			/>

			<feComposite
				in="red-green"
				in2="blue-offset"
				operator="arithmetic"
				k1="0"
				k2="1"
				k3="1"
				k4="0"
			/>
		</filter>
	</defs>
</svg>
