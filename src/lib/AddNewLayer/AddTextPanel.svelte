<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';

	export let selected: string | undefined;
	export let open: boolean;

	let text = '';

	const createText = () => {
		// add text to canvas elements

		// reset new layer component
		open = false;
		selected = undefined;
	};
</script>

<form
	on:submit|preventDefault={createText}
	in:fly={{ x: 400 }}
	out:fly={{ x: 400 }}
	class="grid grid-cols-3 absolute top-4 left-0 w-full"
>
	<button
		type="button"
		on:click={() => (selected = undefined)}
		class="btn btn-ghost tooltip"
		data-tip="Back"
	>
		<SvgIcon type="Back" />
	</button>
	<textarea name="text" id="text" cols="30" rows="10" />
	<button class="btn btn-ghost tooltip" data-tip="Add Text" type="submit">
		<SvgIcon type="New" />
	</button>
</form>
