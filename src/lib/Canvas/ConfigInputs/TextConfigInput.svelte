<script lang="ts">
	export let text: string;
	export let fill: string | undefined;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label" for="text">
		<span class="label-text">Text</span>
		<span class="label-text-alt text-error text-xs">Required *</span>
	</label>
	<input
		bind:value={text}
		name="text"
		type="text"
		placeholder="Enter Text..."
		class="input input-bordered w-full max-w-xs"
	/>
</div>
<h2 class="mx-2 font-medium">Background Color</h2>
<div
	class="relative mx-2 rounded-md border border-base-content/20 h-8"
	style="background-color: {fill}"
>
	<input
		class="absolute top-0 left-0 w-full h-full z-10 opacity-0"
		type="color"
		bind:value={fill}
	/>
</div>
