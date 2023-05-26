import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	revalidated: boolean;
};

type Msg = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | Msg>) {
	console.log("Revalidating notes pages...");
	const {
		query: { user_name }
	} = req;

	// シークレットキーがないと処理しない
	if (req.query.secret !== process.env.REVALIDATE_SECRET) {
		return res.status(401).json({ message: "Your secret is invalid !" });
	}

	let revalidated = false;
	try {
		await res.revalidate(`/novels_by_user/${user_name}`);
		revalidated = true;
	} catch (e) {
		console.log(e);
	}
	res.status(200).json({ revalidated });
}
