<script>
	import { Slide } from "@animotion/core"
    import { Tween } from "svelte/motion"
   
   
    import image from "./library.jpg";

    const width = 800;
    const height = 450;
    
    let cardContainer = $state();

    const duration = 100;

    // Tweened stores for smooth animations
    const tiltX = new Tween(0, { duration });
    const tiltY = new Tween(0, { duration });


    // Apply tweened values to the DOM
    $effect(() => {
        if (cardContainer) {
            cardContainer.style.setProperty("--tilt-x", `${tiltY.current}deg`);
            cardContainer.style.setProperty("--tilt-y", `${tiltX.current}deg`);
        }
    });

    function onMouseMove(e) {
        if (!cardContainer) return;

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
    }

    function onMouseLeave() {
        // Smoothly animate back to zero
        tiltX.set(0);
        tiltY.set(0);
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
            <image 
                href={image} 
                x="0" 
                y="0" 
                width={width} 
                height={height} 
            />
        </svg>

        <div class="card-content">
            <h1 class="text-4xl font-bold text-white drop-shadow-lg">Card Tilt</h1>
        </div>
    </div>
</Slide>