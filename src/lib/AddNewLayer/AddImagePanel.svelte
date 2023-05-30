<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';

	export let selected: string | undefined;
	export let open: boolean;

	let image: File | undefined;

	const createImage = () => {
		// add image to canvas elements

		// reset new layer component
		open = false;
		selected = undefined;
	};
</script>

<div in:fly={{ x: 400 }} out:fly={{ x: 400 }} class="grid grid-cols-3 absolute top-4 left-0 w-full">
	<button
		type="button"
		on:click={() => (selected = undefined)}
		class="btn btn-ghost tooltip"
		data-tip="Back"
	>
		<SvgIcon type="Back" />
	</button>
	<button
		type="button"
		on:click={() => (selected = 'Text')}
		class="btn btn-ghost tooltip"
		data-tip="Text"
	>
		<SvgIcon type="Text" />
	</button>
	<button
		type="button"
		on:click={() => (selected = 'Image')}
		class="btn btn-ghost tooltip"
		data-tip="Image"
	>
		<SvgIcon type="Image" />
	</button>
</div>
