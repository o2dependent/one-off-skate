<script lang="ts">
	import { addCanvasElement, stage } from '$stores/canvasElements';

	export let files: FileList | undefined;
	export let file: File | undefined;
	export let image: HTMLImageElement;
	export let src: string;

	$: {
		if (file) {
			src = URL.createObjectURL(file);
			console.log({ src: URL.createObjectURL(file) });
		}
	}
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="text">
		<span class="label-text">Image</span>
		<span class="label-text-alt text-error text-xs">Required *</span>
	</label>
	<div
		class="relative w-full aspect-square rounded-lg border border-base-content flex items-center justify-center"
	>
		<img
			bind:this={image}
			{src}
			alt="Selected"
			class:hidden={!src}
			class="object-contain aspect-square"
		/>
		{#if !src}
			<p>Select Image</p>
		{/if}
		<input
			bind:files
			name="image"
			type="file"
			accept="image/*"
			class="cursor-pointer z-10 opacity-0 absolute w-full h-full"
		/>
	</div>
</div>
