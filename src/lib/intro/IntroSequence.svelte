<script>
	import { Slide } from "@animotion/core"
	import TitleSlide from "./TitleSlide.svelte"
	import WhatAreSvgFilters from "./WhatAreSvgFilters.svelte"
	import TableOfContents from "./TableOfContents.svelte"
</script>


<Slide transition="fade" class="h-full w-full">
    <TitleSlide />
</Slide>

<Slide transition="slide" class="h-full w-full">
    <WhatAreSvgFilters />
</Slide>

<!--
<Slide transition="slide" class="h-full w-full">
    <TableOfContents />
</Slide>
-->