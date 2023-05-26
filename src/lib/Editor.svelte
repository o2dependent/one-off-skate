<script lang='ts'>

	import Canvas from "./Canvas.svelte";
import EditorLayerButton from "./EditorLayerButton.svelte";

	let activeTab: 'layers' | 'config' = 'layers';
</script>


<div class="w-full h-full container mx-auto flex gap-4 p-4">
	<Canvas />
	<div class="flex flex-col gap-0 h-full w-72">
		<div class="tabs tab-border-none w-full flex">
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
			class="rounded-b-lg px-2 py-4 flex flex-col h-full bg-base-300 border border-base-300 gap-2"
		>
			<EditorLayerButton label="New" icon="New" />
			<div class="h-[1px] bg-base-content/10 w-full rounded-full" />
			<EditorLayerButton label="Image_1" icon="Image" />
		</div>
	</div>
</div>
