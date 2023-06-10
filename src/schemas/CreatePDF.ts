import { z } from 'zod';

export const CreatePDF = z.object({
	dataURL: z.string()
});

export type CreatePDF = z.infer<typeof CreatePDF>;
