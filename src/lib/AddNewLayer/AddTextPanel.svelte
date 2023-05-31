<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';

	export let selected: string | undefined;
	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;

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
	bind:clientHeight={height}
	on:submit|preventDefault={createText}
	in:fly={{ x: 400 }}
	out:fly={{ x: 400 }}
	class="absolute top-4 left-0 w-full"
>
	<button
		type="button"
		on:click={() => ((selected = undefined), (dir = -1))}
		class="btn btn-ghost tooltip flex items-center justify-center"
		data-tip="Back"
	>
		<div class="w-6">
			<SvgIcon type="Back" />
		</div>
	</button>
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
	<button class="btn btn-ghost tooltip btn-block" data-tip="Add Text" type="submit">
		<div class="w-6">
			<SvgIcon type="New" />
		</div>
	</button>
</form>
