import type { Image, Text } from 'svelte-konva';
import type Konva from 'konva';
// SECTION: Util types

// // NOTE: get props from typeof svelte-konva component
// type GetProps<T> = T extends SvelteComponentTyped<infer P, any, any> ? P : never;

// // NOTE: get config prop from typeof svelte-konva component
// type ConfigProp<T> = T extends { config: infer U } ? U : never;

// // NOTE: get config prop from typeof svelte-konva component
// type GetConfigProp<T extends SvelteComponent> = ConfigProp<GetProps<T>>;

//!SECTION

// SECTION: Canvas Element Types
// NOTE: interface to map component to configs
interface CanvasElementConfigMap {
	Text: Konva.TextConfig;
	Image: Konva.ImageConfig;
}

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
	config: CanvasElementConfigMap[Type];
}
// !SECTION
