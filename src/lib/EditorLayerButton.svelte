<script lang="ts">
	import { canvasElements, selectedId, stage, transformer } from '$stores/canvasElements';
	import type { CanvasElementConfigMap, CanvasElementType } from '$stores/canvasElementsTypes';
	import { slide } from 'svelte/transition';
	import SvgIcon from './svgs/SvgIcon.svelte';
	import EditElementConfig from './EditElementConfig/EditElementConfig.svelte';

	export let type: CanvasElementType | 'New' = 'Image';
	export let label = 'element';
	export let id: string | undefined;
	export let tooltip: string = '';
	export let config: CanvasElementConfigMap[CanvasElementType] | undefined;
	export let idx: number | undefined;

	export let handleClick: () => void = () => {};

	$: selected = $selectedId === id;

	const moveUp = () => {
		if (typeof idx === 'undefined') return;
		// shift element up
		const newEls = [...$canvasElements];
		newEls.splice(idx, 1);
		newEls.splice(idx - 1, 0, $canvasElements[idx]);
		$canvasElements = newEls;
	};
	const moveDown = () => {
		if (typeof idx === 'undefined') return;
		// shift element down
		const newEls = [...$canvasElements];
		newEls.splice(idx, 1);
		newEls.splice(idx + 1, 0, $canvasElements[idx]);
		$canvasElements = newEls;
	};
	const onCenterElement = (axis: 'horizontal' | 'vertical') => () => {
		if (!axis) return;
		const [stageW, stageH] = [$stage?.width(), $stage?.height()];
		const el = $stage?.findOne(`#${id}`);
		const [w, h] = [
			(el?.width() ?? 1) * (el?.scaleX() ?? 1),
			(el?.height() ?? 1) * (el?.scaleY() ?? 1)
		];
		if (!stageW || !stageH || !w || !h) return;
		if (axis === 'horizontal') {
			config = { ...config, y: stageH / 2 - h / 2 };
		} else {
			config = { ...config, x: stageW / 2 - w / 2 };
		}
	};
	const deleteElement = () => {
		if (typeof idx === 'undefined') return;
		// delete element
		const newEls = [...$canvasElements];
		newEls.splice(idx, 1);
		$canvasElements = newEls;
		// deselect element
		$selectedId = undefined;
		$transformer?.nodes([]);
	};
</script>

<div>
	<button
		on:click={handleClick}
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
		<div in:slide out:slide class="pt-2 flex flex-col gap-2">
			<!-- SECTION: Tools -->
			<div class="grid grid-cols-2 gap-2">
				<div
					class="rounded-md bg-base-content/10 px-2 py-2 h-fit w-fit items-center justify-center flex gap-2"
				>
					<button
						type="button"
						class="btn btn-sm btn-ghost p-1.5 w-fit flex items-center justify-center tooltip"
						data-tip="Move Up"
						on:click={moveUp}
						disabled={idx === 0}
					>
						<SvgIcon type="Up" />
					</button>
					<button
						type="button"
						class="btn btn-sm btn-ghost p-1.5 w-fit flex items-center justify-center tooltip"
						data-tip="Move Down"
						on:click={moveDown}
						disabled={idx === $canvasElements.length - 1}
					>
						<SvgIcon type="Down" />
					</button>
				</div>
				<div
					class="rounded-md bg-base-content/10 px-2 py-2 h-fit w-fit items-center justify-center flex gap-2"
				>
					<button
						on:click={onCenterElement('horizontal')}
						type="button"
						class="btn btn-sm btn-ghost p-1.5 w-fit flex items-center justify-center tooltip"
						data-tip="Center Horizonal"
					>
						<SvgIcon type="CenterHorizonal" />
					</button>
					<button
						on:click={onCenterElement('vertical')}
						type="button"
						class="btn btn-sm btn-ghost p-1.5 w-fit flex items-center justify-center tooltip"
						data-tip="Center Vertical"
					>
						<SvgIcon type="CenterVertical" />
					</button>
				</div>
				<div
					class="rounded-md bg-base-content/10 px-2 py-2 h-fit w-fit items-center justify-center flex gap-2 bg-error text-error-content"
				>
					<button
						on:click={deleteElement}
						type="button"
						class="btn btn-sm btn-ghost p-1.5 w-fit flex items-center justify-center tooltip"
						data-tip="Center Vertical"
					>
						<SvgIcon type="Trash" />
					</button>
				</div>
			</div>
			<!-- !SECTION -->
			<!-- SECTION: Edit panel -->
			{#if config}
				<EditElementConfig bind:config bind:type bind:label />
			{/if}
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
