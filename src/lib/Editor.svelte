<script lang="ts">
	import type Konva from 'konva';
	import { canvasElements } from '$stores/canvasElements';
	import Canvas from './Canvas.svelte';
	import EditorLayerButton from './EditorLayerButton.svelte';

	let activeTab: 'layers' | 'config' = 'layers';
	let stage: Konva.Stage;
	let layer: Konva.Layer;
	let transformer: Konva.Transformer;

	const focusElement = (id: string) => {
		const element = stage.findOne(`#${id}`);
		if (element) {
			transformer.nodes([element]);
			layer.batchDraw();
		}
	};
</script>

<div class="w-full h-full container mx-auto flex gap-4 p-4">
	<Canvas bind:layer bind:transformer bind:stage />
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
			class="rounded-b-lg px-2 py-4 flex flex-col h-full bg-base-100 border border-base-200 gap-2"
		>
			<EditorLayerButton id="New" label="New" type="New" />
			<div class="h-[1px] bg-base-content/10 w-full rounded-full" />
			{#each $canvasElements as { label, id, type }}
				<EditorLayerButton handleClick={() => focusElement(id)} bind:id bind:label bind:type />
			{/each}
		</div>
	</div>
</div>
