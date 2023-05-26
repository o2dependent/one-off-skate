<script lang="ts">
	import Konva from 'konva';
	import {
		Stage,
		Layer,
		Text,
		Image,
		Rect,
		Group,
		Transformer,
		RegularPolygon,
		Circle
	} from 'svelte-konva';
	import { canvasElements } from '$stores/canvasElements';
	import { onMount } from 'svelte';
	import { getRealPointerPos } from '$utils/getRealPointerPos';
	import type { KonvaEventObject } from 'konva/lib/Node';

	let stageContainer: HTMLDivElement;
	let width = 0;
	let height = 0;

	let stage: Konva.Stage;
	let layer: Konva.Layer;
	let transformer: Konva.Transformer;
	let selectionRectangle: Konva.Rect;

	const SELECTION_RECTANGLE_NAME = 'selection-rectangle';
	let selectionRectangleConfig = {
		fill: 'rgba(0,0,255,0.5)',
		visible: false,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		name: SELECTION_RECTANGLE_NAME
	};
	let configs = [
		{ x: 800, y: 240, radius: 120, fill: 'red' },
		{ x: 720, y: 80, radius: 120, fill: 'blue' },
		{ x: 700, y: 400, radius: 120, fill: 'green' }
	];

	// Used to calculate the position and size of the selection rectangle during selection
	let initialSelectionCoordinates: Konva.Vector2d = {
		x: 0,
		y: 0
	};

	onMount(() => {
		const setSizes = () => {
			width = stageContainer.clientWidth;
			height = stageContainer.clientHeight;
		};
		setSizes();
		window.addEventListener('resize', setSizes);
	});

	let selectionActive = false; // If the transformer is active eg. something is selected

	function selectStart(e: CustomEvent<KonvaEventObject<PointerEvent>>) {
		const konvaEvent = e.detail;

		// Check if event target is stage (eg. user clicked on empty part of the stage and not any shape)
		if (konvaEvent.target.getType() !== 'Stage') {
			return;
		}

		// If there is already a selection active, cancel it
		if (selectionActive) {
			transformer.nodes([]);
			selectionActive = false;
			return;
		}

		const pointerPos = getRealPointerPos(stage.getPointerPosition()!, stage);

		selectionRectangleConfig.x = pointerPos.x;
		selectionRectangleConfig.y = pointerPos.y;

		initialSelectionCoordinates.x = pointerPos.x;
		initialSelectionCoordinates.y = pointerPos.y;

		selectionRectangleConfig.visible = true;
	}

	function selectDrag() {
		if (!selectionRectangleConfig.visible) {
			// Currently no selection is active (eg. user is just moving the cursor around)
			return;
		}

		const pointerPos = getRealPointerPos(stage.getPointerPosition()!, stage);

		// Set new x coordinate and width of selection rectangle
		selectionRectangleConfig.x = Math.min(pointerPos.x, initialSelectionCoordinates.x);
		selectionRectangleConfig.width = Math.abs(pointerPos.x - initialSelectionCoordinates.x);

		// Set new y coordinate and height of selection rectangle
		selectionRectangleConfig.y = Math.min(pointerPos.y, initialSelectionCoordinates.y);
		selectionRectangleConfig.height = Math.abs(pointerPos.y - initialSelectionCoordinates.y);
	}

	function selectEnd() {
		if (!selectionRectangleConfig.visible) {
			// Currently no selection is active (eg. user clicked on non empty part of the stage)
			return;
		}

		if (layer.children) {
			const selectedEntities = layer!.children.filter(
				(child) =>
					child.name() !== SELECTION_RECTANGLE_NAME &&
					Konva.Util.haveIntersection(selectionRectangle.getClientRect(), child.getClientRect())
			);

			if (selectedEntities.length !== 0) {
				// Add all selected shapes etc. to the transformer
				transformer.nodes(selectedEntities);

				selectionActive = true;
			}
		}

		selectionRectangleConfig.visible = false;
		selectionRectangleConfig.width = 0;
		selectionRectangleConfig.height = 0;
	}

	// Cancel active selection if mouse cursor leaves stage area
	function selectMouseOut(e: CustomEvent<KonvaEventObject<PointerEvent>>) {
		const konvaEvent = e.detail;

		// Check if event target is stage (eg. user clicked on empty part of the stage and not any shape)
		if (konvaEvent.target.getType() !== 'Stage') {
			return;
		}

		selectEnd();
	}
</script>

<div
	bind:this={stageContainer}
	class="rounded-lg overflow-hidden shadow-lg bg-base-300 border border-base-300 h-full w-full"
>
	<!-- <Stage config={{ width, height }}>
		<Layer>
			<Rect config={{ width, height, x: 0, y: 0, fill: '#ffffff20' }} />
		</Layer>
		<Layer>
			{#each $canvasElements as element}
				{@const { config, type } = element}
				{#if type === 'Text'}
					<Group>
						<Text config={{ ...(config ?? {}), draggable: true }} />
					</Group>
				{:else if type === 'Image'}
					<Group>
						<Image config={{ ...(config ?? {}), draggable: true }} />
					</Group>
				{/if}
			{/each}
			<Transformer bind:this={transformer} config={{ borderStroke: 'red', borderDash: [6, 2] }} />
			<Rect config={selectionRectangleConfig} bind:handle={selectionRectangle} />
		</Layer>
	</Stage> -->
	<p>{JSON.stringify({ configs })}</p>
	<Stage
		on:pointerdown={selectStart}
		on:pointermove={selectDrag}
		on:pointerup={selectEnd}
		on:mouseout={selectMouseOut}
		bind:handle={stage}
		config={{ width, height }}
	>
		<Layer bind:handle={layer}>
			<!-- <Group config={{ draggable: true }}>
				{#each configs as config}
					<Circle bind:config />
				{/each}
			</Group>

			<Rect config={{ x: 50, y: 50, width: 100, height: 100, fill: 'green', draggable: true }} />

			<RegularPolygon
				config={{ x: 400, y: 300, radius: 80, sides: 10, fill: 'purple', draggable: true }}
			/> -->
			{#each $canvasElements as element}
				{@const { config, type } = element}
				{#if type === 'Text'}
					<Group>
						<Text config={{ ...(config ?? {}), draggable: true }} />
					</Group>
				{:else if type === 'Image'}
					<Group>
						<Image config={{ ...(config ?? {}), draggable: true }} />
					</Group>
				{/if}
			{/each}

			<!-- Position transformer and selection rectagle at the bottom of all components so they are always the topmost elements on the canvas -->
			<Transformer config={{}} bind:handle={transformer} />
			<!-- The selection rectangle -->
			<Rect config={selectionRectangleConfig} bind:handle={selectionRectangle} />
		</Layer>
	</Stage>
</div>
