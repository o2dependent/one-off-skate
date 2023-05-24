<script lang="ts">
	import { Stage, Layer, Rect, Text, Image } from 'svelte-konva';
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
					{#if element?.type === 'Text'}
						<Text config={element?.config ?? {}} />
					{:else if element?.type === 'Image'}
						<Image config={element?.config ?? {}} />
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
			<button type="button" class="btn">
				<div class="grid place-items-center">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 6V12M12 12V18M12 12H18M12 12H6"
							stroke="#3F3F46"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<p class="flex-grow">New</p>
			</button>
			<div class="h-[1px] bg-base-100 w-full rounded-full" />
			<EditorLayerButton />
		</div>
	</div>
</div>
