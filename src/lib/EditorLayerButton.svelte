<script lang="ts">
	import type Konva from 'konva';
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import SvgAddIcon from './svgs/SvgAddIcon.svelte';
	import SvgImageIcon from './svgs/SvgImageIcon.svelte';
	import SvgTextIcon from './svgs/SvgTextIcon.svelte';

	export let type: CanvasElementType | 'New' = 'Image';
	export let label = 'element';
	export let id: string;

	export let handleClick: () => void = () => {};
</script>

<button on:click={handleClick} type="button" class="btn btn-ghost">
	<div class="icon avatar">
		<div class="rounded w-6">
			{#if type === 'Image'}
				<SvgImageIcon />
			{:else if type === 'Text'}
				<SvgTextIcon />
			{:else if type === 'New'}
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
