<script lang="ts">
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import SelectTypePanel from './SelectTypePanel.svelte';
	import AddTextPanel from './AddTextPanel.svelte';
	import AddImagePanel from './AddImagePanel.svelte';
	import NotOpenedPanel from './NotOpenedPanel.svelte';

	let open = false;
	let selected: CanvasElementType | undefined;
	let dir: 1 | -1 = 1;
	let height = 0;
</script>

<div
	class="relative w-full py-2 transition-all ease-in-out"
	style="height: {height + 32}px; will-change: height;"
>
	{#if open}
		{#if !selected}
			<SelectTypePanel bind:height bind:dir bind:open bind:selected />
		{:else if selected === 'Text'}
			<AddTextPanel bind:height bind:dir bind:open bind:selected />
		{:else if selected === 'Image'}
			<AddImagePanel bind:height bind:dir bind:open bind:selected />
		{/if}
	{:else}
		<NotOpenedPanel bind:height bind:dir bind:open />
	{/if}
</div>
<div class="h-[1px] bg-base-content/25 w-full rounded-full" />
