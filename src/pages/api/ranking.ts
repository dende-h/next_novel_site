import { NextApiRequest, NextApiResponse } from "next";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = "368541387"; // Replace with your property id

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const period = req.query.period as "allTime" | "monthly" | "weekly" | "daily";
	let startDate;

	switch (period) {
		case "allTime":
			startDate = "2005-01-01"; // Google Analytics service was launched in late 2005
			break;
		case "monthly":
			startDate = "30daysAgo";
			break;
		case "weekly":
			startDate = "7daysAgo";
			break;
		case "daily":
			startDate = "1daysAgo";
			break;
		default:
			throw new Error(`Unknown period: ${period}`);
	}

	try {
		const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_CREDENTIALS_BASE64, "base64").toString("ascii"));
		const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });

		const [response] = await analyticsDataClient.runReport({
			property: `properties/${propertyId}`,
			dateRanges: [
				{
					startDate,
					endDate: "today"
				}
			],
			dimensions: [
				{
					name: "pagePath"
				}
			],
			metrics: [
				{
					name: "screenPageViews"
				}
			]
		});

		const rankingData = response.rows
			.filter((row) => /\/novels\/\d+/.test(row.dimensionValues[0].value))
			.map((row) => ({
				pagePath: row.dimensionValues[0].value,
				uniquePageviews: row.metricValues[0].value
			}));

		res.status(200).json(rankingData);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
}
