<script lang="ts">
	import { Stage, Layer, Rect, Text, Image } from 'svelte-konva';
	import {
		type CanvasElement,
		type CanvasElementType,
		canvasElements
	} from '$stores/canvasElements';
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
	<Layer>
		{#each $canvasElements as element}
			{#if element?.type === 'Text'}
				<Text config={element?.config ?? {}} />
			{:else if element?.type === 'Image'}
				<Image config={element?.config ?? {}} />
			{/if}
		{/each}
	</Layer>
</Stage>
