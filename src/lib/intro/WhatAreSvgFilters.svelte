<script>
	import { Action, Code } from '@animotion/core'
	import mona_lisa from './mona_lisa.jpg'

	let filter = $state('blur(2px) contrast(200%)')
</script>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <filter id="edge-detection" x="0%" y="0%" width="100%" height="100%">
             
            <!-- convert source image to luminance map-->
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 
                                         0 0 0 0 1 
                                         0 0 0 0 1 
                                         1 0 0 0 0" result="RChan" />

            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 
                                         0 0 0 0 1 
                                         0 0 0 0 1 
                                         0 1 0 0 0" result="GChan" />


            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 
                                         0 0 0 0 1 
                                         0 0 0 0 1 
                                         0 0 1 0 0" result="BChan" />

            <!-- sobel edge detection-->


            <feConvolveMatrix in="RChan" order="3" kernelMatrix="-1 -2 -1  
                                               0 0 0  
                                               1 2 1 " result="Rhor" />

            <feConvolveMatrix in="RChan" order="3" kernelMatrix="-1 0 1  
                                                                 -2 0 2 
                                                                 -1 0 1" result="Rver" />

            <feComposite operator="arithmetic" k2="1" k3="1" in="Rhor" in2="Rver" />
            <feColorMatrix type="matrix" values="0 0 0 1 0
                                    0 0 0 0 0 
                                    0 0 0 0 0 
                                    0 0 0 0 1" result="rededge" />


            <feConvolveMatrix in="GChan" order="3" kernelMatrix="-1 -2 -1  
                                               0 0 0  
                                               1 2 1" result="Ghor" />

            <feConvolveMatrix in="GChan" order="3" kernelMatrix="-1 0 1 
                                                         -2 0 2 
                                                         -1 0 1" result="Gver" />

            <feComposite operator="arithmetic" k2="1" k3="1" in="Ghor" in2="Gver" />
            <feColorMatrix type="matrix" values="0 0 0 0 0
                                    0 0 0 1 0 
                                    0 0 0 0 0 
                                    0 0 0 0 1" result="greenedge" />


            <feConvolveMatrix in="BChan" order="3" kernelMatrix="-1 -2 -1  
                                               0 0 0  
                                               1 2 1 " result="Bhor" />

            <feConvolveMatrix in="BChan" order="3" kernelMatrix="-1 0 1  
                                                                 -2 0 2 
                                                                 -1 0 1" result="Bver" />

            <feComposite operator="arithmetic" k2="1" k3="1" in="Bhor" in2="Bver" />
            <feColorMatrix type="matrix" values="0 0 0 0 0
                                    0 0 0 0 0 
                                    0 0 0 1 0 
                                    0 0 0 0 1" result="blueedge" />

            <feComposite operator="arithmetic" in="blueedge" in2="rededge" k2="1" k3="1" />
            <feComposite operator="arithmetic" in2="greenedge" k2="1" k3="1" result="finaledges" />

            <feFlood flood-color="black" result="black" />
            <feComposite operator="over" in="finaledges" result="edgesOverBlack" />
            
            <!-- Preserve alpha by compositing with SourceAlpha -->
            <feComposite operator="in" in="edgesOverBlack" in2="SourceAlpha" />
        </filter>

    </defs>
</svg>


<div class="p-24 h-full w-full flex flex-col items-center justify-center gap-16 text-center">
	<div class="flex flex-row items-center justify-center gap-32">
		<h1 style="filter: {filter}">What are "Filters"?</h1>
		<img
			class="w-72 max-w-full rounded-lg "
			style="filter: {filter}"
			src={mona_lisa}
			alt=""
		/>
	</div>

	<div >
		<code class="block text-left bg-slate-950 p-8 rounded-md border border-slate-800 font-mono">
			<span>img, h1 {`{`}</span><br />
			<span class="ms-[1em]">filter:&nbsp;</span><span
				contenteditable="true"
				bind:textContent={filter}>{filter}</span
			>;<br />
			<span>{`}`}</span><br />
		</code>
	</div>
</div>

<Action 
    do={() => (filter = 'url(#edge-detection)')} 
    undo={() => (filter = 'blur(2px) contrast(200%)')}
/>
