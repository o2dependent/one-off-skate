<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';

	export let selected: string | undefined;
	export let open: boolean;
	export let dir: -1 | 1;

	let text = '';

	const createText = () => {
		// add text to canvas elements

		// reset new layer component
		open = false;
		selected = undefined;
		dir = -1;
	};
</script>

<form
	on:submit|preventDefault={createText}
	in:fly={{ x: 400 }}
	out:fly={{ x: 400 }}
	class="grid grid-cols-3 absolute top-4 left-0 w-full"
>
	<div class="flex gap-2">
		<button
			type="button"
			on:click={() => ((selected = undefined), (dir = -1))}
			class="btn btn-ghost tooltip"
			data-tip="Back"
		>
			<SvgIcon type="Back" />
		</button>
		<button class="btn btn-ghost tooltip" data-tip="Add Text" type="submit">
			<SvgIcon type="New" />
		</button>
	</div>
	<div class="form-control w-full max-w-xs">
		<label class="label" for="text">
			<span class="label-text">Enter Text</span>
		</label>
		<input
			name="text"
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs"
		/>
	</div>
</form>
