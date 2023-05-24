<script lang="ts">
	export let config: Record<string, string | number | boolean | object> = {};
</script>

{#each Object.entries(config) as [key, value]}
	{#if typeof value === 'object'}
		<div>
			<h3>{key}</h3>
			<svelte:self bind:config={value} />
		</div>
	{:else}
		<div>
			<label>{key}</label>
			{#if typeof value === 'string'}
				<input type="text" bind:value={config[key]} />
			{:else if typeof value === 'number'}
				<input type="number" bind:value={config[key]} />
			{:else if typeof config[key] === 'boolean'}
				{#if typeof config[key] === 'boolean'}
					<input type="checkbox" bind:checked={config[key]} />
				{/if}
			{/if}
		</div>
	{/if}
{/each}
