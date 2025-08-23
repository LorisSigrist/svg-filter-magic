<script>
	import { Slide } from "@animotion/core"
    import obraDinn from "./obra_dinn.jpg"
    import dithering from "./dithering.svg"
    import contrast from "./contrast.svg"
    import pipeline from "./pipeline.svg"

</script>

<Slide class="h-full w-full grid place-items-center p-32">
    <img src={obraDinn} alt="" class="max-h-full max-w-full w-full rounded-lg shadow-2xl"/>
</Slide>

<Slide transition="fade" class="h-full w-full grid place-items-center p-32">
    <h1>Dithering</h1>
    <img src={dithering} alt="" class="max-h-full max-w-full w-full rounded-lg shadow-2xl"/>
</Slide>

<Slide transition="fade" class="h-full w-full grid place-items-center p-32">
    <h1>Dithering ≠ Contrast</h1>
    <img src={contrast} alt="" class="max-h-full max-w-full w-full rounded-lg shadow-2xl"/>
</Slide>

<Slide class="h-full w-full grid place-items-center">
    <img src={pipeline} alt="Dithering Pipeline" class="h-full w-full object-fit object-center"/>
</Slide>