import { get, writable } from 'svelte/store';
import type {
	CanvasElement,
	CanvasElementConfigMap,
	CanvasElementType
} from './canvasElementsTypes';
import type Konva from 'konva';

export const stage = writable<Konva.Stage | undefined>(undefined);
export const layer = writable<Konva.Layer | undefined>(undefined);
export const transformer = writable<Konva.Transformer | undefined>(undefined);
export const selectedId = writable<string | undefined>(undefined);

export const unfocusElement = () => {
	const $transformer = get(transformer);
	if (!$transformer) {
		console.error('Canvas elements not initialized.');
		return;
	}
	$transformer?.nodes([]);
	selectedId.set(undefined);
};

export const focusElement = (id: string) => {
	const $stage = get(stage);
	const $layer = get(layer);
	const $transformer = get(transformer);
	if (!$stage || !$layer || !$transformer) {
		console.error('Canvas elements not initialized.');
		return;
	}
	const element = $stage?.findOne(`#${id}`);
	if (element) {
		selectedId.set(id);
		$transformer?.nodes([element]);
		$layer?.batchDraw();
	}
};
// SECTION: Canvas Elements Store
// NOTE: store to hold and manage all canvas elements
export const canvasElements = writable<CanvasElement<CanvasElementType>[]>([]);

// NOTE: create a new canvas element with a random id
export const createCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	label: string,
	config: CanvasElementConfigMap[Type]
): CanvasElement<Type> => {
	const id = Math.random().toString(36).substr(2, 9);
	return {
		type,
		label,
		config: {
			id,
			...config,
			draggable: true
		}
	};
};

// NOTE: add a new canvas element to store
export const addCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	label: string,
	config: CanvasElementConfigMap[Type]
) => {
	// center the config's x and y values
	canvasElements.update((elements): CanvasElement<CanvasElementType>[] => {
		const newElement = createCanvasElement(
			type,
			label,
			config
		) satisfies CanvasElement<CanvasElementType>;
		if (elements.find((element) => element?.config?.id === newElement?.config?.id)) {
			throw new Error(`Element with id ${newElement?.config?.id} already exists.`);
		}
		return [...elements, newElement];
	});
};

// NOTE: remove a canvas element from store
export const removeCanvasElement = (id: string) => {
	canvasElements.update((elements): CanvasElement<CanvasElementType>[] => {
		return elements.filter((element) => element?.config?.id !== id);
	});
};
// !SECTION
