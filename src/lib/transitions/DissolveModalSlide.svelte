<script>
	import { scale } from 'svelte/transition'
	import { dissolve } from './ordered-dissolve.js'
	
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
		class="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold shadow-lg text-xl"
	>
		Open Modal
	</button>

	<!-- Modal overlay -->
	{#if isModalOpen}
		<div class="fixed inset-0 flex items-center justify-center z-50">
			<!-- Modal content with dissolve transition -->
			<div
				class="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl"
                in:scale={{ duration: 300, opacity: 0.5 }}
				out:dissolve={{ duration: 500, pattern: "blue-noise" }}
			>
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Dissolving Modal</h2>
				<div class="flex gap-3">
					<button
						onclick={closeModal}
						class="px-6 py-3 w-full bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
					>
						Dissolve Away
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
