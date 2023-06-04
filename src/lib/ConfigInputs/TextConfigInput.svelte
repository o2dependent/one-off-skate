<script lang="ts">
	export let text: string;
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
