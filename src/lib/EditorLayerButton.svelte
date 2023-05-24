<script lang="ts">
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import SvgAddIcon from './svgs/SvgAddIcon.svelte';
	import SvgImageIcon from './svgs/SvgImageIcon.svelte';

	export let icon: CanvasElementType | 'New' = 'Image';
	export let label = 'element';
</script>

<button type="button" class="btn btn-ghost">
	<div class="icon avatar">
		<div class="rounded w-6">
			{#if icon === 'Image'}
				<SvgImageIcon />
			{:else if icon === 'Text'}
				<!-- else if content here -->
			{:else if icon === 'New'}
				<SvgAddIcon />
			{/if}
		</div>
	</div>
	<p class="flex-grow">{label}</p>
</button>

<style lang="postcss">
	.btn {
		@apply flex gap-2 text-left normal-case;
	}
	.btn .icon {
		@apply grid place-items-center;
	}
	.btn p {
		@apply h-fit text-ellipsis overflow-hidden;
	}
</style>
