<script>
	import { Slide } from "@animotion/core"
    import { Tween } from "svelte/motion"
   
   
    import image from "./library.jpg";
    import depthMap from "./library-depth.png";

    const width = 800;
    const height = 450;
    
/*
    import image from "./pump-room.png";
    import depthMap from "./pump-room-depth.png";
    const width = 1920;
    const height = 1080;
    */

    let cardContainer = $state();
    let funcX = $state();
    let funcY = $state();


    let blur = $state(0);

    const duration = 100;

    // Tweened stores for smooth animations
    const tiltX = new Tween(0, { duration });
    const tiltY = new Tween(0, { duration });
    const displacementX = new Tween(0, { duration });
    const displacementY = new Tween(0, { duration });

  

    // Apply tweened values to the DOM
    $effect(() => {
        if (cardContainer) {
            cardContainer.style.setProperty("--tilt-x", `${tiltY.current}deg`);
            cardContainer.style.setProperty("--tilt-y", `${tiltX.current}deg`);
        }
    });

    $effect(() => {
        if (funcX && funcY) {
            funcX.setAttribute("intercept", `${(displacementX.current / 2) + 0.5}`);
            funcY.setAttribute("intercept", `${(displacementY.current / 2) + 0.5}`);
            funcX.setAttribute("slope", `${displacementX.current}`);
            funcY.setAttribute("slope", `${displacementY.current}`);
        }
    });

    function onMouseMove(e) {
        if (!cardContainer || !funcX || !funcY) return;

        const { clientX, clientY } = e;
        const { left, top } = cardContainer.getBoundingClientRect();

        const middleX = left + cardContainer.offsetWidth / 2;
        const middleY = top + cardContainer.offsetHeight / 2;

        const offsetX = clientX - middleX;
        const offsetY = clientY - middleY;

        const targetTiltX = (offsetX / middleX) * 10;
        const targetTiltY = (offsetY / middleY) * 10;

        // Update tweened values
        tiltX.set(targetTiltX);
        tiltY.set(-targetTiltY);

        // Calculate and clamp displacement values
        const maxDisplacement = 0.2;
        const clampedOffsetX = Math.max(-maxDisplacement, Math.min(maxDisplacement, offsetX / middleX));
        const clampedOffsetY = Math.max(-maxDisplacement, Math.min(maxDisplacement, offsetY / middleY));
        
        displacementX.set(clampedOffsetX);
        displacementY.set(clampedOffsetY);
    }

    function onMouseLeave() {
        // Smoothly animate back to zero
        tiltX.set(0);
        tiltY.set(0);
        displacementX.set(0);
        displacementY.set(0);
    }
</script>

<style>
    .card {
        display: grid;
        place-items: center;
        position: relative;


        
        /* 3D tilt */
        transform: perspective(1000px) rotateX(var(--tilt-x, -15deg)) rotateY(var(--tilt-y, 0deg));
        
        /* Put children onto separate 3D layers */
        transform-style: preserve-3d;
    }

    .card-content {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: white;
    }

    .card-svg {
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }
</style>

<Slide class="grid h-full w-full place-items-center p-16">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="card" 
        bind:this={cardContainer}
        onmousemove={onMouseMove}
        onmouseleave={onMouseLeave}
        style="--tilt-x: 0deg; --tilt-y: 0deg;"
    >
        <svg 
            class="card-svg" 
            width={width} 
            height={height} 
            viewBox="0 0 {width} {height}" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="displacement-3d">
                    <feImage href={depthMap} result="displacementMap" />
                    
                    <feComponentTransfer in="displacementMap" result="scaled-displacement">
                       <feFuncR bind:this={funcX} type="linear" slope="0" intercept="0.5" />
                       <feFuncG bind:this={funcY} type="linear" slope="0" intercept="0.5" />
                    </feComponentTransfer>

                    <feDisplacementMap 
                        in="SourceGraphic" 
                        in2="scaled-displacement"
                        xChannelSelector="R" 
                        yChannelSelector="G" 
                        scale="100" 
                        color-interpolation-filters="sRGB"
                    />
                </filter>
            </defs>
            <image 
                href={image} 
                filter="url(#displacement-3d) blur({blur}px)" 
                x="0" 
                y="0" 
                width={width} 
                height={height} 
            />
        </svg>

        <div class="card-content">
            <h1 class="text-4xl font-bold text-white drop-shadow-lg">3D Parallax Card</h1>
            <input 
                type="range" 
                min="0" 
                max="10" 
                step="0.1" 
                bind:value={blur} 
                class="mt-4 w-48"
            />
        </div>
    </div>
</Slide>