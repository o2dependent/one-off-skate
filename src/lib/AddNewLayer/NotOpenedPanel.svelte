<script lang="ts">
	import EditorLayerButton from '$lib/EditorLayerButton.svelte';
	import { fly } from 'svelte/transition';

	export let open: boolean;
</script>

<div class="absolute top-4 left-0 w-full" in:fly={{ x: -400 }} out:fly={{ x: -400 }}>
	<EditorLayerButton handleClick={() => (open = true)} id="New" label="New" type="New" />
</div>
