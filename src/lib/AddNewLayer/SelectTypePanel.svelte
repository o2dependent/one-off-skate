<script lang="ts">
	import SvgIcon from '$lib/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';

	export let open: boolean;
	export let selected: string | undefined;
	export let dir: -1 | 1;
</script>

<div
	in:fly={{ x: 400 * dir }}
	out:fly={{ x: 400 * dir }}
	class="grid grid-cols-3 absolute top-4 left-0 w-full"
>
	<button
		type="button"
		on:click={() => ((selected = undefined), (open = false), (dir = 1))}
		class="btn btn-ghost tooltip"
		data-tip="Back"
	>
		<SvgIcon type="Back" />
	</button>
	<button
		type="button"
		on:click={() => ((selected = 'Text'), (dir = -1))}
		class="btn btn-ghost tooltip"
		data-tip="Text"
	>
		<SvgIcon type="Text" />
	</button>
	<button
		type="button"
		on:click={() => ((selected = 'Image'), (dir = -1))}
		class="btn btn-ghost tooltip"
		data-tip="Image"
	>
		<SvgIcon type="Image" />
	</button>
</div>
