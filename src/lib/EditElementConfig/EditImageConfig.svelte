<script lang="ts">
	import ImageConfigInput from '$lib/ConfigInputs/ImageConfigInput.svelte';
	import { stage } from '$stores/canvasElements';
	import type { CanvasElementConfigMap } from '$stores/canvasElementsTypes';

	export let config: CanvasElementConfigMap['Image'] | undefined;
	export let label: string;

	let files: FileList | undefined;
	let image: HTMLImageElement;
	let src = $stage?.findOne(`#${config?.id}`)?.toDataURL() ?? '';

	$: file = files?.[0] ?? undefined;
	$: label = file ? file?.name ?? 'Image' : label;
	$: {
		if (file && image) {
			console.log(image?.src);
			// get natural aspect ratio of the new image and set new width and height
			const aspectRatio = image.naturalWidth / image.naturalHeight;
			const sizing = {
				width: config?.width ?? 0,
				innerHeight: (config?.height ?? 0) / aspectRatio
			};

			config = { ...config, ...sizing, image };
		}
	}
</script>

{#if config}
	<ImageConfigInput bind:file bind:files bind:image bind:src />
{/if}
