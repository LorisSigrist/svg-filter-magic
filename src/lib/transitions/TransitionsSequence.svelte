<script>
	import { Slide } from "@animotion/core"
	import DissolvingModalSlide from "./DissolvingModalSlide.svelte"
	import DissolveModalSlide from "./DissolveModalSlide.svelte"

</script>
<Slide class="grid h-full w-full place-items-center p-16">
    <h1>Transitions!</h1>
</Slide>

<DissolvingModalSlide />

<Slide class="h-full w-full">
	<DissolveModalSlide />
</Slide>