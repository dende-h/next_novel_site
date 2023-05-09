import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ success: boolean }>) {
	const { recaptchaToken } = req.body;

	try {
		const response = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
			params: {
				secret: RECAPTCHA_SECRET_KEY,
				response: recaptchaToken
			}
		});

		if (response.data.success) {
			res.status(200).json({ success: true });
		} else {
			res.status(400).json({ success: false });
		}
	} catch (error) {
		res.status(500).json({ success: false });
	}
}
