<script lang="ts">
	import { fly } from 'svelte/transition';
	import EditorButton from '../EditorButton.svelte';

	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;
</script>

<div
	bind:clientHeight={height}
	class="absolute top-4 left-0 w-full"
	in:fly|local={{ x: -400 }}
	out:fly|local={{ x: -400 }}
>
	<EditorButton handleClick={() => ((open = true), (dir = 1))} id="New" label="New" type="New" />
</div>
