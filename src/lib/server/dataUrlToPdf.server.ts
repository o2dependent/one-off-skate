import type { CreatePDF } from '$schemas/CreatePDF';
import PDFMake from 'pdfmake';
import fs from 'fs';

export const dataUrlToPdf = async (data: CreatePDF) => {
	const printer = new PDFMake({});
	const pdfDoc = printer.createPdfKitDocument({
		content: [{ image: data.dataURL, width: 250 }]
	});
	pdfDoc.pipe(fs.createWriteStream('document.pdf'));
	pdfDoc.end();
};
