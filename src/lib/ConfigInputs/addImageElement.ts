import { addCanvasElement, stage } from '$stores/canvasElements';
import { get } from 'svelte/store';

interface AddImageElementProps {
	image: HTMLImageElement;
	file: File;
	afterCreate: () => void;
}

export const addImageElement = ({ image, file, afterCreate }: AddImageElementProps) => {
	if (!image) return;
	const $stage = get(stage);
	const aspectRatio = image.naturalWidth / image.naturalHeight;
	// add text to canvas elements
	addCanvasElement('Image', file?.name ?? 'Image', {
		image,
		width: 200,
		height: 200 / aspectRatio,
		x: ($stage?.width() ?? 0) / 2,
		y: ($stage?.height() ?? 0) / 2,
		fontSize: 24
	});

	afterCreate();
};
