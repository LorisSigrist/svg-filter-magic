<script lang="ts">
	import { Action, Code, Slide } from '@animotion/core'

	let { lang, modules } = $props()

    const steps = Object.entries(modules).map(([key, value])=>{
        const num = key.match(/[0-9]+/);
        return { num: parseInt(num), code: value.default };
    }).sort((a,b) => a.num - b.num).map(e => e.code);

    let code: ReturnType<typeof Code>;
</script>

<Slide class="grid h-full w-full place-items-center">
	<div>
		<Code
            bind:this={code}
			{lang}
			theme="poimandres"
			code={steps[0]}
			class="h-full w-full"
		/>
	</div>

    {#each steps.slice(1) as step (step)}
        <Action do={() => code.update`${step}`} undo={() => code.update`${steps[steps.indexOf(step)-1]}`} />
    {/each}
</Slide>
