<script lang="ts">
	import { onMount } from 'svelte';

	// make sure that we don't try to run the editor on the server
	// server will crash if that happens
	let mounted = false;
	onMount(() => (mounted = true));
</script>

{#if mounted}
	{#await import('$lib/Editor.svelte')}
		<h1>Loading...</h1>
	{:then { default: Editor }}
		<Editor />
	{/await}
{/if}
