<script lang="ts">
	import type Konva from 'konva';
	import { canvasElements, focusElement, layer, stage, transformer } from '$stores/canvasElements';
	import Canvas from './Canvas.svelte';
	import EditorLayerButton from './EditorLayerButton.svelte';
	import AddNewLayer from './AddNewLayer/AddNewLayer.svelte';

	let activeTab: 'layers' | 'config' = 'layers';
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
			class="overflow-hidden rounded-b-lg px-2 py-4 flex flex-col h-full bg-base-100 border border-base-200 gap-2"
		>
			<AddNewLayer />
			{#each $canvasElements as { label, type, config: { id } }}
				<EditorLayerButton
					handleClick={() => id && focusElement(id)}
					bind:id
					bind:label
					bind:type
				/>
			{/each}
		</div>
	</div>
</div>
