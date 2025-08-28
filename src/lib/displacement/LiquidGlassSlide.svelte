<script>
	import { Slide } from '@animotion/core'
	import background from './webzurich.png'
	import displacement from './lens-displacement.png'

	let cursorX = $state(0)
	let cursorY = $state(0)
</script>

<svelte:window
	onmousemove={(e) => {
		cursorX = e.clientX
		cursorY = e.clientY
	}}
/>

<Slide class="grid h-full w-full place-items-center p-16">
	
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <filter id="liquid-glass">
                <feImage href={displacement} result="displacementMap" />
                <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="50" xChannelSelector="R"
                    yChannelSelector="G" />
            </filter>
        </defs>
    </svg>


    <img src={background} alt="Background Image" />

	<div class="cursor" 
    
    style="left: {cursorX}px; top: {cursorY}px"></div>
</Slide>

<style>
	img {
		position: fixed;
		inset: 16px;
		object-fit: cover;
		border-radius: 12px;

		width: 100%;
	}

	.cursor {
		position: fixed;
		width: 300px;
		height: 200px;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);

		backdrop-filter: url(#liquid-glass) blur(1px);
        background-color: rgba(255, 255, 255, 0.3);

		border: 1px solid #cccccccc;
		border-radius: 100px;
		pointer-events: none;
	}
</style>
