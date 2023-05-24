<script lang="ts">
	import { Stage, Layer, Text, Image } from 'svelte-konva';
	import { canvasElements } from '$stores/canvasElements';
	import { onMount } from 'svelte';
	import EditorLayerButton from './EditorLayerButton.svelte';

	let stageContainer: HTMLDivElement;
	let width = 0;
	let height = 0;

	let activeTab: 'layers' | 'settings' = 'layers';

	onMount(() => {
		const setSizes = () => {
			width = stageContainer.clientWidth;
			height = stageContainer.clientHeight;
		};
		setSizes();
		window.addEventListener('resize', setSizes);
	});
</script>

<div class="w-full h-full container mx-auto flex gap-4 p-4">
	<div
		bind:this={stageContainer}
		class="rounded-lg overflow-hidden shadow-lg bg-base-300 border border-base-300 h-full w-full"
	>
		<Stage config={{ width: stageContainer?.clientWidth, height: stageContainer?.clientHeight }}>
			<Layer>
				{#each $canvasElements as element}
					{@const { config, type } = element}
					{#if type === 'Text'}
						<Text config={config ?? {}} />
					{:else if type === 'Image'}
						<Image config={config ?? {}} />
					{/if}
				{/each}
			</Layer>
		</Stage>
	</div>
	<div class="flex flex-col gap-0 h-full w-72">
		<div class="tabs tab-border-none w-full flex">
			<button
				on:click={() => (activeTab = 'layers')}
				class:tab-active={activeTab === 'layers'}
				class="flex-grow tab tab-lg tab-lifted">Layers</button
			>
			<button
				on:click={() => (activeTab = 'settings')}
				class:tab-active={activeTab === 'settings'}
				class="flex-grow tab tab-lg tab-lifted">Image_1</button
			>
		</div>
		<div
			class:rounded-tr-lg={activeTab === 'layers'}
			class:rounded-tl-lg={activeTab === 'settings'}
			class="rounded-b-lg px-2 py-4 flex flex-col h-full bg-base-300 border border-base-300 gap-2"
		>
			<EditorLayerButton label="New" icon="New" />
			<div class="h-[1px] bg-base-content/10 w-full rounded-full" />
			<EditorLayerButton label="Image_1" icon="Image" />
		</div>
	</div>
</div>
