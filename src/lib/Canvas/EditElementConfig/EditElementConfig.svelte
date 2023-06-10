<script lang="ts">
	import type { CanvasElementType, CanvasElementConfigMap } from '$stores/canvasElementsTypes';
	import EditImageConfig from './EditImageConfig.svelte';
	import EditTextConfig from './EditTextConfig.svelte';

	export let type: CanvasElementType | 'New' = 'Image';
	export let config: CanvasElementConfigMap[CanvasElementType] | undefined;
	export let label: string;
</script>

{#if config}
	<div class="rounded-md bg-base-content/10 px-2 py-2 flex flex-col gap-2 flex-grow">
		{#if type === 'Text'}
			<EditTextConfig bind:config bind:label />
		{:else if type === 'Image'}
			<EditImageConfig bind:config bind:label />
		{/if}
	</div>
{/if}
