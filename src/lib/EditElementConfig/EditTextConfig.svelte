<script lang="ts">
	import TextConfigInput from '$lib/ConfigInputs/TextConfigInput.svelte';
	import type { CanvasElementConfigMap } from '$stores/canvasElementsTypes';

	export let config: CanvasElementConfigMap['Text'] | undefined;
	export let label: string;
	$: label = config?.text ?? 'Text';
	$: {
		if (typeof config?.text === 'undefined') {
			config = { ...config, text: '' };
		}
	}
</script>

{#if config?.text}
	<TextConfigInput bind:text={config.text} />
{/if}
