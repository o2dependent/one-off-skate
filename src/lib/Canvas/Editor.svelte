<script lang="ts">
	import { jsPDF } from 'jspdf';
	import { canvasElements, focusElement, layer, stage, transformer } from '$stores/canvasElements';
	import Canvas from './Canvas.svelte';
	import EditorLayerButton from './EditorLayerButton.svelte';
	import AddNewLayer from './AddNewLayer/AddNewLayer.svelte';
	import CanvasColorInput from './CanvasColorInput.svelte';
	import { postPDF } from '$services/postPDF';

	let activeTab: 'layers' | 'config' = 'layers';

	let printLoading = false;
	const printCanvas = async (): Promise<void> => {
		// create new image to get aspect ratio of canvas
		const img = new Image();
		const dataURL = $layer?.toDataURL({
			pixelRatio: $layer?.pixelSize(),
			width: $layer?.width(),
			height: $layer?.height()
		});
		if (!dataURL) return;
		img.src = dataURL;
		let height = 0;
		let width = 0;
		await new Promise<void>((resolve) => {
			img.onload = () => {
				const aspectRatio = img.height / img.width;
				height = 295;
				width = height / aspectRatio;
				// const width = (img.width * 72) / 300; // convert pixels to points
				// const height = (img.height * 72) / 300; // convert pixels to points
				resolve();
			};
		});
		await postPDF({
			dataURL
			// width,
			// height
		});
	};
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
			class="rounded-b-lg flex flex-col h-full bg-base-100 border border-base-200 gap-2 overflow-y-auto"
		>
			<AddNewLayer />
			<CanvasColorInput />
			<h2 class="mx-2 font-medium">Layers</h2>
			<div class="px-2 flex-grow flex flex-col gap-2">
				{#each $canvasElements as { label, type, config }, idx}
					<EditorLayerButton
						handleClick={() => config.id && focusElement(config.id)}
						bind:id={config.id}
						bind:label
						bind:type
						bind:config
						{idx}
					/>
				{:else}
					<div class="flex flex-col h-full w-full items-center justify-center">
						<p class="text-center pt-2">No Layers!</p>
					</div>
				{/each}
			</div>
			<button
				disabled={printLoading}
				on:click={() => {
					printLoading = true;
					printCanvas().finally(() => {
						printLoading = false;
					});
				}}
				type="button"
				class="btn btn-success text-success-content m-2"
			>
				{#if printLoading}
					<span class="loading loading-spinner loading-md" />
				{:else}
					Add to cart!
				{/if}
			</button>
		</div>
	</div>
</div>
