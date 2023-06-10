import type { CreatePDF } from '$schemas/CreatePDF';
import axios from 'axios';

export const postPDF = async (data: CreatePDF) => {
	const { status } = await axios.post('api/pdf', data);
	if (status !== 200) throw new Error('Error while posting PDF');
};
