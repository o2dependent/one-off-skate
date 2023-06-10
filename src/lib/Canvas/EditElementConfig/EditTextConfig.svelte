<script lang="ts">
	import TextConfigInput from '$lib/Canvas/ConfigInputs/TextConfigInput.svelte';
	import type { CanvasElementConfigMap } from '$stores/canvasElementsTypes';

	export let config: CanvasElementConfigMap['Text'] | undefined;
	export let label: string;
	$: label = config?.text ?? 'Text';
	$: {
		if (typeof config?.text === 'undefined') {
			config = { ...config, text: '' };
		}
		if (typeof config?.fill === 'undefined') {
			config = { ...config, fill: '#ffffff' };
		}
	}
</script>

{#if config?.text}
	<TextConfigInput bind:text={config.text} bind:fill={config.fill} />
{/if}
