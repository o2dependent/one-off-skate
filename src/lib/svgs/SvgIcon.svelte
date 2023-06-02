<script lang="ts">
	import type { CanvasElementType } from '$stores/canvasElementsTypes';
	import SvgAddIcon from './SvgAddIcon.svelte';
	import SvgBackIcon from './SvgBackIcon.svelte';
	import SvgBugIcon from './SvgBugIcon.svelte';
	import SvgCloseIcon from './SvgCloseIcon.svelte';
	import SvgDownIcon from './SvgDownIcon.svelte';
	import SvgImageIcon from './SvgImageIcon.svelte';
	import SvgTextIcon from './SvgTextIcon.svelte';
	import SvgUpIcon from './SvgUpIcon.svelte';

	type IconType = 'New' | 'Close' | 'Back' | 'Bug' | 'Up' | 'Down';

	export let type: CanvasElementType | IconType = 'Image';
</script>

{#if type === 'Image'}
	<SvgImageIcon />
{:else if type === 'Text'}
	<SvgTextIcon />
{:else if type === 'New'}
	<SvgAddIcon />
{:else if type === 'Close'}
	<SvgCloseIcon />
{:else if type === 'Back'}
	<SvgBackIcon />
{:else if type === 'Bug'}
	<SvgBugIcon />
{:else if type === 'Up'}
	<SvgUpIcon />
{:else if type === 'Down'}
	<SvgDownIcon />
{/if}
