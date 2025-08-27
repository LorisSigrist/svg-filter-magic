<script>
	import { scale } from 'svelte/transition'
	import { dissolve } from './ordered-dissolve.js'
	import lisa from './mona_lisa.jpg'
	
	let isModalOpen = $state(false)
	
	function openModal() {
		isModalOpen = true
	}
	
	function closeModal() {
		isModalOpen = false
	}
</script>

<style>
    button {
        border: none;
    }
</style>

<div class="grid h-full w-full place-items-center p-32">
	<!-- Trigger button -->
	<button
		onclick={openModal}
		class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg text-xl border-0"
	>
		Show
	</button>

	<!-- Modal overlay -->
	{#if isModalOpen}
		<div class="fixed inset-0 flex items-center justify-center z-50">
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<img
				src={lisa}
				alt="Mona Lisa"
				class="h-96 rounded-lg shadow-2xl cursor-pointer"
				in:scale={{ duration: 300, opacity: 0.5 }}
				out:dissolve={{ duration: 500, pattern: "blue-noise" }}
				onclick={closeModal}
			/>
		</div>
	{/if}
</div>
