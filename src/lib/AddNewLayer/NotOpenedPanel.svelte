<script lang="ts">
	import EditorLayerButton from '$lib/EditorLayerButton.svelte';
	import { fly } from 'svelte/transition';

	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;
</script>

<div
	bind:clientHeight={height}
	class="absolute top-4 left-0 w-full"
	in:fly={{ x: -400 }}
	out:fly={{ x: -400 }}
>
	<EditorLayerButton
		handleClick={() => ((open = true), (dir = 1))}
		id="New"
		label="New"
		type="New"
	/>
</div>
