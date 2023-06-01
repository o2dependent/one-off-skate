<script lang="ts">
	import { assets } from '$app/paths';
	import { onMount } from 'svelte';
	import { Layer, Rect, Image } from 'svelte-konva';

	export let width: number;
	export let height: number;
	export let maskImage: HTMLImageElement | undefined;

	// Mask image
	export let maskHeight: number;
	export let maskWidth: number;
	export let maskX: number;
	export let maskY: number;

	onMount(() => {
		const img = document.createElement('img');
		img.src = `${assets}/8_mask_standard.png`;
		img.onload = () => {
			maskImage = img;
		};
	});
</script>

<Layer config={{ listening: false }}>
	<Rect
		config={{
			x: 0,
			y: 0,
			width: (width - maskWidth) / 1.8,
			height,
			fill: '#ffffff'
		}}
	/>
	<Rect
		config={{
			x: maskWidth + maskX - 1,
			y: 0,
			width: (width - maskWidth) / 1.8,
			height,
			fill: '#ffffff'
		}}
	/>

	{#if maskImage}
		<Image
			config={{
				image: maskImage,
				height: maskHeight,
				width: maskWidth,
				x: maskX,
				y: maskY
			}}
		/>
	{/if}
</Layer>
