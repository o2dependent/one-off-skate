import type { Text, Image } from 'svelte-konva';
import type Konva from 'konva';
import { writable } from 'svelte/store';
import type { SvelteComponent, SvelteComponentTyped } from 'svelte';

// SECTION: Util types
// NOTE: get props from typeof svelte-konva component
type GetProps<T extends SvelteComponent> = T extends SvelteComponentTyped<infer U, any, any>
	? U
	: never;

// NOTE: get config prop from typeof svelte-konva component
type ConfigProp<T> = T extends { config: infer U } ? U : never;

// NOTE: get config prop from typeof svelte-konva component
type GetConfigProp<T extends SvelteComponent> = ConfigProp<GetProps<T>>;

//!SECTION

// SECTION: Canvas Element Types
// NOTE: interface to map component to configs
// interface CanvasElementMap {
// 	Text: Konva.TextConfig;
// 	Image: Konva.ImageConfig;
// }

interface CanvasElementMap {
	Text: Text;
	Image: Image;
}

// NOTE: get keys from CanvasElementMap to use as a shorthand
export type CanvasElementType = keyof CanvasElementMap;

// NOTE: config type for each element
export interface CanvasElement<Type extends CanvasElementType> {
	id: string;
	type: Type;
	config: GetConfigProp<CanvasElementMap[Type]>;
}
// !SECTION

// SECTION: Canvas Elements Store
// NOTE: store to hold and manage all canvas elements
export const canvasElements = writable<CanvasElement<CanvasElementType>[]>([]);

// NOTE: create a new canvas element with a random id
export const createCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	config: GetConfigProp<CanvasElementMap[Type]>
): CanvasElement<Type> => {
	return {
		id: Math.random().toString(36).substr(2, 9),
		type,
		config
	};
};

// NOTE: add a new canvas element to store
export const addCanvasElement = <Type extends CanvasElementType>(
	type: Type,
	config: GetConfigProp<CanvasElementMap[Type]>
) => {
	canvasElements.update((elements) => [...elements, createCanvasElement(type, config)]);
};
// !SECTION
