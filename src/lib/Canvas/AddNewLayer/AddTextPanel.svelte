<script lang="ts">
	import SvgIcon from '$lib/Canvas/svgs/SvgIcon.svelte';
	import { fly } from 'svelte/transition';
	import { addCanvasElement, stage } from '$stores/canvasElements';
	import TextConfigInput from '$lib/Canvas/ConfigInputs/TextConfigInput.svelte';
	import { getContrastColor } from '$utils/getContrastColor';
	import { backgroundFill } from '$stores/canvasElements';

	export let selected: string | undefined;
	export let open: boolean;
	export let dir: -1 | 1;
	export let height: number;

	let text = '';
	let fill = getContrastColor($backgroundFill ?? '#ffffff');

	const createText = () => {
		// add text to canvas elements
		addCanvasElement('Text', text, {
			text,
			x: ($stage?.width() ?? 0) / 2,
			y: ($stage?.height() ?? 0) / 2,
			fontSize: 24,
			fill
		});

		// reset new layer component
		open = false;
		selected = undefined;
		dir = -1;
	};
</script>

<form
	bind:clientHeight={height}
	on:submit|preventDefault={createText}
	in:fly={{ x: 400 }}
	out:fly={{ x: 400 }}
	class="absolute top-4 left-0 w-full flex flex-col gap-2"
>
	<div class="flex gap-2 items-center border-b border-base-content/10 pb-2">
		<button
			type="button"
			on:click={() => ((selected = undefined), (dir = -1))}
			class="btn btn-sm btn-ghost tooltip flex items-center justify-center w-fit"
			data-tip="Back"
		>
			<div class="w-6">
				<SvgIcon type="Back" />
			</div>
		</button>
		<p class="flex-grow text-left font-semibold">Add Text</p>
	</div>
	<TextConfigInput bind:text bind:fill />
	<button disabled={!text} class="btn btn-sm btn-ghost tooltip flex gap-2" type="submit">
		<div class="w-6">
			<SvgIcon type="New" />
		</div>
		<p class="flex-grow text-left">Add Text</p>
	</button>
</form>
