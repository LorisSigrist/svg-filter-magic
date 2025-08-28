<script>
	import { Slide } from "@animotion/core"
    import TwoDCardSlide from "./2DCardSlide.svelte"
    import ThreeDCardSlide from "./3DCardSlide.svelte"


    import depthMapGraph from "./3d-card-graph.svg";
    import depthMap from "./library-depth.png";
    
    import lens_displacement from "./lens-displacement.png";
    import liquid_glass from "./Liquid Glass.webp";
    import lens_graph from "./lens.svg";
	import LiquidGlassSlide from "./LiquidGlassSlide.svelte"


</script>

<Slide class="grid h-full w-full place-items-center p-16">
    <h1 style="filter: url(#displacement-map-title-filter)">Displacement Maps are Awesome!</h1>

    <svg class="fixed">
        <defs>
            <filter id="displacement-map-title-filter">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.1"
                    numOctaves="1" seed="1"
                    result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R"
                    yChannelSelector="G" />
            </filter>
        </defs>
    </svg>
</Slide>

<!-- Liquid Glass Sequence -->

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={liquid_glass} alt="Depth Map Example" class="h-96" />
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={lens_graph} alt="Depth Map Example" class="h-96" />
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={lens_displacement} alt="Depth Map Example" class="h-96" />
</Slide>

<LiquidGlassSlide />

<!-- 3D Card Sequence -->

<TwoDCardSlide />


<Slide class="grid h-full w-full place-items-center p-16">
    <img src={depthMap} alt="Depth Map Example" class="h-96" />
</Slide>

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={depthMapGraph} alt="Depth Map Example" class="w-full max-h-full max-w-full" />
</Slide>

<ThreeDCardSlide />


<!-- Genie Sequence -->

