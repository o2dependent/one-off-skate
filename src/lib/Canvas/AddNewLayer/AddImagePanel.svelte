<script lang="ts">
	import SvgIcon from '$lib/Canvas/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';
	import ImageConfigInput from '$lib/Canvas/ConfigInputs/ImageConfigInput.svelte';
	import { addImageElement } from '$lib/Canvas/ConfigInputs/addImageElement';

	export let selected: string | undefined;
	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;

	let files: FileList | undefined;
	$: file = files?.[0] ?? undefined;
	let image: HTMLImageElement;
	let src = '';
</script>

<form
	bind:clientHeight={height}
	on:submit|preventDefault={() =>
		file &&
		addImageElement({
			afterCreate: () => {
				// reset new layer component
				open = false;
				selected = undefined;
				dir = -1;
			},
			image,
			file
		})}
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
	<ImageConfigInput bind:file bind:files bind:image bind:src />
	<button disabled={!src} class="btn btn-sm btn-ghost tooltip flex gap-2" type="submit">
		<div class="w-6">
			<SvgIcon type="New" />
		</div>
		<p class="flex-grow text-left">Add Image</p>
	</button>
</form>
