<script lang="ts">
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import SelectTypePanel from './SelectTypePanel.svelte';
	import AddTextPanel from './AddTextPanel.svelte';
	import AddImagePanel from './AddImagePanel.svelte';
	import NotOpenedPanel from './NotOpenedPanel.svelte';

	let open = false;
	let selected: CanvasElementType | undefined;
</script>

<div class="relative w-full h-20">
	{#if open}
		{#if !selected}
			<SelectTypePanel bind:open bind:selected />
		{:else if selected === 'Text'}
			<AddTextPanel bind:open bind:selected />
		{:else if selected === 'Image'}
			<AddImagePanel bind:open bind:selected />
		{/if}
	{:else}
		<NotOpenedPanel bind:open />
	{/if}
</div>
<div class="h-[1px] bg-base-content/10 w-full rounded-full" />
