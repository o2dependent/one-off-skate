<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';
	import { addCanvasElement, stage } from '$stores/canvasElements';
	import SvgImageIcon from '$lib/svgs/SvgImageIcon.svelte';

	export let selected: string | undefined;
	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;

	let files: FileList | undefined;
	$: file = files?.[0] ?? undefined;
	let image: HTMLImageElement;
	let src = '';
	$: {
		if (file) {
			console.log({ file });
			// fileToBase64(file).then((base64) => (src = base64));
			src = URL.createObjectURL(file);
			console.log({ src: URL.createObjectURL(file) });
		}
	}

	const fileToBase64 = (file: File): Promise<string> => {
		// convert file to blob
		const blob = new Blob([file], { type: file.type });

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => {
				if (!reader?.result) return;
				let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
				if (encoded.length % 4 > 0) {
					encoded += '='.repeat(4 - (encoded.length % 4));
				}
				resolve(encoded);
			};
			reader.onerror = (error) => reject(error);
		});
	};

	const createImage = () => {
		if (!image) return;
		const aspectRatio = image.naturalWidth / image.naturalHeight;
		// add text to canvas elements
		addCanvasElement('Image', file?.name ?? 'Image', {
			image,
			width: 200,
			height: 200 / aspectRatio,
			x: ($stage?.width() ?? 0) / 2,
			y: ($stage?.height() ?? 0) / 2,
			fontSize: 24
		});

		// reset new layer component
		open = false;
		selected = undefined;
		dir = -1;
	};
</script>

<form
	bind:clientHeight={height}
	on:submit|preventDefault={createImage}
	in:fly={{ x: 400 }}
	out:fly={{ x: 400 }}
	class="absolute top-4 left-0 w-full flex flex-col gap-2"
>
	<div class="flex gap-2 items-center border-b border-base-content/10 pb-2">
		<button
			type="button"
			on:click={() => ((selected = undefined), (dir = -1))}
			class="btn btn-sm btn-ghost tooltip flex items-center justify-center w-fit"
			data-tip="Back"
		>
			<div class="w-6">
				<SvgIcon type="Back" />
			</div>
		</button>
		<p class="flex-grow text-left font-semibold">Add Image</p>
	</div>
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
				class:hidden={!file}
				class="object-contain aspect-square"
			/>
			{#if !file}
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
	<button disabled={!src} class="btn btn-sm btn-ghost tooltip flex gap-2" type="submit">
		<div class="w-6">
			<SvgIcon type="New" />
		</div>
		<p class="flex-grow text-left">Add Image</p>
	</button>
</form>
