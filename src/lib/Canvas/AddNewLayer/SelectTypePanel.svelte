<script lang="ts">
	import SvgIcon from '$lib/Canvas/svgs/SvgIcon.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let open: boolean;
	export let selected: string | undefined;
	export let dir: -1 | 1;
	export let height: number;
</script>

<div
	bind:clientHeight={height}
	in:fly={{ x: 400 * dir }}
	out:fly={{ x: 400 * dir }}
	class="grid grid-cols-3 absolute top-4 left-0 w-full"
>
	<button
		type="button"
		on:click={() => ((selected = undefined), (open = false), (dir = 1))}
		class="btn btn-ghost tooltip flex items-center justify-center"
		data-tip="Back"
	>
		<div class="w-6">
			<SvgIcon type="Back" />
		</div>
	</button>
	<button
		type="button"
		on:click={() => ((selected = 'Text'), (dir = -1))}
		class="btn btn-ghost tooltip flex items-center justify-center"
		data-tip="Text"
	>
		<div class="w-6">
			<SvgIcon type="Text" />
		</div>
	</button>
	<button
		type="button"
		on:click={() => ((selected = 'Image'), (dir = -1))}
		class="btn btn-ghost tooltip flex items-center justify-center"
		data-tip="Image"
	>
		<div class="w-6">
			<SvgIcon type="Image" />
		</div>
	</button>
</div>
