<script lang="ts">
	import { assets } from '$app/paths';
	import type Konva from 'konva';
	import { Stage, Layer, Text, Image, Rect, Transformer } from 'svelte-konva';
	import {
		canvasElements,
		focusElement,
		layer,
		stage,
		transformer,
		backgroundFill
	} from '$stores/canvasElements';
	import { onMount } from 'svelte';
	import type { KonvaEventObject } from 'konva/lib/Node';
	import CanvasMask from './CanvasMask.svelte';

	const MAX_WIDTH_RESOLUTION = 2486;
	const MAX_HEIGHT_RESOLUTION = 10000;

	let stageContainer: HTMLDivElement;
	let width = MAX_WIDTH_RESOLUTION;
	let height = MAX_HEIGHT_RESOLUTION;

	// Used to calculate the position and size of the selection rectangle during selection
	let initialSelectionCoordinates: Konva.Vector2d = {
		x: 0,
		y: 0
	};

	// Mask image
	let maskImage: HTMLImageElement | undefined;
	$: [maskHeight, maskWidth] = maskImage
		? [height, height * (maskImage?.width / maskImage?.height)]
		: [0, 0];
	$: [maskX, maskY] = [width / 2 - maskWidth / 2, 0];

	// resize
	function handleResize() {
		if (!$stage) return;
		$stage?.pixelSize(10);
		width = stageContainer.clientWidth;
		height = stageContainer.clientHeight;
		// Scale the stage and its children to fit the container
		const containerWidth = stageContainer.clientWidth;
		const containerHeight = stageContainer.clientHeight;
		const scaleX = containerWidth / width;
		const scaleY = containerHeight / height;
		const scale = Math.min(scaleX, scaleY);

		// Adjust the position of the stage to keep the content centered
		const stageWidth = width * scale;
		const stageHeight = height * scale;
		const offsetX = (containerWidth - stageWidth) / 2;
		const offsetY = (containerHeight - stageHeight) / 2;
		$stage?.offset({ x: offsetX, y: offsetY });
		// $stage?.position({ x: offsetX, y: offsetY });
		$stage?.scale({ x: scale, y: scale });

		$stage?.batchDraw();
	}
	// mount
	onMount(() => {
		width = stageContainer.clientWidth;
		height = stageContainer.clientHeight;
		// Scale the stage and its children to fit the container
		handleResize();

		// Listen for window resize events and adjust the stage accordingly
		window.addEventListener('resize', handleResize);

		const img = document.createElement('img');
		img.src = `${assets}/8_mask_standard.png`;
		img.onload = () => {
			maskImage = img;
		};
	});

	function selectNode(id: string) {
		const node = $layer?.findOne(`#${id}`);
		if (!node) return;
		$transformer?.nodes([node]);
	}

	function dragMove(event: KonvaEventObject<DragEvent>) {
		const node = event.currentTarget;
		const nodes = [node];

		// If the node is already selected, add the transformer to the nodes array
		if ($transformer?.nodes().includes(node)) {
			nodes.push($transformer);
		}

		$transformer?.nodes(nodes);
	}
</script>

<div
	bind:this={stageContainer}
	class="rounded-lg overflow-hidden shadow-lg border border-base-300 h-full w-full bg-white flex justify-center"
>
	<Stage
		on:mousedown={(e) => {
			// If the user clicks on the stage, deselect all nodes
			const konvaEvent = e.detail;

			// Check if event target is stage (eg. user clicked on empty part of the stage and not any shape)
			if (konvaEvent.target.getType() !== 'Stage') {
				return;
			}
			$transformer?.nodes([]);
		}}
		bind:handle={$stage}
		config={{ width, height }}
	>
		<Layer bind:handle={$layer}>
			<Rect
				config={{ height: maskHeight, width: maskWidth, x: maskX, y: maskY, fill: $backgroundFill }}
			/>
			{#each $canvasElements as element}
				{@const {
					type,
					config: { id }
				} = element}

				{#if typeof id === 'undefined'}
					<Text
						config={{
							text: 'An\nerror\noccured!',
							fontSize: 32,
							x: ($stage?.width?.() ?? 0) / 2 - 64,
							y: ($stage?.height?.() ?? 0) / 2
						}}
					/>
				{:else if type === 'Text'}
					<Text
						on:dragmove={() => focusElement(id)}
						on:pointerdown={() => focusElement(id)}
						bind:config={element.config}
					/>
				{:else if type === 'Image'}
					<Image
						on:dragmove={() => focusElement(id)}
						on:pointerdown={() => focusElement(id)}
						bind:config={element.config}
					/>
				{/if}
			{/each}
		</Layer>
		<CanvasMask {height} {width} {maskHeight} {maskWidth} {maskImage} {maskX} {maskY} />
		<Layer>
			<!-- Position transformer and selection rectangle at the bottom of all components so they are always the topmost elements on the canvas -->
			<Transformer config={{}} bind:handle={$transformer} />
		</Layer>
	</Stage>
</div>
