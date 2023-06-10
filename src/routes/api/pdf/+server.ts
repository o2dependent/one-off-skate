import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { CreatePDF } from '$schemas/CreatePDF';
import { dataUrlToPdf } from '$lib/server/dataUrlToPdf.server';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const createPDF = CreatePDF.parse(body);
	const pdf = await dataUrlToPdf(createPDF);
	return json({ message: 'Hello world!' });
};
