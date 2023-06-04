<script lang="ts">
	import { backgroundFill } from '$stores/canvasElements';

	let value = '#ffffff';

	$: $backgroundFill = value;
</script>

<div
	class="relative mx-2 rounded-md border border-base-content/20 h-8"
	style="background-color: {value}"
>
	<input class="absolute top-0 left-0 w-full h-full z-10 opacity-0" type="color" bind:value />
</div>
<div class="h-[1px] bg-base-content/25 mx-2 rounded-full" />
