<script lang="ts">
	import { Action, Code, Slide } from '@animotion/core'
	import one from './1.svg.txt?raw'
	import two from './2.svg.txt?raw'
	import three from './3.svg.txt?raw'
	import four from './4.svg.txt?raw'

	import graph from './Graph2.svg'
	import mdn_filter_primitives from './mdn_filter_primitives.png'
	import combining_primitives from './combining-primitives.svg'
	import mental_model from './mental-model.svg'

	let code: ReturnType<typeof Code>
</script>

<Slide class="grid h-full w-full place-items-center">
	<div class="text-left">
		<h1>How to SVG Filter</h1>
		<ol class="my-4 ms-12">
			<li>
				Think of an Effect you want to implement
			</li>
			<li>
				Create a <span class="font-mono">{`<filter id="my-filter"/>`}</span> element in a `.svg` file
			</li>
			<li>Use Primitive Operations in the filter <span class="text-sm">(all called <span class="font-mono">{`<fe[Something]/>`}</span>)</span></li>
			<li>Arrange Primitives into a Graph to implement larger graphics operation</li>
			<li>Apply the filter using CSS <span class="text-sm">(to anything, including HTML elements)</span></li>
		</ol>
	</div>
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
	<img
		src={mental_model}
		alt=""
		class="object-fit max-h-full w-full max-w-full object-center"
	/>
</Slide>
 
<Slide class="grid h-full w-full place-items-center">
	<div>
		<h1 class="font-mono">Inputs & Outputs</h1>
		<p>Connecting Primitives Together</p>

		<div class="mt-8">
			<Code
				lang="html"
				theme="poimandres"
				code={`<fe[Something]
	in="first-input"
	in2="second-input" (maybe)
	result="name-of-this-output"
/>`}
			/>
		</div>
	</div>
</Slide>

<Slide transition="fade" class="grid h-full w-full place-items-center">
	<img
		src={mdn_filter_primitives}
		alt=""
		class="max-h-full w-full max-w-full object-contain object-center"
	/>
</Slide>

<Slide transition="none" class="grid h-full w-full place-items-center">
	<div>
		<h1 class="font-mono">{`<feColorMatrix />`}</h1>
		<p>Perform Linear Transformations on RGBA colors</p>

		<div class="mt-8">
			<Code
				lang="html"
				theme="poimandres"
				code={`<feColorMatrix 
	type="matrix" 
	values="0 0 0 0 1 
	        0 0 0 0 1 
	        0 0 0 0 1 
	        1 0 0 0 0" 
/>`}
			/>
		</div>
	</div>
</Slide>

<Slide transition="none" class="grid h-full w-full place-items-center">
	<div>
		<h1 class="font-mono">{`<feConvolveMatrix />`}</h1>
		<p>Won't Explain - If you know you know</p>

		<div class="mt-8">
			<Code
				lang="html"
				theme="poimandres"
				code={`<feConvolveMatrix 
	order="3" 
	kernelMatrix="-1 -2 -1  
	               0  0  0  
	               1  2  1"
/>`}
			/>
		</div>
	</div>
</Slide>

<Slide transition="none" class="grid h-full w-full place-items-center">
	<div>
		<h1 class="font-mono">{`<feComposite />`}</h1>
		<p>Combine two Images into one</p>

		<div class="mt-8">
			<Code
				lang="html"
				theme="poimandres"
				code={`<feComposite
	in="first-image"
	in2="second-image" 
	operator="xor"
/>`}
			/>
		</div>
	</div>
</Slide>

<Slide transition="none" class="grid h-full w-full place-items-center">
	<div>
		<h1 class="font-mono">{`<feComponentTransfers />`}</h1>
		<p>Do math on RGBA channels (separately)</p>

		<div class="mt-8">
			<Code
				lang="html"
				theme="poimandres"
				code={`<feComponentTransfer>
	<feFuncR type="table" tableValues="0 0 1 1"></feFuncR>
	<feFuncG type="discrete" tableValues="1 1 0 0"></feFuncG>
	<feFuncB type="gamma" amplitude="4" exponent="1" offset="0"></feFuncB>
	<feFuncA type="identity"></feFuncA>
</feComponentTransfer>`}
			/>
		</div>
	</div>
</Slide>

<!--
<Slide class="grid h-full w-full place-items-center">
	<div>
		<Code bind:this={code} lang="html" theme="poimandres" code={one} class="h-full w-full" />
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
-->
