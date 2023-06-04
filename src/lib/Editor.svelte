<script lang="ts">
	import type Konva from 'konva';
	import { canvasElements, focusElement, layer, stage, transformer } from '$stores/canvasElements';
	import Canvas from './Canvas.svelte';
	import EditorLayerButton from './EditorLayerButton.svelte';
	import AddNewLayer from './AddNewLayer/AddNewLayer.svelte';
	import CanvasColorInput from './CanvasColorInput.svelte';

	let activeTab: 'layers' | 'config' = 'layers';

	$: console.log($canvasElements);
</script>

<div class="w-full h-full container mx-auto flex gap-4 p-4">
	<Canvas />
	<div class="flex flex-col gap-0 h-full w-72">
		<div class="tabs tab-border w-full flex -mb-[1px] border-b-0">
			<button
				on:click={() => (activeTab = 'layers')}
				class:tab-active={activeTab === 'layers'}
				class="flex-grow tab tab-lg tab-lifted">Layers</button
			>
			<button
				on:click={() => (activeTab = 'config')}
				class:tab-active={activeTab === 'config'}
				class="flex-grow tab tab-lg tab-lifted">Config</button
			>
		</div>
		<div
			class:rounded-tr-lg={activeTab === 'layers'}
			class:rounded-tl-lg={activeTab === 'config'}
			class="rounded-b-lg pb-4 flex flex-col h-full bg-base-100 border border-base-200 gap-2"
		>
			<AddNewLayer />
			<CanvasColorInput />
			<h2 class="mx-2 font-medium">Layers</h2>
			<div class="px-2 flex flex-col gap-2">
				{#each $canvasElements as { label, type, config }}
					<EditorLayerButton
						handleClick={() => config.id && focusElement(config.id)}
						bind:id={config.id}
						bind:label
						bind:type
						bind:config
					/>
				{:else}
					<div class="flex flex-col h-full w-full items-center justify-center">
						<p class="text-center pt-2">No Layers!</p>
						<div class="w-24">
							<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
								<circle fill="currentColor" cx="184" cy="232" r="24" />
								<path
									fill="currentColor"
									d="M256 288c45.42 0 83.62 29.53 95.71 69.83a8 8 0 01-7.87 10.17H168.15a8 8 0 01-7.82-10.17C172.32 317.53 210.53 288 256 288z"
								/>
								<circle fill="currentColor" cx="328" cy="232" r="24" /><circle
									cx="256"
									cy="256"
									r="208"
									fill="none"
									stroke="currentColor"
									stroke-miterlimit="10"
									stroke-width="32"
								/>
							</svg>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
