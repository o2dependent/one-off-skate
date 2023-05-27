import { writable } from 'svelte/store';
import type {
	CanvasElement,
	CanvasElementConfigMap,
	CanvasElementType
} from './canvasElementsTypes';

// SECTION: Canvas Elements Store
// NOTE: store to hold and manage all canvas elements
export const canvasElements = writable<CanvasElement<CanvasElementType>[]>([
	{ config: { text: 'hello' }, label: 'hello', type: 'Text', id: '1' }
]);

// NOTE: create a new canvas element with a random id
export const createCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	config: CanvasElementConfigMap[Type]
): CanvasElement<Type> => {
	return {
		id: Math.random().toString(36).substr(2, 9),
		type,
		label: type,
		config
	};
};

// NOTE: add a new canvas element to store
export const addCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	config: CanvasElementConfigMap[Type]
) => {
	canvasElements.update((elements): CanvasElement<CanvasElementType>[] => {
		const newElement = createCanvasElement(type, config) satisfies CanvasElement<CanvasElementType>;
		if (elements.find((element) => element.id === newElement.id)) {
			throw new Error(`Element with id ${newElement.id} already exists.`);
		}
		return [...elements, newElement];
	});
};
// !SECTION
