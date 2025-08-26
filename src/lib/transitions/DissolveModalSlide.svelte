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

<div class="grid h-full w-full place-items-center p-32">
	<!-- Trigger button -->
	<button
		onclick={openModal}
		class="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold shadow-lg text-xl"
	>
		Open Dissolving Modal
	</button>

	<!-- Modal overlay -->
	{#if isModalOpen}
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<!-- Modal content with dissolve transition -->
			<div
				class="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl"
                in:scale={{ duration: 300, opacity: 0.5 }}
				out:dissolve={{ duration: 500, pattern: "blue-noise" }}
			>
				<h2 class="text-3xl font-bold text-gray-800 mb-6">Dissolving Modal</h2>
				<p class="text-gray-600 mb-6 text-lg leading-relaxed">
					This modal appears and disappears using a dithered dissolve transition. 
					The effect uses SVG filters to create a digital dissolve pattern that 
					reveals or hides the content pixel by pixel.
				</p>
				<div class="bg-gradient-to-r from-purple-100 to-blue-100 p-4 rounded-lg mb-6">
					<h3 class="font-semibold text-gray-800 mb-2">How it works:</h3>
					<ul class="text-sm text-gray-600 space-y-1">
						<li>• Uses SVG dithering patterns for pixel-perfect dissolve</li>
						<li>• Animates alpha mask values over time</li>
						<li>• Creates organic, noise-based transitions</li>
					</ul>
				</div>
				<div class="flex gap-3">
					<button
						onclick={closeModal}
						class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
					>
						Dissolve Away
					</button>
					<button
						onclick={() => isModalOpen = false}
						class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
					>
						Close Instantly
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
