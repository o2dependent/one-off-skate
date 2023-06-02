<script lang="ts">
	import { selectedId } from '$stores/canvasElements';
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import { slide } from 'svelte/transition';
	import SvgIcon from './svgs/SvgIcon.svelte';

	export let type: CanvasElementType | 'New' = 'Image';
	export let label = 'element';
	export let id: string | undefined;
	export let tooltip: string = '';

	export let handleClick: () => void = () => {};

	$: selected = $selectedId === id;
</script>

<div>
	<button
		on:click={typeof id !== 'undefined' ? handleClick : () => {}}
		type="button"
		class="editor-btn btn btn-ghost w-full"
		class:btn-active={selected}
		class:tooltip
		data-tip={tooltip}
	>
		<div class="icon avatar">
			<div class="rounded w-6">
				<SvgIcon type={typeof id === 'undefined' ? 'Bug' : type} />
			</div>
		</div>
		<p class="flex-grow">{typeof id === 'undefined' ? 'An error occured!' : label}</p>
	</button>
	{#if selected}
		<div in:slide out:slide class="pl-2 pt-2 flex flex-col gap-1">
			<div class="rounded-md bg-base-content/10 px-1 py-2">
				<button class="btn btn-sm btn-ghost p-2 w-fit flex items-center justify-center">
					<SvgIcon type="Back" />
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.editor-btn {
		grid-template-columns: auto 1fr;
		@apply grid gap-2 text-left normal-case;
	}
	.editor-btn .icon {
		@apply grid place-items-center;
	}
	.editor-btn p {
		@apply h-fit text-ellipsis overflow-hidden;
	}
</style>
