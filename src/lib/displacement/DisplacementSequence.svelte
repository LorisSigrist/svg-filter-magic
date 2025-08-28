<script>
	import { Slide } from "@animotion/core"
    import ThreeDCardSlide from "./3DCardSlide.svelte"

    import depthMap from "./library-depth.png";
    
    import lens_displacement from "./lens-displacement.png";
    import liquid_glass from "./Liquid Glass.webp";
    import lens_graph from "./lens.svg";
	import LiquidGlassSlide from "./LiquidGlassSlide.svelte"


</script>

<Slide class="grid h-full w-full place-items-center p-16">
    <h1>Displacement Maps are Awesome!</h1>
</Slide>


<!-- 3D Card Sequence -->

<Slide class="grid h-full w-full place-items-center p-16">
    <img src={depthMap} alt="Depth Map Example" class="h-96" />
</Slide>

<ThreeDCardSlide />


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